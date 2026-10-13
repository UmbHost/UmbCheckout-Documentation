---
description: How UmbCheckout prices products, charges currencies and keeps baskets
---

# Prices, Currencies and Baskets

### Prices are decided on the server

* The price is read from the product's `umbCheckoutPrice` property when the product is added to the Basket, and again at checkout. Nothing posted from the browser sets a price or a currency.
* The currency is decided on the server (see [Currency](../getting-started/configuration.md#currency)). A posted `currencyCode` form field is ignored.
* A product can't be added when its price is empty, negative or not a number, or when its currency isn't one Stripe supports (a typo such as `GPB` is refused). The Basket page shows a notice that the item could not be added.

### Amounts are charged in the currency's minor unit

Stripe takes amounts as whole numbers of the currency's smallest unit. UmbCheckout converts each price with the rules Stripe publishes for each currency:

| Currencies                                                                                     | Decimal places charged |
| ---------------------------------------------------------------------------------------------- | ---------------------- |
| Most currencies (GBP, EUR, USD, ...)                                                           | 2                      |
| Zero-decimal currencies: BIF, CLP, DJF, GNF, JPY, KMF, KRW, MGA, PYG, RWF, VND, VUV, XAF, XOF, XPF | 0                      |
| Three-decimal currencies: BHD, JOD, KWD, OMR, TND                                               | 3                      |
| ISK and UGX                                                                                    | 0 (whole units only)   |

A price with more decimal places than its currency allows is rounded once, half away from zero (so 1.005 GBP becomes 1.01), when it is read from the product. A warning naming the product is logged, so an editor can correct it.

Prices are shown in the site culture, with the currency's own symbol and number of decimal places.

### Prices are checked again at checkout

When the shopper clicks **Checkout**, every line is priced again from the published product:

* a changed price is updated;
* a product that has been unpublished or deleted, has no price, or is now sold in another currency is removed.

If anything changed, the shopper isn't sent to Stripe. They return to the Basket page, which shows a notice naming the products that changed. Checking out again goes to Stripe, where the final amount is shown before payment.

If you build your own Basket page, show the `UmbCheckout_Basket_Repriced` TempData value (the names of the changed products).

### One Basket per site and currency

A shopper has one Basket for each site root culture and currency. For example, a shopper who visits your UK site (GBP) and your US site (USD) has two separate Baskets, and each site shows and checks out its own.

* A product sold in another currency than the page it is added from is refused, instead of going to a Basket the shopper can't see.
* Baskets saved before this update, which could mix currencies, are split into one Basket per currency the first time they are read. Lines with no currency are dropped and logged.

### Limits

These are Stripe Checkout's own limits:

| Limit                                  | Value     |
| -------------------------------------- | --------- |
| Quantity of one product in the Basket  | 1–999,999 |
| Different products in one Basket      | 100       |
| Shipping options offered at checkout  | 5         |

Adding more is refused with the "could not be added" message. The quantity limit includes what is already in the Basket.

### Shipping rates follow the Basket currency

Only shipping rates that charge in the Basket's currency (a fixed amount in that currency, or a currency option for it in Stripe) are offered at checkout. When none match, Stripe Checkout shows no shipping options.
