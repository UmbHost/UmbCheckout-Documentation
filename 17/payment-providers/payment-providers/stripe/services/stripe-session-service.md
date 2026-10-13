---
description: A service which handles all things around the Stripe Session
---

# Stripe Session Service

The Stripe session service is what creates and handles the creation, updating and clearing of the Stripe session.

You can access the Stripe session service by injecting `IStripeSessionService` which can be found within the namespace `UmbCheckout.Stripe.Interfaces`

#### GetSessionAsync

Gets a Stripe session

| Name | Detail                   |
| ---- | ------------------------ |
| id   | Id of the Stripe Session |

```csharp
Task<Session> GetSessionAsync(string id);
Task<Session> GetSessionAsync(string id, CancellationToken cancellationToken);
```

#### CreateSessionAsync

Creates a Stripe Checkout session for the Basket. The session is created from the Basket as given: re-pricing happens before this, in the [Stripe Basket Controller](stripe-basket-controller.md)'s Checkout. A line whose product is no longer published is skipped.

| Name   | Detail                                        |
| ------ | --------------------------------------------- |
| basket | The basket to be stored in the Stripe Session |

```csharp
Task<Session> CreateSessionAsync(Basket basket);
Task<Session> CreateSessionAsync(Basket basket, CancellationToken cancellationToken);
```

#### ClearSessionAsync

Clears (expires) the Stripe session, so it can no longer be paid

| Name | Detail                   |
| ---- | ------------------------ |
| id   | Id of the Stripe Session |

```csharp
Task ClearSessionAsync(string id);
Task ClearSessionAsync(string id, CancellationToken cancellationToken);
```

#### Obsolete methods

`GetSession(string id, UmbCheckoutSessionGetOptions? options = null)`, `CreateSession(Basket basket)` and `ClearSession(string id)` still work but are `[Obsolete]`: they block a thread on the Stripe call. Use the async methods above.
