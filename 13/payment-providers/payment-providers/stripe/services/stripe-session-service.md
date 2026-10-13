---
description: A service which handles all things around the Stripe Session
---

# Stripe Session Service

The Stripe session service is what creates and handles the creation, updating and clearing of the Stripe session.

You can access the Stripe session service by injecting `IStripeSessionService` which can be found within the namespace `UmbCheckout.Stripe.Interfaces`

{% hint style="info" %}
Every method also has an overload that takes a `CancellationToken` as its last parameter. Call that one: the overloads without a token are `[Obsolete]`, scheduled for removal in 17.1. See [Cancellation Tokens](../../../../core-services/cancellation-tokens.md). If you mock or decorate this service, set up or override the token overloads too: UmbCheckout calls those. The synchronous methods (`GetSession`, `CreateSession` and `ClearSession`) block a thread on the Stripe call and are `[Obsolete]` too: use the async methods.
{% endhint %}

#### GetSession

Gets a Stripe session

Parameters:

| Name    | Detail                                                |
| ------- | ----------------------------------------------------- |
| id      | Id of the Stripe Session                              |
| options | Optional: the Stripe objects to expand on the session |

```csharp
Session GetSession(string id, UmbCheckoutSessionGetOptions? options = null);
```

#### GetSessionAsync

Gets a Stripe session asynchronously

Parameters:

| Name | Detail                   |
| ---- | ------------------------ |
| id   | Id of the Stripe Session |

```csharp
Task<Session> GetSessionAsync(string id);
```

#### CreateSession

Creates a Stripe session

Parameters:

| Name   | Detail                                        |
| ------ | --------------------------------------------- |
| basket | The basket to be stored in the Stripe Session |

```csharp
Session CreateSession(Basket basket);
```

#### CreateSessionAsync

Creates a Stripe session asynchronously

Parameters:

| Name   | Detail                                        |
| ------ | --------------------------------------------- |
| basket | The basket to be stored in the Stripe Session |

```csharp
Task<Session> CreateSessionAsync(Basket basket);
```

#### ClearSession

Clears (expires) the Stripe session, so it can no longer be paid

Parameters:

| Name | Detail                   |
| ---- | ------------------------ |
| id   | Id of the Stripe Session |

```csharp
void ClearSession(string id);
```

#### ClearSessionAsync

Clears the Stripe session asynchronously

Parameters:

| Name | Detail                   |
| ---- | ------------------------ |
| id   | Id of the Stripe Session |

```csharp
Task ClearSessionAsync(string id);
```
