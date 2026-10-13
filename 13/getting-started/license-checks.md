---
description: How UmbCheckout checks your license
---

# License Checks

Your license key and the license itself don't change. This page explains how UmbCheckout checks it.

### The license is checked in the background

* The license is checked in the background when the site starts, and regularly after that. No page waits for the license server.
* **If the license server can't be reached,** the site retries after 1, 5 and 30 minutes. Meanwhile a license verified in the last 30 days stays in force, so an outage doesn't switch your features off.
* **After an outage of more than 30 days,** the licensed features switch off while the site is running, not only after a restart. They come back when the license server confirms the license.
* An expired, suspended or invalid answer switches the licensed features off at the next check.
* **If the license can't be evaluated when the site starts,** the site still starts. The failure is logged and the add-on tables aren't created; they are created once a license is confirmed, on the first licensed request.
* The **Re-Check License** button on the configuration screen checks with the license server at once and shows the result.
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
| Not licensed for this site | The license is active but doesn't cover this site: for example the path or domain doesn't match, or a debugger is attached |

The configuration screen treats any status other than Active or Development as unlicensed.

### The license warning on your shop

When a site has a license key but a request isn't licensed, every front-end page shows a red banner at the bottom saying that UmbCheckout is not licensed for that domain, and why. The banner is never shown on a site without a license key, in the backoffice, before the license has been checked for the first time, or on responses that aren't HTML pages.

### Development mode

On your own machine, licensed features work without a license key, and the license status reads **Development**. This needs all of these:

* the site's address is local: `localhost`, a `*.localhost` or `*.local` name, or a loopback address;
* the site is a **Debug build**;
* no live Stripe key (`sk_live_…` or `rk_live_…`) is in the site's configuration, and no live Stripe checkout session has been created;
* every request so far has been local, including any forwarding headers.

One request from outside, or a live checkout, turns development mode off until the site restarts. If development mode isn't available, the log says why, once. For a staging site, use a [development license](developer-license.md).

{% hint style="info" %}
While a debugger is attached, a production license is off (development licenses and development mode are exempt). Licensed features come back when the debugger detaches.
{% endhint %}
