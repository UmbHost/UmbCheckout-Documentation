---
description: Configuring UmbCheckout
---

# Configuration

There is no additional coding required to make use of UmbCheckout after being installed.

After the package is installed head to Settings -> UmbCheckout -> Configuration to set the Checkout **Success** and **Cancel** pages / URLs.

You will need to add your Stripe Secret API key into your `appsettings.json` below the `LicenseKey` as below:

```json
  "UmbCheckout": {
    "LicenseKey": "YOUR LICENSE KEY HERE",
    "Stripe": {
      "ApiKey": "STRIPE SECRET API KEY"
    }
  }
```

You can find your Stripe Secret API key [within your account](https://dashboard.stripe.com/apikeys) by heading to `Developers -> API keys`

### Required Product Properties

Your product needs to have the following required properties added

| Alias            | Property Type |
| ---------------- | ------------- |
| umbCheckoutPrice | Decimal       |

Your product can have the following optional properties

| Alias                  | Property Type                                                 |
| ---------------------- | ------------------------------------------------------------- |
| umbCheckoutDescription | Text Area                                                     |
| umbCheckoutMetaData    | [Meta Data](../property-editors/meta-data-property-editor.md) |
