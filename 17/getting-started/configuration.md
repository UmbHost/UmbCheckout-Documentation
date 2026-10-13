---
description: Configuring UmbCheckout
---

# Configuration

There is no additional coding required to make use of UmbCheckout after being installed.

After the package is installed head to Settings -> UmbCheckout -> Configuration to set the Checkout **Success** and **Cancel** pages / URLs.

**UmbCheckout relies on IPublishedContent and does not work with IContent**

### Required Product Properties

Your product needs to have the following required properties added

| Alias            | Property Type |
| ---------------- | ------------- |
| umbCheckoutPrice | Decimal       |

Your product can have the following optional properties

| Alias                  | Property Type |
| ---------------------- | ------------- |
| umbCheckoutDescription | Text Area     |

If `umbCheckoutDescription` is empty, the `description` property is used.

The price is read from `umbCheckoutPrice` on the server whenever a product is added and again at checkout. A product with an empty price can't be added to the Basket (it is never sold at 0.00).

### Currency

Each price is charged in one currency, which UmbCheckout works out on the server. The browser never decides it.

The currency a product is sold in is:

1. the `umbCheckoutCurrencyCode` property on the product's site root, or, if that is empty,
2. the **Fallback Currency Code** in the [configuration](../configuration/configuration-options.md).

If neither is set, the product can't be added to the Basket and an error is logged.

Use the 3-letter ISO 4217 code, for example `GBP`. The code must be a currency Stripe supports: a typo such as `GPB` is refused. To sell in more than one currency, give each site root (or each culture's root) its own `umbCheckoutCurrencyCode`.

See [Prices, Currencies and Baskets](../configuration/prices-currencies-and-baskets.md) for how amounts are rounded and charged.
