# Add to Basket Button View Component

A prebuilt button using a form that adds a product to the Basket.

The table is unstyled and either requires styling within the partial `cshtml` file or using CSS.

The `cshtml` partial can be found at the following path:

Views -> Partials -> UmbCheckout -> \_StripeAddToBasketButton.cshtml

To be able to use the Basket View Component you will need to add the following to your `_ViewImports.cshtml` file

```cshtml
@addTagHelper *, UmbCheckout.Stripe
```

This will allow you to use the following tag helper:

```cshtml
<vc:stripe-add-to-basket-button></vc:stripe-add-to-basket-button>
```

Alternatively, you can load the View Component without using the tag helper:

```cshtml
@await Component.InvokeAsync(typeof(StripeAddToBasketButtonViewComponent))
```

### Configurable Properties

You can set the following properties

| Property     | Property Alias | Use                                                                  | Default Value |
| ------------ | -------------- | -------------------------------------------------------------------- | ------------- |
| product      | product        | <mark style="color:red;">**\[REQUIRED]**</mark> The Umbraco product  | null          |
| linkName     | link-name      | The text shown on the link                                           | Add to Basket |
| linkCssClass | link-css-class | The CSS class to be added to the button                              | null          |
| returnGuid   | return-guid    | The Guid of the Umbraco page to return to after adding to the Basket | null          |

