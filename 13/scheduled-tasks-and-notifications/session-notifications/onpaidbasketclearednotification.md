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

### Which sessions are paid

Whether a checkout session has been paid is answered by `IPaidCheckoutSessions` (`UmbCheckout.Core.Interfaces`):

```csharp
Task<bool> IsPaidAsync(string checkoutSessionId, CancellationToken cancellationToken = default);
```

UmbCheckout.Stripe registers an implementation backed by the webhook's records of paid checkout sessions, which are kept for 30 days. This works on every site, with every Basket store. A site can register its own implementation, and UmbCheckout.Stripe then leaves it in place. With no implementation registered, nothing is cleared on read.
