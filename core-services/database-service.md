---
description: A service which handles storing of the Basket in the database
---

# Database Service

The database service is what handles the retrieval of the UmbCheckout Basket within the database.

You can access the database service by injecting `IDatabaseService` which can be found within the namespace`UmbCheckout.Core.Interfaces`

#### GetBasket

The gets the stored Basket

Parameters:

| Name      | Detail                                                               |
| --------- | -------------------------------------------------------------------- |
| sessionId | The session to retrieve the [Basket](object-reference/basket.md) for |

```csharp
Task<Basket?> GetBasket(string sessionId);
```
