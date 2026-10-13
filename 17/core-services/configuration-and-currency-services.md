---
description: Services to read the configuration and the currency, and to check paid checkout sessions
---

# Configuration and Currency Services

These services can be found within the namespace `UmbCheckout.Core.Interfaces`. Inject them where you need them.

### IConfigurationService

Reads and saves the UmbCheckout [configuration](object-reference/umbcheckoutconfiguration.md). The configuration is cached; saving clears the cache on every server.

```csharp
Task<UmbCheckoutConfiguration?> GetConfigurationAsync(CancellationToken cancellationToken = default);
Task<bool> UpdateConfigurationAsync(UmbCheckoutConfiguration configuration, CancellationToken cancellationToken = default);
```

`GetConfigurationAsync` returns `null` until the configuration has been saved once. With the Addons package installed, an unlicensed site's Basket storage settings always read as off.

### ICurrencyService

Works out currencies on the server (see [Currency](../getting-started/configuration.md#currency)).

```csharp
// The currency a product is sold in: its site root's umbCheckoutCurrencyCode, else the fallback currency.
// Null (and an error logged) when neither is set.
Task<string?> GetCurrencyForContentAsync(IPublishedContent content);

// The currency to display: the node's (or the current page's site root's) umbCheckoutCurrencyCode,
// else the fallback currency, else the current UI culture's currency.
Task<string> GetCurrencyAsync(Guid? currencyNodeKey = null);
```

### IBasketContext

The site root culture and currency of the current page, which pick the shopper's Basket.

```csharp
string? SiteRootCulture { get; }
Task<string?> GetCurrencyAsync();
```

### IPaidCheckoutSessions

Answers whether a checkout session has been paid. UmbCheckout.Stripe registers one backed by the webhook's records; register your own to replace it.

```csharp
Task<bool> IsPaidAsync(string checkoutSessionId, CancellationToken cancellationToken = default);
```

Each of these services' async methods also has an overload that takes a `CancellationToken` (see [Cancellation Tokens](cancellation-tokens.md)).
