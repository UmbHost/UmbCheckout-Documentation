---
description: What changed in the latest UmbCheckout update for Umbraco 13
---

# Changes in the v13 Update

The latest UmbCheckout 1.x update brings the fixes made for UmbCheckout 17 to Umbraco 13. Your license keys, settings and data stay as they are.

* **Licensing:** the license is checked in the background, licensed domains are checked on every request, a warning banner shows when a request isn't licensed, and development mode works on your own machine. See [License Checks](license-checks.md).
* **Money and baskets:** prices and currencies are decided on the server, every currency is charged in its own minor unit, prices are checked again at checkout, and there is one Basket per site and currency. See [Prices, Currencies and Baskets](../configuration/prices-currencies-and-baskets.md).
* **Checkout and the webhook:** a paid Basket is cleared even if the customer doesn't return to the success page, the success page clears only the Basket that was paid, and each webhook event is handled once. See [Payment Flow / Lifecycle](../payment-providers/payment-providers/stripe/payment-flow-lifecycle.md#when-the-basket-is-cleared) and [Stripe Webhook Api](../payment-providers/payment-providers/stripe/services/stripe-webhook-api/README.md).
* **Backoffice:** settings screens need Settings section access, a missing Stripe key shows a clear message, refunds ask for confirmation and are recorded in the audit log, and the date filters include the chosen day.
* **uSync:** every Stripe setting is exported, and refused imports are reported as failed.
* **Services:** the async methods take a `CancellationToken`.
* **Stripe.net** stays on the same major version, so a minor Stripe.net update can't change the Stripe API version under you.
