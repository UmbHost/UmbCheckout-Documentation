# Session Service

The session service is what creates and handles the creation, retrieval, updating and clearing of the UmbCheckout Basket within the .NET session.

You can access the session service by injecting `ISessionService.cs` which can be found within the namespace namespace `UmbCheckout.Core.Interfaces`

#### Create

Gets the current UmbCheckout session from the .NET session

```csharp
Task<UmbCheckoutSession> Get();
```

#### Update

Updates the current UmbCheckout session or creates a new session if not found

```csharp
Task<UmbCheckoutSession> Update(Basket basket);
```

#### Clear

Clears the UmbCheckout session from the .NET session

```csharp
Task Clear();
```
