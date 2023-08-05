---
description: Configuring Stripe Payment Provider
---

# Configuration

You will need to add your Stripe Secret API key into your `appsettings.json` below the `LicenseKey` as below:

```json
  "UmbCheckout": {
    "Stripe": {
      "ApiKey": "STRIPE SECRET API KEY"
    }
  }
```

You can find your Stripe Secret API key [within your account](https://dashboard.stripe.com/apikeys) by heading to `Developers -> API keys`

Your product can have the following optional properties

| Alias               | Property Type                                                        |
| ------------------- | -------------------------------------------------------------------- |
| umbCheckoutMetaData | [Meta Data](property-editors/meta-data-property-editor.md)           |
| umbCheckoutTaxRates | [Tax Rates](../addons/property-editors/tax-rates-property-editor.md) |
