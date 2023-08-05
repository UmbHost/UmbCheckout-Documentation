---
description: A service which handles getting the Stripe Tax Rates from the database
---

# Stripe Tax Rate Database Service

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

The Stripe database service is what handles the insertion, retrieval, updating, and deletion of the Tax Rates within the database.

You can access the database service by injecting `IStripeTaxRateDatabaseService` which can be found within the namespace `UmbCheckout.Stripe.Addons.Interfaces`

#### GetTaxRates

Gets the Tax Rates

```csharp
Task<IEnumerable<TaxRate>> GetTaxRates();
```

#### GetTaxRate

Gets a specified Tax Rate

Parameters:

| Name | Detail                                                                 |
| ---- | ---------------------------------------------------------------------- |
| key  | Key of the Stripe [Tax Rate](../../stripe/object-reference/taxrate.md) |

```csharp
Task<TaxRate?> GetTaxRate(Guid key);
```

#### GetTaxRate

Gets a specified Tax Rate

Parameters:

| Name  | Detail                                                                      |
| ----- | --------------------------------------------------------------------------- |
| value | StripeId of the Stripe [Tax Rate](../../stripe/object-reference/taxrate.md) |

```csharp
Task<TaxRate?> GetTaxRate(string value);
```

#### CreateTaxRate

Creates a Tax Rate

Parameters:

| Name    | Detail                                                          |
| ------- | --------------------------------------------------------------- |
| taxRate | The Stripe [Tax Rate](../../stripe/object-reference/taxrate.md) |

```csharp
Task<TaxRate?> CreateTaxRate(TaxRate taxRate);
```

#### UpdateTaxRate

Updates a specified Tax Rate

Parameters:

| Name    | Detail                                                          |
| ------- | --------------------------------------------------------------- |
| taxRate | The Stripe [Tax Rate](../../stripe/object-reference/taxrate.md) |

```csharp
Task<TaxRate?> UpdateTaxRate(TaxRate taxRate);
```

DeleteTaxRate

Deletes a specified Tax Rate

Parameters:

| Name | Detail                                                                 |
| ---- | ---------------------------------------------------------------------- |
| key  | Key of the Stripe [Tax Rate](../../stripe/object-reference/taxrate.md) |

```csharp
Task<bool> DeleteTaxRate(Guid key);
```
