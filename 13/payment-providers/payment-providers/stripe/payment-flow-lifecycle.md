---
description: Learn how the payment flow / lifecycle works with Stripe
---

# Payment Flow / Lifecycle

When you use the Stripe payment provider it makes use of the [Stripe Checkout](https://stripe.com/docs/payments/checkout) features.

The flow / lifecycle works like this:

1. The customer browses the website and adds a product to the [Basket](../../../core-services/object-reference/basket.md)
2. Customer views their basket and initiates the Checkout process
3. UmbCheckout converts the [Basket](../../../core-services/object-reference/basket.md) for Stripe and sends this over via the Stripe API
4. The Stripe API returns a unique payment URL
5. The customer is redirected to the Hosted Stripe payment page
6. On payment success, the Customer is returned to the payment success page, or on payment failure / cancel the Customer is returned to the payment canceled page
7. After the transaction, a [webhook](services/stripe-webhook-api/) sends the response and triggers a [Notification](notifications/)

### When the Basket is cleared

A paid Basket is cleared in one of two ways, whichever happens first:

* **The customer returns to the success page.** The [StripeResponseNotificationHandler](notification-handlers/striperesponsenotificationhandler.md) clears the Basket that the checkout session paid for.
* **The customer doesn't return** (for example they closed the tab, or paid by a delayed method such as Bacs Direct Debit). The webhook records the checkout session as paid when Stripe sends `checkout.session.completed` (paid) or `checkout.session.async_payment_succeeded`. The next time the customer's Basket is read, it is cleared and [OnPaidBasketClearedNotification](../../../scheduled-tasks-and-notifications/session-notifications/onpaidbasketclearednotification.md) is published.

An expired or unpaid checkout session never clears the Basket, so a customer who abandons the payment keeps their Basket.

<figure><img src="../../../.gitbook/assets/Screenshot 2023-08-18 130555.png" alt=""><figcaption></figcaption></figure>

