# Stripe Basket Controller

The `StripeBasketController` is a preconfigured Umbraco Surface Controller which interacts with the [BasketService](../../../../core-services/basket-service.md).

It can be found within the namespace `UmbCheckout.Stripe.Controllers.Surface`

It has a number of methods available as a starting point to allow UmbCheckout to be consumed without the need to write C# code.

The POST actions need an antiforgery token: `Html.BeginUmbracoForm` adds it. The price and currency are always read from the product on the server.

#### Add

Adds an item to the Basket, the example below would typically be used on the Product page

{% code title="Example add form" %}
```cshtml
@using (Html.BeginUmbracoForm<StripeBasketController>(nameof(StripeBasketController.Add), FormMethod.Post))
{
    <label for="quantity">Quantity:</label>
    <input type="number" name="quantity" value="1" min="1" /> <br />
    <input type="hidden" name="key" value="@Model.Key" />
    <button type="submit">Buy</button>
}
```
{% endcode %}

This method sets the following TempData

| Key                            | Value                                                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UmbCheckout\_Added\_To\_Basket | Key of the [LineItem](../../../../core-services/object-reference/lineitem.md) added to the [Basket](../../../../core-services/object-reference/basket.md) |
| UmbCheckout\_Add\_To\_Basket\_Failed | Key of the product that couldn't be added: it has no valid price, its currency isn't supported or differs from the page's, or a [limit](../../../../configuration/prices-currencies-and-baskets.md#limits) was reached |

#### Increase

Increases the specified item quantity, the example below would typically be used on the Basket page

```csharp
@using (Html.BeginUmbracoForm<StripeBasketController>(nameof(StripeBasketController.Add), FormMethod.Post))
{
    <input type="hidden" name="key" value="@lineItem.Key" />
    <button type="submit">+</button>
}
```

This method sets the following TempData

| Key                            | Value                                                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UmbCheckout\_Added\_To\_Basket | Key of the [LineItem](../../../../core-services/object-reference/lineitem.md) increased in the [Basket](../../../../core-services/object-reference/basket.md) |

#### Reduce

Reduces the specified item quantity, the example below would typically be used on the Basket page

{% code title="Example reduce item" %}
```cshtml
@using (Html.BeginUmbracoForm<StripeBasketController>(nameof(StripeBasketController.Reduce), FormMethod.Post))
{
    <input type="hidden" name="key" value="@lineItem.Key" />
    <button type="submit">-</button>
}
```
{% endcode %}

This method sets the following TempData

| Key                          | Value                                                                                                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UmbCheckout\_Basket\_Reduced | Key of the [LineItem](../../../../core-services/object-reference/lineitem.md) reduced in the [Basket](../../../../core-services/object-reference/basket.md) |

#### Remove

Removes the specified item, the example below would typically be used on the Basket page

{% code title="Example remove item" %}
```cshtml
@using (Html.BeginUmbracoForm<StripeBasketController>(nameof(StripeBasketController.Remove), FormMethod.Post))
{
    <input type="hidden" name="key" value="@lineItem.Key" />
    <button type="submit">Remove</button>
}
```
{% endcode %}

This method sets the following TempData

| Key                          | Value                                                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UmbCheckout\_Basket\_Removed | Key of the [LineItem](../../../../core-services/object-reference/lineitem.md) removed from the [Basket](../../../../core-services/object-reference/basket.md) |

#### Checkout

Starts the Stripe Checkout process, the example below would typically be used on the Basket page

```cshtml
@using (Html.BeginUmbracoForm<StripeBasketController>(nameof(StripeBasketController.Checkout), FormMethod.Post))
{
    <button type="submit">Checkout</button>
}
```

This method sets the following TempData

| Key                      | Value                                                                                                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UmbCheckout\_EmptyBasket | Returns true if there are 0 [LineItem](../../../../core-services/object-reference/lineitem.md)s in the [Basket](../../../../core-services/object-reference/basket.md) |
| UmbCheckout\_Basket\_Repriced | The names of the products whose price changed or that were removed when the Basket was priced again; the customer is returned to the page instead of going to Stripe |

Before redirecting to Stripe, Checkout prices every line again from the published products (see [Prices, Currencies and Baskets](../../../../configuration/prices-currencies-and-baskets.md#prices-are-checked-again-at-checkout)) and records the checkout session on the Basket.

#### EmptyBasket

Removes every item from the Basket. It is a GET action, so it can be used as a link, the example below would typically be used on the Basket page

```cshtml
<a href="@Url.SurfaceAction("EmptyBasket", "StripeBasket")">Empty basket</a>
```

#### When a change is refused

If a [Saving notification handler](../../../../core-services/extending-umbcheckout.md) cancels an add, reduce or remove, the Basket is left as it was and `UmbCheckout_Basket_Change_Cancelled` holds the handler's message.

#### Change return page

If you would like to change the page which the user is redirected to after carrying out one of the above actions you simply need to pass in the page Guid

```html
<input type="hidden" name="redirectGuid" value="4a1f4198-e143-48ba-a0f5-1a7ef2df23aa" />
```

The example below shows how to do this with the Add method

```csharp
@using (Html.BeginUmbracoForm<StripeBasketController>(nameof(StripeBasketController.Add), FormMethod.Post))
{
    <label for="quantity">Quantity:</label>
    <input type="number" name="quantity" value="1" min="1" /> <br />
    <input type="hidden" name="key" value="@Model.Key" />
    <input type="hidden" name="redirectGuid" value="4a1f4198-e143-48ba-a0f5-1a7ef2df23aa" />
    <button type="submit">Buy</button>
}
```
