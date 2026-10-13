---
description: Configuring Stripe Payment Provider
---

# Configuration

You will need to add your Stripe Secret API key into your `appsettings.json` below the `LicenseKey` as below:

```json
  "UmbCheckout": {
    "Stripe": {
      "Test": {
        "ApiKey": "TEST STRIPE SECRET API KEY"
      },
      "Live": {
        "ApiKey": "LIVE STRIPE SECRET API KEY"
      }
    }
  }
```

You can find your Stripe Secret API key [within your account](https://dashboard.stripe.com/apikeys) by heading to `Developers -> API keys`

If you are going to use the [Stripe Webhook](services/stripe-webhook-api/) (Recommended) then you will need to add the following secret into your `appsettings.json`

```json
  "UmbCheckout": {
    "Stripe": {
      "Test": {
        "WebHookSecret": "STRIPE TEST WEBHOOK SECRET"
      },
      "Live": {
        "WebHookSecret": "LIVE STRIPE WEBHOOK SECRET"
      }
    }
  }
```

You can create your WebHook Secret [within your account](https://dashboard.stripe.com/webhooks) by heading to `Developers -> Webhooks`

You will also need to ensure your Webhooks are configured for [Stripe API ](https://dashboard.stripe.com/developers)version:

```
2023-08-16
```

Your product can have the following optional properties

| Alias               | Property Type                                                                    |
| ------------------- | -------------------------------------------------------------------------------- |
| umbCheckoutMetaData | [Meta Data](../../../core-services/property-editors/metadata-property-editor.md) |
| umbCheckoutTaxRates | [Tax Rates](addons/property-editors/tax-rates-property-editor.md)                |
