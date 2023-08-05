---
description: A service which handles getting the Stripe Shipping Rates from the Stripe API
---

# Stripe Tax Rate ApiService

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

The Stripe Tax Rate API service is what handles the retrieval of the Tax Rates from the Stripe API.

You can access the API service by injecting `IStripeTaxRateApiService` which can be found within the namespace `UmbCheckout.Stripe.Addons.Interfaces`

#### GetTaxRates

Gets the Tax Rates from the Stripe API

```csharp
Task<StripeList<TaxRate>> GetTaxRates();
```

#### GetTaxRate

Gets a Tax Rate from the Stripe API

Parameters:

| Name | Detail                    |
| ---- | ------------------------- |
| id   | Id of the Stripe Tax Rate |

```csharp
Task<TaxRate> GetTaxRate(string id);
```
