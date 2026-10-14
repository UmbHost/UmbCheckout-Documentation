---
description: How UmbCheckout 17 licenses work
---

# Licensing

The UmbCheckout core is free and open source. A license unlocks the [Addon features](license-comparison.md) and the support desk. You can [buy a license at umbcheckout.net](https://umbcheckout.net).

### What a license covers

* **A license is an annual subscription for a production domain.** The domains it covers are listed on the license, and you can see them on the configuration screen.
* **Every running instance needs a license.** A site served by two load-balanced servers (or two containers, or two App Service instances) is two instances. Add a **replica add-on** to your license for each extra instance.
* **Each extra production domain needs a domain add-on.** If the same shop is served on more than one production domain, add a **domain add-on** for each extra one. A separate shop needs its own license.
* **Some domains need no add-on:** domains that serve or redirect to the same website, such as the `www.` and non-`www.` versions of a domain, redirect domains, and staging-only host names.
* **Each paid license includes one development license** for a staging or testing domain. Local development needs no license: use [development mode](developer-license.md#development-mode) on your own machine, or ask for the included [development license](developer-license.md#development-licenses) for a staging site.
* **GreenStack hosting** includes a license on Umbraco 10, 13 and 17. It is only valid for sites hosted on GreenStack and ends with the hosting.

### Setting it up

1. Add the key to `UmbCheckout:LicenseKey` (see [Installing a License](installation.md#installing-a-license)).
2. Set `Umbraco:CMS:WebRouting:UmbracoApplicationUrl` to the site's address, for example `https://www.mysite.com/`. It must be an absolute `http` or `https` URL, and its host must be one of the licensed domains. Without it the site is unlicensed.
3. Check the **License Details** box under **Settings → UmbCheckout → Configuration**.

### Licensed domains are checked on every request

Licensed features are only on for requests to a domain on the license (or to its `X-Forwarded-Host`, behind a proxy). A request for any other domain is treated as unlicensed:

* its license status reads **Domain not licensed**;
* the configuration screen explains this and lists the licensed domains;
* the site logs the domain, once.

Domains must match exactly: `www.mysite.com` and `mysite.com` are different domains, and there are no wildcards. List each domain the site is served on (the free alias, redirect and staging domains need no add-on, but they are still listed on the license). To add a domain, [open a ticket in UmbPanel](https://www.umbpanel.io) and ask UmbHost to add it.

Background work (scheduled tasks, the webhook's handlers outside a request) isn't affected.

### The license warning on your shop

When a site has a license key but a request isn't licensed, every front-end page shows a red banner at the bottom:

> **UmbCheckout is not licensed for www.mysite.com** (Domain not licensed). Licensed shop features are switched off. Site owner: see the licence details in the UmbCheckout settings in the Umbraco backoffice.

The status in brackets says why. The banner is never shown:

* on a site without a license key (the free version);
* in the backoffice;
* before the license has been checked for the first time;
* on responses that aren't HTML pages.

### How the license is checked

The license is checked in the background, never while a page is loading.

* Each instance checks in with the license server about once an hour. A restarting instance uses its saved license straight away and checks in when it is due.
* **If the license server can't be reached,** the site retries after 1, 5 and 30 minutes, then every 30 minutes. Meanwhile a license verified in the last 30 days stays in force, so an outage doesn't switch your features off.
* **When an instance shuts down gracefully,** it releases its place on the license, so a replacement (for example during a deployment) can take it straight away.
* **If an instance crashes,** its place is freed once it has been silent for 90 minutes.
* **When the license has no room for another instance,** that instance is unlicensed (status **Invalid**, and the banner shows), and the log says "The licence has no room for another instance". It tries again regularly, so it is licensed once a place is free.
* **After an outage of more than 30 days,** the licensed features switch off while the site is running, not only after a restart, and the log says so. They come back when the license server confirms the license.
* **If the license can't be evaluated when the site starts,** the site still starts. The failure is logged and the add-on tables aren't created; they are created once a license is confirmed, on the first licensed request.
* An expired, suspended or cancelled license switches the licensed add-ons off at the next check. The open-source core and your stored data are not affected.

The **Re-Check License** button on the configuration screen checks with the license server at once and shows the result. It can be used once every 5 minutes.

The site sends the license key, the domain and the site's directory to the license server, which is only ever contacted at `www.umbpanel.io` over HTTPS. If your server restricts outgoing traffic, allow it.

### License statuses

| Status              | Meaning                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------- |
| Active              | Licensed                                                                                      |
| Development         | Licensed features are on in [development mode](developer-license.md#development-mode)         |
| Domain not licensed | This request is for a domain the license doesn't list                                        |
| Not licensed for this site | The license is active but doesn't cover this site: for example the path or domain doesn't match, or a debugger is attached |
| Invalid             | The key isn't valid for this site, or the license has no room for another instance            |
| Expired, Suspended  | The subscription has ended or been suspended                                                  |
| Unlicensed          | No license key, no valid `UmbracoApplicationUrl`, or the license hasn't been checked yet      |

{% hint style="info" %}
While a debugger is attached, a production license is off (development licenses and development mode are exempt). Licensed features come back when the debugger detaches.
{% endhint %}

### Upgrading from v13

UmbCheckout 17 needs an UmbCheckout 17 license. A license for UmbCheckout 1.x on Umbraco 13 doesn't change and keeps working there. See [Upgrading from v13](upgrading-from-v13.md).
