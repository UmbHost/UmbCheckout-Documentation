---
description: Installing UmbCheckout
---

# Installation

**UmbCheckout 17 supports Umbraco 17.6 or later, on .NET 10.**

{% hint style="info" %}
Upgrading a site from Umbraco 13? Read [Upgrading from v13](upgrading-from-v13.md) first.
{% endhint %}

UmbCheckout is installed using the NuGet package manager using the below command:

```
dotnet add package UmbCheckout
```

You will also need to install a [payment provider](../payment-providers/payment-providers/README.md). The `UmbCheckout` package doesn't include one, so for Stripe also run:

```
dotnet add package UmbCheckout.Stripe
```

Alternatively, you can install using the NuGet package manager GUI within Visual Studio.

UmbCheckout stores the Basket in the .NET session. It adds the session middleware itself, so you don't need to add `app.UseSession()` to `Program.cs` (an existing call is harmless).

* **To change the session settings** (for example the idle timeout or the cookie name), use `PostConfigure` in `Program.cs`. It works in any order:

```csharp
builder.Services.PostConfigure<SessionOptions>(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(2);
});
```

* **Load-balanced sites:** the session is kept in memory unless your site registers a distributed cache. UmbCheckout registers an in-memory one only when none exists, so register a shared one (for example `AddStackExchangeRedisCache` or `AddDistributedSqlServerCache`) and every server sees the same Basket. `SessionOptions` are site-wide.

### Upgrades

UmbCheckout creates the tables it needs when the site starts, so upgrades follow the same process as installation: run the command found above or upgrade using the NuGet package manager GUI.

### Installing a License

If you have purchased a license to enable more features, add the following to your `appsettings.json` file (or, better, to your environment's secrets or environment variables):

```json
  "UmbCheckout": {
    "LicenseKey": "YOUR LICENSE KEY HERE"
  }
```

_Replacing_ `YOUR LICENSE KEY HERE` _with the key found in your_ [_UmbPanel account_](https://www.umbpanel.io)_._

You are also required to configure the [UmbracoApplicationUrl](https://docs.umbraco.com/umbraco-cms/reference/configuration/webroutingsettings#umbraco-application-url) within the [Web routing settings](https://docs.umbraco.com/umbraco-cms/reference/configuration/webroutingsettings) within your appsettings.json file. The configuration screen shows a warning while it isn't set.

```json
"Umbraco": {
  "CMS": {
    "WebRouting": {
      "UmbracoApplicationUrl": "https://www.mysite.com/"
    }
  }
}
```

{% hint style="info" %}
**When do I need a license?**

UmbCheckout requires a license to use any of the Addon packages, and every running instance of a production site needs one. See [Licensing](licensing.md) for how licenses work in UmbCheckout 17.

Using UmbCheckout without a license disables the Tax Rates, the payments, invoices and refunds screens, and storing the Basket in a Cookie or the Database.

Licensed sites will also be able to make use of the support ticketing system.

For development and staging sites, see [Development Licenses and Development Mode](developer-license.md).
{% endhint %}
