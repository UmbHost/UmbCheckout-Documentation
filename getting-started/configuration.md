---
description: Configuring UmbCheckout
---

# Configuration

There is no additional coding required to make use of UmbCheckout after being installed.

After the package is installed head to `Settings -> UmbCheckout -> Configuration` to set the Checkout **Success** and **Cancel** pages / URLs.

You will need to add your Stripe Secret API key into your `appsettings.json` below the `LicenseKey` as below:

```
  "UmbCheckout": {
    "LicenseKey": "YOUR LICENSE KEY HERE",
    "Stripe": {
      "ApiKey": "STRIPE SECRET API KEY"
    }
  }
```

You can find your Stripe Secret API key [within your account](https://dashboard.stripe.com/apikeys) by heading to `Developers -> API keys`
