---
description: A service to handle the Get, Update and Clearing of the Session
---

# Session Service

The session service is what creates and handles the creation, retrieval, updating and clearing of the UmbCheckout Basket within the .NET session.

You can access the session service by injecting `ISessionService` which can be found within the namespace`UmbCheckout.Core.Interfaces`

{% hint style="info" %}
Every method also has an overload that takes a `CancellationToken` as its last parameter. Pass the request's token (`HttpContext.RequestAborted`) so the work stops when the shopper leaves. If you mock or decorate this service, set up or override the token overloads too: UmbCheckout calls those.
{% endhint %}

#### Get

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
Task<bool> Clear();
```
