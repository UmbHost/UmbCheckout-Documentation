---
description: Notification which is triggered on a successful return from Stripe Checkout
---

# StripeResponseNotificationHandler

This notification handler handles the clearing of the Basket on a successful return from Stripe Checkout

This notification handler is only run when the Stripe return redirect contains both `session_id` and `success` parameters.

The `session_id` must return a `complete` result from Stripe

The `success` parameters must be `true`
