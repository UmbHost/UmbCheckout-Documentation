# Stripe Session Service

The Stripe session service is what creates and handles the creation, updating and clearing of the Stripe session.

You can access the Stripe session service by injecting `ISessionService` which can be found within the namespace `UmbCheckout.Stripe.Interfaces`

#### GetSession

Gets the current Stripe session

```csharp
Session GetSession(string id);
```

#### GetSessionAsync

Gets the current Stripe session asynchronously

```csharp
Task<Session> GetSessionAsync(string id);
```

#### CreateSession

Creates a Stripe session

```csharp
Session CreateSession(Basket basket);
```

#### CreateSessionAsync

Creates a Stripe session asynchronously

```csharp
Task<Session> CreateSessionAsync(Basket basket);
```

#### ClearSession

Clears the Stripe session

```csharp
void ClearSession(string id);
```

#### ClearSessionAsync

Clears the Stripe session asynchronously

```csharp
Task ClearSessionAsync(string id);
```
