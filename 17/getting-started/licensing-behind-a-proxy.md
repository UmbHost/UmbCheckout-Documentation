# Licensing behind a proxy or CDN

UmbCheckout checks your licence against the **host of the request as ASP.NET Core sees it** (`HttpContext.Request.Host`). It never reads the `X-Forwarded-Host` header itself, so a visitor cannot send a header to make an unlicensed domain look licensed. The check runs inside Umbraco's pipeline, after your site's own forwarded headers middleware, so anything you have configured to trust a proxy has already been applied.

What matters is whether your host or proxy **passes the original `Host` header to the site**.

## Hosts that need nothing

These pass the visitor's `Host` header through, so the licence just works:

* UmbHost GreenStack (Cloudflare and Traefik)
* IIS, in-process or out-of-process
* Azure App Service
* AWS Application Load Balancer (ALB)
* Any proxy or CDN set to preserve the host

## Proxies that rewrite the Host header

Some proxies replace `Host` with the name of the backend (for example `my-app.azurewebsites.net`) and put the public host in `X-Forwarded-Host`. UmbCheckout then sees the backend name, and the public domain is reported as **Domain not licensed**. You can fix this in either of two ways.

### Option 1: preserve the host (preferred)

| Platform | Setting |
| --- | --- |
| Azure Front Door | Set the origin **Origin host header** to the public domain (or leave it empty so the request host is used). |
| Azure Application Gateway | In the backend setting, turn on **Pick host name from incoming request** (preserve the host). |
| AWS CloudFront | Forward the `Host` header to the origin (an origin request policy that includes `Host`). |
| nginx | `proxy_set_header Host $host;` in the `location` that has `proxy_pass`. |
| Apache | `ProxyPreserveHost On` |

### Option 2: trust the proxy with ForwardedHeadersOptions

If you cannot preserve the host, tell ASP.NET Core which proxies to trust and which header carries the public host. This is Microsoft's documented configuration; it only accepts the header from the proxies you trust, which is why a visitor cannot spoof it.

```csharp
using Microsoft.AspNetCore.HttpOverrides;

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor
                               | ForwardedHeaders.XForwardedHost
                               | ForwardedHeaders.XForwardedProto;

    // Only for a proxy that uses a different header name (see the table below).
    // options.ForwardedHostHeaderName = "X-Original-Host";

    // Trust only your proxy's network (see "Trusting the proxy" below).
    options.KnownIPNetworks.Add(System.Net.IPNetwork.Parse("203.0.113.0/24"));

    // Recommended: only accept your own public hostnames.
    options.AllowedHosts.Add("www.example.com");
});

var app = builder.Build();

// Before UseUmbraco(), as early as possible.
app.UseForwardedHeaders();
```

Which header carries the public host depends on the proxy:

| Proxy | Header with the public host | What to do |
| --- | --- | --- |
| Azure Front Door | `X-Forwarded-Host` | The default. Nothing extra. |
| Azure Application Gateway | `X-Original-Host` (it does not send `X-Forwarded-Host`) | Set `options.ForwardedHostHeaderName = "X-Original-Host";` |
| nginx | none unless you add it | Add `proxy_set_header X-Forwarded-Host $host;` in the `location` that has `proxy_pass`. |
| Apache | `X-Forwarded-Host` (added by `mod_proxy`) | The default. |
| AWS CloudFront | none | CloudFront sends no forwarded host header. Forward the `Host` header (Option 1) instead. If you cannot, use a CloudFront Function that copies the viewer's `Host` into a custom header (for example `X-Public-Host`), and set `options.ForwardedHostHeaderName = "X-Public-Host";`. The function must overwrite the header on every request, because a visitor can send it too. |

#### Trusting the proxy

A single `KnownProxies` address does not work for Azure Front Door, AWS CloudFront or Azure App Service, because the requests come from a large, changing set of addresses. Trust their published ranges with `KnownIPNetworks` instead:

* **Azure Front Door**: the `AzureFrontDoor.Backend` service tag, from the [Azure IP Ranges and Service Tags](https://www.microsoft.com/download/details.aspx?id=56519) download. Also check the `X-Azure-FDID` header against your Front Door ID, so that another customer's Front Door cannot reach your origin.
* **AWS CloudFront**: the `CLOUDFRONT_ORIGIN_FACING` ranges in [ip-ranges.json](https://ip-ranges.amazonaws.com/ip-ranges.json), or the `com.amazonaws.global.cloudfront.origin-facing` managed prefix list.
* **Azure App Service**: it preserves the host, so licensing needs none of this. If you trust its forwarded headers for other reasons, use the `ASPNETCORE_FORWARDEDHEADERS_ENABLED` setting App Service applies, not a single address.
* **Azure Application Gateway**: the subnet the gateway is deployed in.
* **nginx, Apache or any proxy you run**: its own address (`KnownProxies`) or subnet.

These ranges change, so refresh them when the provider publishes an update.

If you cannot list the ranges, you can clear both lists so that every sender is trusted:

```csharp
options.KnownIPNetworks.Clear();
options.KnownProxies.Clear();
```

Only do this when the site cannot be reached except through the proxy: lock the origin down with a network security group, a security group, a firewall rule or an origin secret header, and set `AllowedHosts` as above. On a site that is reachable directly from the internet, any visitor could send the header.

Alternatively set the environment variable `ASPNETCORE_FORWARDEDHEADERS_ENABLED=true` (this enables `X-Forwarded-For` and `X-Forwarded-Proto` only and trusts every proxy; it does **not** apply `X-Forwarded-Host`, so it does not help a proxy that rewrites `Host`).

## Development mode behind a proxy

[Development Mode](developer-license.md) is for your own machine. A request never counts as local when it carries a client address that is not loopback in `X-Forwarded-For`, `Forwarded`, `X-Real-IP`, `CF-Connecting-IP` or `True-Client-IP`, even if the connection comes from the same machine. A local reverse proxy that only forwards loopback addresses (IIS out-of-process, a local nginx) still works for a developer. Development mode also needs the `Development` environment, a Debug build of the site and no live Stripe key.

## Checking it works

Open the UmbCheckout dashboard in the backoffice on your public domain. If it says **Domain not licensed**, the site is seeing a different host than the one on your licence: check that your proxy preserves the host, or that `ForwardedHeadersOptions` trusts your proxy, and that the domain is listed on your licence in UmbPanel.
