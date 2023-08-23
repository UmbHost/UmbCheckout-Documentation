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

| Property             | Property Alias          | Use                                                                  | Default Value |
| -------------------- | ----------------------- | -------------------------------------------------------------------- | ------------- |
| product              | product                 | <mark style="color:red;">**\[REQUIRED]**</mark> The Umbraco product  | null          |
| buttonName           | button-name             | The text shown on the button                                         | Add to Basket |
| buttonCssClass       | button-css-class        | The CSS class to be added to the button                              | null          |
| returnGuid           | return-guid             | The Guid of the Umbraco page to return to after adding to the Basket | null          |
| showQuantity         | show-quantity           | Shows or hides the quantity input                                    | true          |
| quantityLabel        | quantity-label          | The text shown above the quantity input                              | Quantity      |
| productNameAlias     | product-name-alias      | The alias which should be used for the product name                  | null          |
| inputCssClass        | input-css-class         | The CSS class added to the input elements                            | null          |
| selectCssClass       | select-css-class        | The CSS class added to the select elements                           | null          |
| labelCssClass        | label-css-class         | The CSS class added to the label elements                            | null          |
| formGroupSpacerClass | form-group-spacer-class | The CSS class added to the outer form element Div                    | null          |
| variantSelectLabel   | variant-select-label    | The text shown above the variant select input                        | null          |

