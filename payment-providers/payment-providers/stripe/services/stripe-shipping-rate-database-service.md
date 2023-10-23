---
description: A service which handles getting the Stripe Shipping Rates from the database
---

# Stripe Shipping Rate Database Service

The Stripe Shipping Rate database service is what handles the insertion, retrieval, updating, and deletion of the Shipping Rates within the database.

You can access the database service by injecting `IStripeShippingRateDatabaseService` which can be found within the namespace `UmbCheckout.Stripe.Interfaces`

#### GetShippingRates

Gets the Shipping Rates

```csharp
Task<IEnumerable<ShippingRate>> GetShippingRates();
```

#### GetShippingRate

Gets a specified Shipping Rate

Parameters:

| Name | Detail                                                                 |
| ---- | ---------------------------------------------------------------------- |
| key  | Key of the Stripe [Shipping Rate](../object-reference/shippingrate.md) |

```csharp
Task<ShippingRate?> GetShippingRate(Guid key);
```

#### GetShippingRate

Gets a specified Shipping Rate

Parameters:

| Name  | Detail                                                                      |
| ----- | --------------------------------------------------------------------------- |
| value | StripeId of the Stripe [Shipping Rate](../object-reference/shippingrate.md) |

```csharp
Task<ShippingRate?> GetShippingRate(string value);
```

#### UpdateShippingRate

Creates a Shipping Rate

Parameters:

| Name         | Detail                                                          |
| ------------ | --------------------------------------------------------------- |
| shippingRate | The Stripe [Shipping Rate](../object-reference/shippingrate.md) |

```csharp
Task<ShippingRate?> CreateShippingRate(ShippingRate shippingRate);
```

#### UpdateShippingRate

Updates a specified Shipping Rate

Parameters:

| Name         | Detail                                                          |
| ------------ | --------------------------------------------------------------- |
| shippingRate | The Stripe [Shipping Rate](../object-reference/shippingrate.md) |

```csharp
Task<ShippingRate?> UpdateShippingRate(ShippingRate shippingRate);
```

#### DeleteShippingRate

Deletes a specified Shipping Rate

Parameters:

| Name | Detail                                                                 |
| ---- | ---------------------------------------------------------------------- |
| key  | Key of the Stripe [Shipping Rate](../object-reference/shippingrate.md) |

```csharp
Task<bool> DeleteShippingRate(Guid key);
```
