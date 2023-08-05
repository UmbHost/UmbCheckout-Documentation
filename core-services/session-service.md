---
description: A service to handle the Get, Update and Clearing of the Session
---

# Session Service

The session service is what creates and handles the creation, retrieval, updating and clearing of the UmbCheckout Basket within the .NET session.

You can access the session service by injecting `ISessionService` which can be found within the namespace`UmbCheckout.Core.Interfaces`

#### Create

Gets the current UmbCheckout session from the .NET session

```csharp
Task<UmbCheckoutSession> Get();
```

#### Update

Updates the current UmbCheckout session or create a new session if not found

Parameters:

| Name   | Detail                                   |
| ------ | ---------------------------------------- |
| basket | The [Basket](object-reference/basket.md) |

```csharp
Task<UmbCheckoutSession> Update(Basket basket);
```

#### Clear

Clears the UmbCheckout session from the .NET session

```csharp
Task Clear();
```
