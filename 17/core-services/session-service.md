---
description: A service to handle the Get, Update and Clearing of the Session
---

# Session Service

The session service is what creates and handles the creation, retrieval, updating and clearing of the UmbCheckout Basket within the .NET session.

You can access the session service by injecting `ISessionService` which can be found within the namespace `UmbCheckout.Core.Interfaces`

A shopper has one Basket per site root culture and currency (see [Prices, Currencies and Baskets](../configuration/prices-currencies-and-baskets.md#one-basket-per-site-and-currency)). The overloads without a culture or currency use the current page's.

{% hint style="info" %}
Every method also has an overload that takes a `CancellationToken` as its last parameter. See [Cancellation Tokens](cancellation-tokens.md).
{% endhint %}

#### Get

Gets the current UmbCheckout session from the .NET session (and, on licensed sites, from the cookie or database). A Basket whose checkout session has been paid is cleared and an empty one returned (see [Payment Flow / Lifecycle](../payment-providers/payment-providers/stripe/payment-flow-lifecycle.md#when-the-basket-is-cleared)).

Parameters:

| Name            | Detail                                                |
| --------------- | ----------------------------------------------------- |
| siteRootCulture | Optional: the culture of the site root                |
| currencyCode    | Optional: the 3-letter ISO currency code of the Basket |

```csharp
Task<UmbCheckoutSession> Get();
Task<UmbCheckoutSession> Get(string? currencyCode);
Task<UmbCheckoutSession> Get(string? siteRootCulture, string? currencyCode);
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

Clears the UmbCheckout session from the .NET session. Returns `true` when the Basket is still present afterwards.

```csharp
Task<bool> Clear();
Task<bool> Clear(string? currencyCode);
Task<bool> Clear(string? siteRootCulture, string? currencyCode);
```
