---
description: Notification which is triggered on a successful return from Stripe Checkout
---

# StripeResponseNotificationHandler

This notification handler handles the clearing of the Basket on a successful return from Stripe Checkout

It clears a Basket only when all of these are true:

* the request is for the configured success page (in any culture or domain);
* the return URL contains both `session_id` and `success` parameters, and `success` is `true`;
* the `session_id` is a Stripe checkout session ID (`cs_test_…` or `cs_live_…`), and Stripe reports it as `complete`;
* the customer's Basket for that site root culture and currency was the one checked out in that session.

For a checkout session created by UmbCheckout 1.x, which carries no Basket details, the Basket is found from the culture of the success page and the session's currency, and cleared as described in [Payment Flow / Lifecycle](../payment-flow-lifecycle.md#when-the-basket-is-cleared).

So revisiting an old or shared success link doesn't clear the visitor's current Basket. If Stripe can't be reached, the error is logged and the page still renders.

If the customer never returns to the success page, the webhook clears the Basket instead (see [Payment Flow / Lifecycle](../payment-flow-lifecycle.md#when-the-basket-is-cleared)).
