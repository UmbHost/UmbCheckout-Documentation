---
description: A service which handles all things around the Stripe Session
---

# Stripe Session Service

The Stripe session service is what creates and handles the creation, updating and clearing of the Stripe session.

You can access the Stripe session service by injecting `ISessionService` which can be found within the namespace `UmbCheckout.Stripe.Interfaces`

#### GetSession

Gets a Stripe session

Parameters:

| Name | Detail                   |
| ---- | ------------------------ |
| id   | Id of the Stripe Session |

```csharp
Session GetSession(string id);
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

Clears the Stripe session

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
