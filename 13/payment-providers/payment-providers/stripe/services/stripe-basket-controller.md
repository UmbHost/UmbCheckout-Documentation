# Stripe Basket Controller

The `StripeBasketController` is a preconfigured Umbraco Surface Controller which interacts with the [BasketService](../../../../core-services/basket-service.md).

It can be found within the namespace `UmbCheckout.Stripe.Controllers.Surface`

It has a number of methods available as a starting point to allow UmbCheckout to be consumed without the need to write C# code.

#### Add

Adds an item to the Basket, the example below would typically be used on the Product page

{% code title="Example add form" %}
```cshtml
@using (Html.BeginUmbracoForm<StripeBasketController>(nameof(StripeBasketController.Add), FormMethod.Post))
{
    <label for="quantity">Quantity:</label>
    <input type="number" name="quantity" value="1" min="1" /> <br />
    <input type="hidden" name="key" value="@Model.Key" />
    <input type="hidden" name="currencyCode" value="GBP" />
    <button type="submit">Buy</button>
}
```
{% endcode %}

This method sets the following TempData

| Key                            | Value                                                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UmbCheckout\_Added\_To\_Basket | Key of the [LineItem](../../../../core-services/object-reference/lineitem.md) added to the [Basket](../../../../core-services/object-reference/basket.md) |

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
    <input type="hidden" name="key" value="@lineItem.Id" />
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
    <input type="hidden" name="currencyCode" value="GBP" />
    <input type="hidden" name="redirectGuid" value="4a1f4198-e143-48ba-a0f5-1a7ef2df23aa" />
    <button type="submit">Buy</button>
}
```
