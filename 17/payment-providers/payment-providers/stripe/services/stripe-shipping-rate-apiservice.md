---
title: Stripe Shipping Rate ApiService
description: A service which handles getting the Stripe Shipping Rates from the Stripe API
---

The Stripe Shipping Rate API service is what handles the retrieval of the Shipping Rates from the Stripe API.

You can access the API service by injecting `IStripeShippingRateApiService` which can be found within the namespace `UmbCheckout.Stripe.Interfaces`

:::note
Every method also has an overload that takes a `CancellationToken` as its last parameter. See [Cancellation Tokens](../../../../core-services/cancellation-tokens.md).
:::

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
