---
description: Installing the UmbCheckout Stripe Starter Kit
---

# Installation

The UmbCheckout Stripe Starter Kit makes use of [dotnet templates](https://learn.microsoft.com/en-us/dotnet/core/tools/custom-templates) and is installed using the NuGet package manager using the below command:

```
dotnet new install UmbCheckout.StarterKit.Stripe
```

Once installed you will need to create a new folder on your machine, within this folder you will need to open a command prompt, terminal, or PowerShell and run the following:

```
dotnet new umbcheckout.starterkit.stripe
```

Once installed you need to run the following command to build and run the site:

```
dotnet run
```

Next is to install Umbraco in the normal way following the prompts within the installer.

On the first run of the site after the installer has completed uSync will import all of the demo content, images, and configurations.

Next, you are required to configure the [UmbracoApplicationUrl](https://docs.umbraco.com/umbraco-cms/reference/configuration/webroutingsettings#umbraco-application-url) within the [Web routing settings](https://docs.umbraco.com/umbraco-cms/reference/configuration/webroutingsettings) within your appsettings.json file

```json
"Umbraco": {
  "CMS": {
    "WebRouting": {
      "UmbracoApplicationUrl": "http://www.mysite.com/"
    }
  }
}
```

The final step is to add your [Stripe API keys](../../../payment-providers/stripe/configuration.md) to the appsettings.json

```json
  "UmbCheckout": {
    "Stripe": {
      "WebHookSecret": "",
      "ApiKey": ""
    }
  }
```
