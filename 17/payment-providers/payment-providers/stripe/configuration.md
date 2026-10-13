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

You will also need to ensure your Webhooks are configured for the [Stripe API ](https://dashboard.stripe.com/developers)version used by the Stripe.net package UmbCheckout is built with. UmbCheckout 1.5 uses Stripe.net 50.x, which uses API version:

```
2026-01-28.clover
```

The test keys are used unless **Use live API details** is ticked in the Stripe settings (see below).

### Stripe Settings

The Stripe settings are found in the backoffice here:

Settings -> UmbCheckout -> Stripe -> Settings

| Name                                       | Use                                                                                                                    |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Use live API details                       | Use the `Live` API key and webhook secret. When unticked, the `Test` ones are used                                     |
| Allowed Shipping Countries                 | The countries Stripe Checkout accepts shipping addresses for, as 2-letter ISO codes separated by commas (e.g. `GB,IE`). Used only when **Enable Shipping** is on in the configuration |
| Collect Phone Number                       | Stripe Checkout asks the customer for a phone number                                                                   |
| Collect Promotional Emails Consent         | Stripe Checkout asks the customer for consent to promotional emails (Stripe offers this for US customers)             |
| Allow Promotional Codes                    | Stripe Checkout accepts promotion codes created in Stripe                                                              |
| Enable Abandoned Cart Recovery             | Stripe can email customers who leave the checkout a link to recover it. Used only when **Collect Promotional Emails Consent** is on |
| Allow Promotional Codes On Recovered Carts | Recovered checkouts accept promotion codes. Used only with **Enable Abandoned Cart Recovery**                          |

Only users with access to the Settings section can see or change the Stripe settings. Saving them writes the uSync file when [uSync Stripe](usync/README.md) is installed.

### Product properties

Your product can have the following optional properties

| Alias               | Property Type                                                                    |
| ------------------- | -------------------------------------------------------------------------------- |
| umbCheckoutMetaData | [Meta Data](../../../core-services/property-editors/metadata-property-editor.md) |
| umbCheckoutTaxRates | [Tax Rates](addons/property-editors/tax-rates-property-editor.md)                |
