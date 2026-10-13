---
description: The other public services in UmbCheckout.Stripe
---

# Other Stripe Services

These services can be found within the namespace `UmbCheckout.Stripe.Interfaces`. Each async method also has an overload that takes a `CancellationToken` (see [Cancellation Tokens](../../../../core-services/cancellation-tokens.md)).

### IStripeSettingsService

Reads and saves the [Stripe settings](../configuration.md#stripe-settings). They are cached; saving clears the cache on every server.

```csharp
Task<UmbCheckoutStripeSettings?> GetStripeSettingsAsync(CancellationToken cancellationToken = default);
Task<bool> UpdateStripeSettingsAsync(UmbCheckoutStripeSettings settings, CancellationToken cancellationToken = default);
```

### IUmbCheckoutStripeClientFactory

Creates the Stripe client for the active mode (test or live). Every UmbCheckout Stripe call uses it. It throws `StripeNotConfiguredException` when the API key for the active mode isn't set.

```csharp
Task<IStripeClient> CreateAsync();
```

### IStripeLineItemPricingService

Prices a product for the Basket: its rounded price and the currency it is sold in. Returns `null` when the product can't be sold (no price, an unsupported currency, or another currency than the page).

```csharp
Task<LineItemPrice?> GetPriceAsync(IPublishedContent product);
```

### IStripeBasketPricingService

Prices every line of a Basket again from the published products, as checkout does. `Changes` lists the lines whose price changed or that were removed.

```csharp
Task<BasketRepricing> RepriceAsync(Basket basket);
```

### IStripeShippingOptionsService

Builds the shipping options sent to Stripe Checkout: the active shipping rates that charge in the Basket's currency, at most 5. Register your own implementation to choose shipping options differently: see [Custom Shipping Calculator](custom-shipping-calculator.md).

```csharp
Task<List<SessionShippingOptionOptions>> GetShippingOptions(Basket basket, CancellationToken cancellationToken);
```
