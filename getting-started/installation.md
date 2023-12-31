---
description: Installing UmbCheckout
---

# Installation

UmbCheckout is installed using the NuGet package manager using the below command:

```
dotnet add package UmbCheckout
```

Next, you need to enable .NET sessions, if not already enabled.\
To do this add the `app.UseSession();` line to your startup.cs before `app.UseUmbraco()`\
It should look similar to the below:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseSession();

    app.UseUmbraco()
        .WithMiddleware(u =>
        {
            u.UseBackOffice();
            u.UseWebsite();
        })
        .WithEndpoints(u =>
        {
            u.UseInstallerEndpoints();
            u.UseBackOfficeEndpoints();
            u.UseWebsiteEndpoints();
        });
}
```

You will also need to install a [payment provider](broken-reference).

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

You are also required to configure the [UmbracoApplicationUrl](https://docs.umbraco.com/umbraco-cms/reference/configuration/webroutingsettings#umbraco-application-url) within the [Web routing settings](https://docs.umbraco.com/umbraco-cms/reference/configuration/webroutingsettings) within your appsettings.json file

```json
"Umbraco": {
  "CMS": {
    "WebRouting": {
      "UmbracoApplicationUrl": "http://www.mysite.com/"
    }
  }
}
```

{% hint style="info" %}
**When do I need a license?**

UmbCheckout requires a license to use any of the Addon packages.

Using UmbCheckout without a license will disable the Tax Rates and disables being able to store the Basket in a Cookie or the Database.

Licensed sites will also be able to make use of the support ticketing system.

If you require a development license, [please see this linked page](developer-license.md).

_(These restrictions may change in the future)_


{% endhint %}
