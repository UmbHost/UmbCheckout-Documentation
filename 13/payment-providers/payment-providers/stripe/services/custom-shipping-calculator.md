---
description: Replace the shipping options offered at Stripe Checkout with your own calculation
---

# Custom Shipping Calculator

{% hint style="info" %}
Available from UmbCheckout 1.6.0.
{% endhint %}

By default UmbCheckout offers the [shipping rates](../shipping-rates.md) configured in the backoffice. To calculate shipping yourself, for example from each product rather than per Basket, implement `IStripeShippingOptionsService` and register it from your own composer.

Your implementation is used whichever order the composers run in, so no `[ComposeAfter]` is needed.

## Example: shipping per product

This calculator charges each product's own shipping cost (a `shippingCost` Decimal property on the product) for every unit in the Basket, and offers it as a single option.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Stripe.Checkout;
using UmbCheckout.Shared.Models;
using UmbCheckout.Stripe.Interfaces;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Web;
using Umbraco.Extensions;

namespace MySite.Shipping;

public class PerProductShippingOptionsService : IStripeShippingOptionsService
{
    private readonly IUmbracoContextFactory _umbracoContextFactory;

    public PerProductShippingOptionsService(IUmbracoContextFactory umbracoContextFactory)
    {
        _umbracoContextFactory = umbracoContextFactory;
    }

    public Task<List<SessionShippingOptionOptions>> GetShippingOptions(Basket basket)
    {
        using var context = _umbracoContextFactory.EnsureUmbracoContext();

        var shipping = 0m;
        foreach (var lineItem in basket.LineItems)
        {
            var product = context.UmbracoContext.Content?.GetById(lineItem.Key);
            shipping += (product?.Value<decimal>("shippingCost") ?? 0m) * lineItem.Quantity;
        }

        return Task.FromResult(new List<SessionShippingOptionOptions>
        {
            new()
            {
                ShippingRateData = new SessionShippingOptionShippingRateDataOptions
                {
                    DisplayName = "Standard delivery",
                    Type = "fixed_amount",
                    FixedAmount = new SessionShippingOptionShippingRateDataFixedAmountOptions
                    {
                        // Stripe amounts are in minor units: 10.99 GBP is 1099.
                        Amount = (long)Math.Round(shipping * 100, MidpointRounding.AwayFromZero),
                        Currency = "gbp",
                    },
                },
            },
        });
    }
}

public class ShippingComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
        => builder.Services.AddTransient<IStripeShippingOptionsService, PerProductShippingOptionsService>();
}
```

## Things to keep to

* **Charge in your store's currency.** Every amount in a Stripe Checkout session must be in the currency the products are sold in.
* **Amounts are in minor units.** Stripe wants `1099` for 10.99 GBP. Zero-decimal currencies such as JPY are not multiplied by 100.
* **Between 1 and 5 options.** Stripe Checkout refuses a session with more than 5 shipping options, or with an empty list.
* You can return existing Stripe shipping rates (`ShippingRate = "shr_..."`) instead of `ShippingRateData`, or mix both.

Shipping options are only requested when shipping is enabled in the [Configuration](../../../../configuration/configuration-options.md).
