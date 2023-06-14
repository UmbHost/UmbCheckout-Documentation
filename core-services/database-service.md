# Database Service

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

The database service is what and handles the insertion, retrieval, updating and clearing of the UmbCheckout Basket within the database.

You can access the database service by injecting `IDatabaseService.cs` which can be found within the namespace namespace `UmbCheckout.Core.Interfaces`

#### GetBasket

The gets the stored Basket

```csharp
Task<Basket?> GetBasket(string sessionId);
```

#### UpdateBasket

Updates the stored Basket

```csharp
Task<Basket> UpdateBasket(string sessionId, Basket basket);
```

#### DeleteBasket

Deleted the stored Basket

```csharp
Task DeleteBasket(string sessionId);
```

#### DeleteBaskets

Deleted all of the stored Baskets older than the specified days

```csharp
Task DeleteBaskets(DateTime expiryDateTime);
```
