---
description: A service which handles getting the Stripe Tax Rates from the database
---

# Stripe Tax Rate Database Service

{% hint style="info" %}
This feature requires a paid license. On an unlicensed site the service reads and writes nothing.
{% endhint %}

Reads publish `OnStripeTaxRatesLoadedNotification`, and saves and deletes publish the cancellable `OnStripeTaxRateSavingNotification` and `OnStripeTaxRateDeletingNotification` (see [Extending UmbCheckout](../../../../../core-services/extending-umbcheckout.md)).

The Stripe database service is what handles the insertion, retrieval, updating, and deletion of the Tax Rates within the database.

You can access the database service by injecting `IStripeTaxRateDatabaseService` which can be found within the namespace `UmbCheckout.Stripe.Addons.Interfaces`

#### GetTaxRatesAsync

Gets the Tax Rates

```csharp
Task<IEnumerable<TaxRate>> GetTaxRatesAsync(CancellationToken cancellationToken = default);
```

#### GetTaxRateAsync

Gets a specified Tax Rate

Parameters:

| Name | Detail                                                          |
| ---- | --------------------------------------------------------------- |
| key  | Key of the Stripe [Tax Rate](../../object-reference/taxrate.md) |

```csharp
Task<TaxRate?> GetTaxRateAsync(Guid key, CancellationToken cancellationToken = default);
```

#### GetTaxRateAsync

Gets a specified Tax Rate

Parameters:

| Name  | Detail                                                               |
| ----- | -------------------------------------------------------------------- |
| value | StripeId of the Stripe [Tax Rate](../../object-reference/taxrate.md) |

```csharp
Task<TaxRate?> GetTaxRateAsync(string value, CancellationToken cancellationToken = default);
```

#### CreateTaxRateAsync

Creates a Tax Rate

Parameters:

| Name    | Detail                                                   |
| ------- | -------------------------------------------------------- |
| taxRate | The Stripe [Tax Rate](../../object-reference/taxrate.md) |

```csharp
Task<TaxRate?> CreateTaxRateAsync(TaxRate taxRate, CancellationToken cancellationToken = default);
```

#### UpdateTaxRateAsync

Updates a specified Tax Rate

Parameters:

| Name    | Detail                                                   |
| ------- | -------------------------------------------------------- |
| taxRate | The Stripe [Tax Rate](../../object-reference/taxrate.md) |

```csharp
Task<TaxRate?> UpdateTaxRateAsync(TaxRate taxRate, CancellationToken cancellationToken = default);
```

#### DeleteTaxRateAsync

Deletes a specified Tax Rate

Parameters:

| Name | Detail                                                          |
| ---- | --------------------------------------------------------------- |
| key  | Key of the Stripe [Tax Rate](../../object-reference/taxrate.md) |

```csharp
Task<bool> DeleteTaxRateAsync(Guid key, CancellationToken cancellationToken = default);
```
