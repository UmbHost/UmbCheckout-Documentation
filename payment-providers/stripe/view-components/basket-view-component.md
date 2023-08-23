# Basket View Component

A prebuilt basket that uses an HTML table is included.

The table is unstyled and either requires styling within the partial `cshtml` file or using CSS.

The `cshtml` partial can be found at the following path:

Views -> Partials -> UmbCheckout -> \_StripeBasket.cshtml

To be able to use the Basket View Component you will need to add the following to your `_ViewImports.cshtml` file

```cshtml
@addTagHelper *, UmbCheckout.Stripe
```

This will allow you to use the following tag helper:

```cshtml
<vc:stripe-basket></vc:stripe-basket>
```

Alternatively, you can load the View Component without using the tag helper:

```cshtml
@await Component.InvokeAsync(typeof(StripeBasketViewComponent))
```

### Configurable Properties

You can set the following properties

| Property                | Property Alias             | Use                                                  | Default Value                                                      |
| ----------------------- | -------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| tableCssClass           | table-css-class            | The CSS class to be added to the \<table> tag        | null                                                               |
| productNameColumnText   | product-name-column-text   | The text shown in the product name column header     | Name                                                               |
| productPriceColumnText  | product-price-column-text  | The text shown in the product price column header    | Price                                                              |
| quantityColumnText      | quantity-column-text       | The text shown in the product quantity column header | Quantity                                                           |
| reduceColumnText        | reduce-column-text         | The text shown in the product remove column header   | Reduce                                                             |
| increaseColumnText      | increase-column-text       | The text shown in the product increase column header | Increase                                                           |
| removeColumnText        | remove-column-text         | The text shown in the product remove column header   | Remove                                                             |
| reduceButtonCssClass    | reduce-button-css-class    | The CSS class to be added to the reduce button       | null                                                               |
| reduceButtonText        | reduce-button-text         | The text shown on the reduce button                  | -                                                                  |
| increaseButtonCssClass  | increase-button-css-class  | The CSS class to be added to the increase button     | null                                                               |
| increaseButtonText      | increase-button-text       | The text shown on the increase button                | +                                                                  |
| removeButtonCssClass    | remove-button-css-class    | The CSS class to be added to the remove ase button   | null                                                               |
| removeButtonText        | remove-button-text         | The text shown on the remove button                  | Remove                                                             |
| emptyBasketText         | empty-basket-text          | The text shown when the Basket is empty              | Your basket is empty!                                              |
| subTotalText            | sub-total-text             | The text shown before the SubTotal                   | Sub Total:                                                         |
| formatCurrency          | format-currency            | The culture to format the SubTotal in                | GBP                                                                |
| subTotalInformationText | sub-total-information-text | The text shown below the SubTotal                    | Coupons, Shipping and Tax are calculated on the next checkout step |
| checkoutButtonCssClass  | checkout-button-css-class  | The CSS class to be added to the checkout button     | null                                                               |
| checkoutButtonText      | checkout-button-text       | The text shown on the checkout button                | Checkout                                                           |

