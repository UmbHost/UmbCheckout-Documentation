# Stripe Database Service

The Stripe database service is what and handles the insertion, retrieval, updating and deletion of the Tax Rates and Shipping Rates within the database.

You can access the database service by injecting `IStripeDatabaseService` which can be found within the namespace `UmbCheckout.Stripe.Interfaces`

#### GetTaxRates

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

Gets the Tax Rates

```csharp
Task<IEnumerable<TaxRate>> GetTaxRates();
```

#### GetTaxRate

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

Gets a specified Tax Rate

```csharp
Task<TaxRate?> GetTaxRate(long id);
```

#### UpdateTaxRate

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

Updates a specified Tax Rate

```csharp
Task<TaxRate?> UpdateTaxRate(TaxRate taxRate);
```

DeleteTaxRate

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

Deletes a specified Tax Rate

```csharp
Task<bool> DeleteTaxRate(long id);
```

#### GetShippingRates

Gets the Shipping Rates

```csharp
Task<IEnumerable<ShippingRate>> GetShippingRates();
```

#### GetShippingRate

Gets a specified Shipping Rate

```csharp
Task<ShippingRate?> GetShippingRate(long id);
```

#### UpdateShippingRate

Updates a specified Shipping Rate

```csharp
Task<ShippingRate?> UpdateShippingRate(ShippingRate shippingRate);
```

#### DeleteShippingRate

Deletes a specified Shipping Rate

```csharp
Task<bool> DeleteShippingRate(long id);
```
