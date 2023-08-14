# Basket View Component

A prebuilt basket which uses a HTML table is included.

The table is unstyled and either requires styling within the partial cshtml file or using CSS.

The cshtml partial can be found at the following path:

Views -> Partials -> UmbCheckout -> \_StripeBasket.cshtml

To be able to use the Basket View Component you will need to add the following to your `_ViewImports.cshtml` file

```cshtml
@addTagHelper *, UmbCheckout.Stripe
```

This will allow you to use the following tag helper:

```cshtml
<vc:stripe-basket></vc:basket>
```

Alternatively, you can load the View Component without using the tag helper:

```cshtml
@await Component.InvokeAsync(typeof(StripeBasketViewComponent))
```

### Configurable Properties

You can set the following properties

| Property                | Use                                                  | Default Value                                                      |
| ----------------------- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| tableCssClass           | The CSS class to be added to the \<table> tag        | null                                                               |
| productNameColumnText   | The text shown in the product name column header     | Name                                                               |
| productPriceColumnText  | The text shown in the product price column header    | Price                                                              |
| quantityColumnText      | The text shown in the product quantity column header | Quantity                                                           |
| reduceColumnText        | The text shown in the product remove column header   | Reduce                                                             |
| increaseColumnText      | The text shown in the product increase column header | Increase                                                           |
| removeColumnText        | The text shown in the product remove column header   | Remove                                                             |
| reduceButtonCssClass    | The CSS class to be added to the reduce button       | null                                                               |
| reduceButtonText        | The text shown on the reduce button                  | -                                                                  |
| increaseButtonCssClass  | The CSS class to be added to the increase button     | null                                                               |
| increaseButtonText      | The text shown on the increase button                | +                                                                  |
| removeButtonCssClass    | The CSS class to be added to the remove ase button   | null                                                               |
| removeButtonText        | The text shown on the remove button                  | Remove                                                             |
| emptyBasketText         | The text shown when the Basket is empty              | Your basket is empty!                                              |
| subTotalText            | The text shown before the SubTotal                   | Sub Total:                                                         |
| formatCurrency          | The culture to format the SubTotal in                | GBP                                                                |
| subTotalInformationText | The text shown below the SubTotal                    | Coupons, Shipping and Tax are calculated on the next checkout step |
| checkoutButtonCssClass  | The CSS class to be added to the checkout button     | null                                                               |
| checkoutButtonText      | The text shown on the checkout button                | Checkout                                                           |

