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

### Currency

Each price is charged in one currency. UmbCheckout works out the currency on the server, in this order:

1. The `umbCheckoutCurrencyCode` property on the currency node passed to the view component (its `currencyNodeKey` parameter).
2. The `umbCheckoutCurrencyCode` property on the site root.
3. The **Fallback Currency Code** in the [configuration](../configuration/configuration-options.md).
4. The currency of the current UI culture.

The currency is always decided on the server, never by the browser. Use the 3-letter ISO 4217 code, for example `GBP`; it must be a currency Stripe supports. To sell in more than one currency, give each site root (or each culture's root) its own `umbCheckoutCurrencyCode`. See [Prices, Currencies and Baskets](../configuration/prices-currencies-and-baskets.md) for how amounts are rounded and charged, and for the Basket limits.
