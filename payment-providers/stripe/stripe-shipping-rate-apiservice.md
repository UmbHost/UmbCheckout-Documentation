---
description: A service which handles getting the Stripe Shipping Rates from the Stripe API
---

# Stripe Shipping Rate ApiService

The Stripe Shipping Rate API service is what handles the retrieval of the Shipping Rates from the Stripe API.

You can access the API service by injecting `IStripeShippingRateApiService` which can be found within the namespace `UmbCheckout.Stripe.Interfaces`

#### GetShippingRates

Gets the Shipping Rates from the Stripe API

```csharp
Task<StripeList<ShippingRate>> GetShippingRates();
```

#### GetShippingRate

Gets a Shipping Rate from the Stripe API

Parameters:

| Name | Detail                         |
| ---- | ------------------------------ |
| id   | Id of the Stripe Shipping Rate |

```csharp
Task<ShippingRate> GetShippingRate(string id);
```
