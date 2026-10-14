---
description: Using the licensed features on development and staging sites
---

# Development Licenses and Development Mode

You don't need a paid license to build and test a site with the licensed features.

### Development mode

On your own machine, licensed features work without a license key. The license status reads **Development**.

Development mode is on when **all** of these are true:

* the site's address is local: `localhost`, a `*.localhost` or `*.local` name, or a loopback address. The address is taken from `UmbracoApplicationUrl`, or, if that isn't set, from the first request. A public `UmbracoApplicationUrl` rules development mode out;
* the site is a **Debug build** and runs in the **`Development` environment** (`ASPNETCORE_ENVIRONMENT=Development`);
* **no live Stripe key** (`sk_live_…` or `rk_live_…`) is anywhere in the site's configuration;
* **no live Stripe checkout session** has been created;
* **every request so far has been local**: a local host name, from a loopback address (`127.0.0.0/8` or `::1`). An address on your network (for example `192.168.x.x`) is not local. A request that carries a client address that is not loopback in `X-Forwarded-For`, `Forwarded`, `X-Real-IP`, `CF-Connecting-IP` or `True-Client-IP` is not local either;
* **both of the licensing request checks have seen a local request**. The licensing code observes requests in two independent places (a middleware at the start of Umbraco's pipeline, and Umbraco's own request notification). If a site removes either one, development mode never starts.

One request from outside, or a live Stripe checkout, turns development mode off until the site restarts. If development mode isn't available, the log says why, once.

The licensing request checks also **fail closed**: if a site removes the licensing request observer or the pipeline filter, no request is seen as licensed, so every request is unlicensed.

{% hint style="info" %}
The Addon database tables (for Baskets and tax rates) are created when the site starts if it is licensed at that moment. Development mode starts with the first local request, after the site has started, so the tables are created on the first licensed request instead. A site that is never licensed never gets them.
{% endhint %}

{% hint style="info" %}
While a debugger is attached, a production license is off. Development licenses, and local hosts in a Debug build, are exempt.
{% endhint %}

### Development licenses

For a staging site, or any site that isn't on your own machine, ask for the **development license** included with each paid license. It works like a normal license (in Release and Debug builds, for the domains and folder it lists) and is shown as **Development License: Yes** on the configuration screen. It mustn't be used to run a live shop.

To request a development license please [create an account and open a support ticket in UmbPanel](https://www.umbpanel.io).

**Please include the domains to be added to the license in the request.**
