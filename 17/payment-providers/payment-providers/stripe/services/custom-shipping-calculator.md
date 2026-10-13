---
description: Replace the shipping options offered at Stripe Checkout with your own calculation
---

# Custom Shipping Calculator

By default UmbCheckout offers the [shipping rates](../shipping-rates.md) configured in the backoffice: the active rates that charge in the Basket's currency, at most 5. To calculate shipping yourself, for example from each product rather than per Basket, implement `IStripeShippingOptionsService` and register it from your own composer.

Your implementation is used whichever order the composers run in, so no `[ComposeAfter]` is needed.

## Example: shipping per product

This calculator charges each product's own shipping cost (a `shippingCost` Decimal property on the product) for every unit in the Basket, and offers it as a single option.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Stripe.Checkout;
using UmbCheckout.Shared.Extensions;
using UmbCheckout.Shared.Models;
using UmbCheckout.Stripe.Interfaces;
using UmbCheckout.Stripe.Money;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Extensions;

namespace MySite.Shipping;

public class PerProductShippingOptionsService : IStripeShippingOptionsService
{
    private readonly IPublishedContentCache _contentCache;

    public PerProductShippingOptionsService(IPublishedContentCache contentCache)
    {
        _contentCache = contentCache;
    }

    // Required by the interface; UmbCheckout calls the overload with a CancellationToken.
    public Task<List<SessionShippingOptionOptions>> GetShippingOptions(Basket basket)
        => GetShippingOptions(basket, CancellationToken.None);

    public async Task<List<SessionShippingOptionOptions>> GetShippingOptions(Basket basket, CancellationToken cancellationToken)
    {
        var currency = basket.CurrencyCode ?? basket.LineItems.SingleCurrency();
        if (currency is null)
        {
            return [];
        }

        var shipping = 0m;
        foreach (var lineItem in basket.LineItems)
        {
            var product = await _contentCache.GetByIdAsync(lineItem.Key);
            shipping += (product?.Value<decimal>("shippingCost") ?? 0m) * lineItem.Quantity;
        }

        return
        [
            new SessionShippingOptionOptions
            {
                ShippingRateData = new SessionShippingOptionShippingRateDataOptions
                {
                    DisplayName = "Standard delivery",
                    Type = "fixed_amount",
                    FixedAmount = new SessionShippingOptionShippingRateDataFixedAmountOptions
                    {
                        Amount = StripeCurrency.ToMinorUnits(StripeCurrency.Round(shipping, currency), currency),
                        Currency = StripeCurrency.ApiCode(currency),
                    },
                },
            },
        ];
    }
}

public class ShippingComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
        => builder.Services.AddTransient<IStripeShippingOptionsService, PerProductShippingOptionsService>();
}
```

## Things to keep to

* **Charge in the Basket's currency.** Every amount in a Stripe Checkout session must be in one currency. Use `basket.CurrencyCode`, and leave out any rate that charges in another currency.
* **Amounts are in minor units.** Stripe wants `1099` for 10.99 GBP, `500` for 500 JPY and `1235` for 1.235 KWD. `StripeCurrency.ToMinorUnits` converts for you, and `StripeCurrency.Round` rounds to what the currency can be charged in first.
* **At most 5 options.** Stripe Checkout refuses a session with more than 5 shipping options.
* **Return an empty list to offer no shipping.** Checkout still goes ahead; Stripe then collects no shipping charge.
* You can return existing Stripe shipping rates (`ShippingRate = "shr_..."`) instead of `ShippingRateData`, or mix both.

Shipping options are only requested when shipping is enabled in the [Configuration](../../../../configuration/configuration-options.md).
