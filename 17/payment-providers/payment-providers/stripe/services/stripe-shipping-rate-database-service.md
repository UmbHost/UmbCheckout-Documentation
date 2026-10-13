---
description: A service which handles getting the Stripe Shipping Rates from the database
---

# Stripe Shipping Rate Database Service

The Stripe Shipping Rate database service is what handles the insertion, retrieval, updating, and deletion of the Shipping Rates within the database.

You can access the database service by injecting `IStripeShippingRateDatabaseService` which can be found within the namespace `UmbCheckout.Stripe.Interfaces`

Every method takes an optional `CancellationToken` as its last parameter. Reads publish `OnShippingRatesLoadedNotification`, and saves and deletes publish the cancellable `OnShippingRateSavingNotification` and `OnShippingRateDeletingNotification` (see [Extending UmbCheckout](../../../../core-services/extending-umbcheckout.md)).

#### GetShippingRatesAsync

Gets the Shipping Rates

```csharp
Task<IEnumerable<ShippingRate>> GetShippingRatesAsync(CancellationToken cancellationToken = default);
```

#### GetShippingRateAsync

Gets a specified Shipping Rate by its key, or by its Stripe ID

| Name  | Detail                                                                      |
| ----- | --------------------------------------------------------------------------- |
| key   | Key of the Stripe [Shipping Rate](../object-reference/shippingrate.md)      |
| value | StripeId of the Stripe [Shipping Rate](../object-reference/shippingrate.md) |

```csharp
Task<ShippingRate?> GetShippingRateAsync(Guid key, CancellationToken cancellationToken = default);
Task<ShippingRate?> GetShippingRateAsync(string value, CancellationToken cancellationToken = default);
```

#### CreateShippingRateAsync

Creates a Shipping Rate. Returns `null` when a rate with the same Stripe ID already exists.

```csharp
Task<ShippingRate?> CreateShippingRateAsync(ShippingRate shippingRate, CancellationToken cancellationToken = default);
```

#### UpdateShippingRateAsync

Updates a specified Shipping Rate

```csharp
Task<ShippingRate?> UpdateShippingRateAsync(ShippingRate shippingRate, CancellationToken cancellationToken = default);
```

#### DeleteShippingRateAsync

Deletes a specified Shipping Rate

| Name | Detail                                                                 |
| ---- | ---------------------------------------------------------------------- |
| key  | Key of the Stripe [Shipping Rate](../object-reference/shippingrate.md) |

```csharp
Task<bool> DeleteShippingRateAsync(Guid key, CancellationToken cancellationToken = default);
```
