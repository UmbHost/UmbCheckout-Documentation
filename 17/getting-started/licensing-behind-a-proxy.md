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

If you cannot preserve the host, tell ASP.NET Core which proxies to trust and to apply `X-Forwarded-Host`. This is Microsoft's documented configuration; it only accepts the header from the proxies you list, which is why a visitor cannot spoof it.

```csharp
using Microsoft.AspNetCore.HttpOverrides;

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor
                               | ForwardedHeaders.XForwardedHost
                               | ForwardedHeaders.XForwardedProto;

    // Trust only your proxy. Add its address (or its network).
    options.KnownProxies.Add(IPAddress.Parse("10.0.0.5"));
    // options.KnownIPNetworks.Add(System.Net.IPNetwork.Parse("10.0.0.0/8"));
});

var app = builder.Build();

// Before UseUmbraco(), as early as possible.
app.UseForwardedHeaders();
```

Alternatively set the environment variable `ASPNETCORE_FORWARDEDHEADERS_ENABLED=true` (this enables `X-Forwarded-For` and `X-Forwarded-Proto` only and trusts every proxy; it does **not** apply `X-Forwarded-Host`, so it does not help a proxy that rewrites `Host`).

Do not clear `KnownProxies` and `KnownIPNetworks` on a site that is reachable directly from the internet: any visitor could then send the header.

## Development mode behind a proxy

[Development Mode](developer-license.md) is for your own machine. A request never counts as local when it carries a client address that is not loopback in `X-Forwarded-For`, `Forwarded`, `X-Real-IP`, `CF-Connecting-IP` or `True-Client-IP`, even if the connection comes from the same machine. A local reverse proxy that only forwards loopback addresses (IIS out-of-process, a local nginx) still works for a developer. Development mode also needs the `Development` environment, a Debug build of the site and no live Stripe key.

## Checking it works

Open the UmbCheckout dashboard in the backoffice on your public domain. If it says **Domain not licensed**, the site is seeing a different host than the one on your licence: check that your proxy preserves the host, or that `ForwardedHeadersOptions` trusts your proxy, and that the domain is listed on your licence in UmbPanel.
