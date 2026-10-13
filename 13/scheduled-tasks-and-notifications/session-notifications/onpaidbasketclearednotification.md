---
description: >-
  Notification which is triggered after a Basket is cleared because its checkout
  session was paid, when the customer didn't return to the success page
---

# OnPaidBasketClearedNotification

The following properties are available within the notification

| Property Name     | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| Basket            | [Basket](../../core-services/object-reference/basket.md) |
| CheckoutSessionId | string                                                   |

It is published on the customer's next visit after the [webhook](../../payment-providers/payment-providers/stripe/services/stripe-webhook-api/README.md) recorded the payment. Use it, for example, to send a follow-up email.
