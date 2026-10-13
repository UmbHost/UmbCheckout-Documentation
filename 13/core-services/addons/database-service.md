---
description: A service which handles storing of the Basket in the database
---

# Database Service

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

The database service is what handles the insertion, updating, and clearing of the UmbCheckout Basket within the database.

You can access the database service by injecting `IDatabaseService` which can be found within the namespace `UmbCheckout.Core.Addons.Interfaces`

#### UpdateBasket

Updates the stored Basket

Parameters:

| Name      | Detail                                                                  |
| --------- | ----------------------------------------------------------------------- |
| sessionId | The session to retrieve the [Basket](../object-reference/basket.md) for |
| basket    | The [Basket](../object-reference/basket.md) to be stored                |

```csharp
Task<Basket> UpdateBasket(string sessionId, Basket basket);
```

#### DeleteBasket

Deleted the stored Basket

Parameters:

| Name      | Detail                                                                |
| --------- | --------------------------------------------------------------------- |
| sessionId | The session to delete the [Basket](../object-reference/basket.md) for |

```csharp
Task DeleteBasket(string sessionId);
```

#### DeleteBaskets

Deleted all of the stored Baskets older than the specified days

Parameters:

| Name           | Detail                  |
| -------------- | ----------------------- |
| expiryDateTime | The days to delete from |

```csharp
Task DeleteBaskets(DateTime expiryDateTime);
```
