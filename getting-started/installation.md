---
description: Installing UmbCheckout
---

# Installation

UmbCheckout is installed using the NuGet package manager using either the below command:

```csharp
dot add package UmbHost.UmbCheckout
```

Alternatively, you can install using the NuGet package manager GUI within Visual Studio.

### Upgrades

UmbCheckout uses Umbraco Migrations to install all of the tables required to function, this means that upgrades follow the same process as installation, you can either run the command found above or upgrade using the NuGet package manager GUI.

### Installing a License

If you have purchased a license to enable more features, you simply need to add the following to your `appsettings.json` file:

```json
  "UmbCheckout": {
    "LicenseKey": "YOUR LICENSE KEY HERE"
  }
```

_Replacing_ `YOUR LICENSE KEY HERE` _with the key found in your_ [_account here_](https://my.umbhost.net)_._

{% hint style="info" %}
**When do I need a license?**

UmbCheckout is fully functional when running on a local development server (localhost or .local domains).

Hosting on a public domain without a license with disable the Tax Rates and being able to store the Basket in a Cookie or the Database.

Licensed sites will also be able to make use of the support ticketing system.

_(These restrictions may change in the future)_


{% endhint %}
