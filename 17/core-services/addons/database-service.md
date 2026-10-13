---
description: A service which handles storing of the Basket in the database
---

# Database Service

{% hint style="info" %}
This feature requires a paid license. On an unlicensed site the service reads and writes nothing.
{% endhint %}

The database service is what handles the retrieval, insertion, updating, and clearing of the UmbCheckout Basket within the database. A Basket is stored only when **Store Basket In The Database** is on in the [configuration](../../configuration/configuration-options.md), and there is one row per session, site root culture and currency.

You can access the database service by injecting `IDatabaseService` which can be found within the namespace `UmbCheckout.Core.Addons.Interfaces`

Every method takes an optional `CancellationToken` as its last parameter.

#### GetBasketAsync

Gets the stored Basket for one site root culture and currency

| Name            | Detail                                          |
| --------------- | ----------------------------------------------- |
| sessionId       | The session to retrieve the [Basket](../object-reference/basket.md) for |
| siteRootCulture | The culture of the site root                    |
| currencyCode    | The 3-letter ISO currency code                  |

```csharp
Task<Basket?> GetBasketAsync(string sessionId, string? siteRootCulture, string? currencyCode, CancellationToken cancellationToken = default);
```

#### GetBasketsAsync

Gets every stored Basket for a session (one per site root culture and currency)

```csharp
Task<IEnumerable<Basket>> GetBasketsAsync(string sessionId, CancellationToken cancellationToken = default);
```

#### UpdateBasketAsync

Updates the stored Basket. Nothing is written when the Basket hasn't changed, so reading a Basket doesn't extend its expiry.

| Name      | Detail                                                                  |
| --------- | ----------------------------------------------------------------------- |
| sessionId | The session to store the [Basket](../object-reference/basket.md) for    |
| basket    | The [Basket](../object-reference/basket.md) to be stored                |

```csharp
Task<Basket?> UpdateBasketAsync(string sessionId, Basket basket, CancellationToken cancellationToken = default);
```

#### DeleteBasketAsync

Deletes the stored Basket for one site root culture and currency

```csharp
Task DeleteBasketAsync(string sessionId, string? siteRootCulture, string? currencyCode, CancellationToken cancellationToken = default);
```

#### DeleteBasketsAsync

Deletes every stored Basket last updated before the date (UTC), and returns how many were deleted

| Name      | Detail                         |
| --------- | ------------------------------ |
| expiryUtc | The date to delete from, in UTC |

```csharp
Task<int> DeleteBasketsAsync(DateTime expiryUtc, CancellationToken cancellationToken = default);
```
