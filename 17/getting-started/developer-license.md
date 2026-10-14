---
description: Using the licensed features on development and staging sites
---

# Development Licenses and Development Mode

You don't need a paid license to build and test a site with the licensed features.

### Development mode

On your own machine, licensed features work without a license key. The license status reads **Development**.

Development mode is on when **all** of these are true:

* the site's address is local: `localhost`, a `*.localhost` or `*.local` name, or a loopback address. The address is taken from `UmbracoApplicationUrl`, or, if that isn't set, from the first request. A public `UmbracoApplicationUrl` rules development mode out;
* the site is a **Debug build**;
* **no live Stripe key** (`sk_live_…` or `rk_live_…`) is anywhere in the site's configuration;
* **no live Stripe checkout session** has been created;
* **every request so far has been local**: a local host name, from a local network address, including any forwarding headers.

One request from outside, or a live Stripe checkout, turns development mode off until the site restarts. If development mode isn't available, the log says why, once.

{% hint style="warning" %}
The Addon database tables (for Baskets and tax rates) are created when the site starts, and only if the site is licensed at that moment. Development mode starts with the first local request, after that, so a site with no license key may not get these tables. If you need them, use a development license.
{% endhint %}

### Development licenses

For a staging site, or any site that isn't on your own machine, ask for the **development license** included with each paid license. It works like a normal license (in Release and Debug builds, for the domains and folder it lists) and is shown as **Development License: Yes** on the configuration screen. It mustn't be used to run a live shop.

To request a development license please [create an account and open a support ticket in UmbPanel](https://www.umbpanel.io).

**Please include the domains to be added to the license in the request.**
