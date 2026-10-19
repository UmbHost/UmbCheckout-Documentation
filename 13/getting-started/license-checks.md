---
description: How UmbCheckout checks your license
---

# License Checks

Your license key doesn't change, but UmbCheckout 1.6.0 and later need an annual V1 license: see [Perpetual licenses](#perpetual-licenses). This page explains how UmbCheckout checks the license.

### The license is checked in the background

* The license is checked in the background when the site starts, and regularly after that. No page waits for the license server.
* **If the license server can't be reached,** the site retries after 1, 5 and 30 minutes. Meanwhile a license verified in the last 30 days stays in force, so an outage doesn't switch your features off.
* **After an outage of more than 30 days,** the licensed features switch off while the site is running, not only after a restart. They come back when the license server confirms the license.
* An expired, suspended or invalid answer switches the licensed features off at the next check.
* **If the license can't be evaluated when the site starts,** the site still starts. The failure is logged and the add-on tables aren't created; they are created once a license is confirmed, on the first licensed request.
* The **Re-Check License** button on the configuration screen checks with the license server at once and shows the result.
* The site sends the license key, the domain and the site's directory to the license server.
* The license server is contacted at `www.umbpanel.io` over HTTPS. If your server restricts outgoing traffic, allow it.

### Licensed domains are checked on every request

Set `UmbracoApplicationUrl` to the site's address (see [Installing a License](installation.md#installing-a-license)). Licensed features are then only on for requests to a domain on the license (or to its `X-Forwarded-Host`, behind a proxy). A request for any other domain is treated as unlicensed:

* its license status reads **Domain not licensed**;
* the configuration screen explains this and lists the licensed domains;
* the site logs the domain, once.

Domains must match exactly: `www.mysite.com` and `mysite.com` are different domains. To add a domain, [open a ticket in UmbPanel](https://www.umbpanel.io) and ask UmbHost to add it.

Background work (scheduled tasks, for example) isn't affected.

### License status

| Status                    | Meaning                                                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Active                    | Licensed                                                                                                               |
| Development               | Licensed features are on in development mode                                                                           |
| Domain not licensed       | This request is for a domain the license doesn't list                                                                  |
| Perpetual license         | This licence doesn't cover UmbCheckout 1.6 or later: convert it to an annual licence                                   |
| Not licensed for this site | The license is active but doesn't cover this site: for example the path or domain doesn't match, or a debugger is attached |

The configuration screen treats any status other than Active or Development as unlicensed.

### Perpetual licenses

The V1 license is an annual subscription, with updates and support included until 31 December 2026, when Umbraco 13 reaches end of life. A V1 license bought as a one-off purchase before 14 October 2026 is a "perpetual" license. It keeps working with UmbCheckout versions before 1.6.0.

From 1.6.0, a perpetual key shows the status **This licence doesn't cover UmbCheckout 1.6 or later: convert it to an annual licence**, and the licensed add-ons stop. The open-source core and your stored data are not affected. To convert, sign in to [UmbPanel](https://www.umbpanel.io) and convert the license to an annual V1 license. See the [License Comparison](license-comparison.md).

When an annual license expires or is cancelled, the licensed add-ons stop in the same way.

### The license warning on your shop

When a site has a paid add-on installed but a request isn't licensed, every front-end page shows a red banner at the bottom saying that UmbCheckout is not licensed for that domain, and why. This includes a site with no license key. The banner is never shown on a site without a paid add-on installed (whatever its license key says), in the backoffice, before the license has been checked for the first time, or on responses that aren't HTML pages.

### The unlicensed message in the backoffice

When the site isn't licensed, the UmbCheckout configuration and shipping rate screens show "UmbCheckout is running in unlicensed mode". With a paid add-on installed it is red text. Without one, nothing needs a license, so it is a blue information box asking you to support development. A licensed site, or one in development mode, shows neither.

### Development mode

On your own machine, licensed features work without a license key, and the license status reads **Development**. This needs all of these:

* the site's address is local: `localhost`, a `*.localhost` or `*.local` name, or a loopback address;
* the site is a **Debug build** and runs in the **`Development` environment** (`ASPNETCORE_ENVIRONMENT=Development`);
* no live Stripe key (`sk_live_…` or `rk_live_…`) is in the site's configuration, no live Stripe checkout session has been created, and nothing the Stripe add-on reads from Stripe belongs to live mode (a live key held outside the configuration is caught that way);
* every request so far has been local: a local host name, from a loopback address (`127.0.0.0/8` or `::1`; an address on your network does not count), with no client address that is not loopback in a forwarding header (`X-Forwarded-For`, `Forwarded`, `X-Real-IP`, `CF-Connecting-IP`, `True-Client-IP`).

One request from outside, or a live checkout, turns development mode off until the site restarts. The licence checks detect interference and turn licensed features off; they cannot be made to see a different licence. They rely on ASP.NET Core's own hosting events (not on anything a site registers), and code that handles a request cross-checks that the request was seen. If a site interferes with that (for example by replacing the hosting diagnostics in DI), licensed features turn off for every request and background job until the interference is removed and the site restarts, the License Status reads "Licence checks were interfered with", and the log says why, once. Code that builds its own HttpContext (prerendering, a static export, a warm-up) is not interference. A request is read for its host when a licence decision is made, so after your own UseForwardedHeaders(). Work that runs outside a request, such as your own scheduled jobs calling UmbCheckout services, is licensed whenever the site's license is. If development mode isn't available, the log says why, once. For a staging site, use a [development license](developer-license.md).

{% hint style="info" %}
While a debugger is attached, a production license is off (development licenses, and local hosts in a Debug build, are exempt). Licensed features come back when the debugger detaches.
{% endhint %}
