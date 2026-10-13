# Stripe Webhook Api

Please ensure you have added the webhook secret as per the [configuration](../../configuration.md).

{% hint style="info" %}
Create your webhook endpoint on the [Stripe API version](https://dashboard.stripe.com/developers) used by the Stripe.net package UmbCheckout is built with. UmbCheckout 1.5 uses Stripe.net 50.x, which uses `2026-01-28.clover`

If you cannot use this version, please install a newer version of the [Stripe.net NuGet package](https://www.nuget.org/packages/Stripe.net), which matches the Stripe API versions available in your account.\
Use the [Stripe.net changelog](https://github.com/stripe/stripe-dotnet/blob/master/CHANGELOG.md) to find which version of the NuGet package you need.

**NOTE:** When upgrading between major versions of the Stripe.net NuGet package, there may be breaking changes, if you encounter these and have a paid license, open a [support ticket](../../../../../support/support-tickets.md); otherwise, open an issue on [the tracker](https://github.com/UmbHost/UmbCheckout/issues)
{% endhint %}

You can configure Stripe to send the webhook request to the below api:

`https://<your site>/umbraco/api/StripeWebhookApi/CheckoutEvents`

This will trigger the following notifications

| Stripe event                               | Notification                                                                                                |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `checkout.session.async_payment_failed`    | [OnPaymentFailedNotification](../../notifications/onpaymentfailednotification.md)                           |
| `checkout.session.async_payment_succeeded` | [OnPaymentSuccessNotification](../../notifications/onpaymentsuccessnotification.md)                         |
| `checkout.session.completed`               | [OnCheckoutSessionCompletedNotification](../../notifications/oncheckoutsessioncompletednotification.md)     |
| `checkout.session.expired`                 | [OnCheckoutSessionExpiredNotification](../../notifications/oncheckoutsessionexpirednotification.md)         |
| `charge.succeeded`                         | [OnChargeSucceededNotification](../../notifications/onchargesucceedednotification.md)                       |
| `charge.failed`                            | [OnChargeFailedNotification](../../notifications/onchargefailednotification.md)                             |
| `payment_intent.created`                   | [OnPaymentIntentCreatedNotification](../../notifications/onpaymentintentcreatednotification.md)             |
| `payment_intent.canceled`                  | [OnPaymentIntentCancelledNotification](../../notifications/onpaymentintentcancellednotification.md)         |
| `payment_intent.succeeded`                 | [OnPaymentIntentSucceededNotification](../../notifications/onpaymentintentsucceedednotification.md)         |
| `payment_intent.payment_failed`            | [OnPaymentIntentPaymentFailedNotification](../../notifications/onpaymentintentpaymentfailednotification.md) |
| `consent.promotions`                       | [OnPromotionalEmailConsentNotification](../../notifications/onpromotionalemailconsentnotification.md)       |

In Stripe, select the events you want to receive when you add the endpoint. Select at least `checkout.session.completed` and `checkout.session.async_payment_succeeded`: UmbCheckout uses them to record paid checkout sessions, so a paid Basket is cleared even if the customer doesn't return to the success page. Other event types are logged as unhandled and ignored.

### Each event is handled once

Stripe delivers each event at least once, and retries for up to 3 days until it gets a success response.

* Once your notification handlers have completed for an event, a redelivery is acknowledged without running them again. Handled event IDs are kept for 30 days.
* If a handler throws, the endpoint answers with an error (500) and Stripe's retry runs **all** the handlers again. Write handlers that are safe to run twice.
* While the handlers run, the event is claimed with a lease of 10 minutes. If a delivery dies, a retry takes the event over once the lease has expired. A late attempt that outlived its lease can't mark the event handled or release it, because that takes the lease token of the delivery that holds the claim.
* If the event can't be claimed (for example the database can't be reached), the endpoint answers with an error (500) and Stripe retries.
* If the webhook secret for the active mode isn't set, the endpoint answers with an error (500), and the error is logged once for each mode while the site runs. Further posts are logged at Debug level, so they can't fill the log.
* Events sent on another Stripe API version are still handled, with a warning in the log.



{% hint style="info" %}
To be able to test the Webhook on localhost you need to install the [Stripe CLI](https://github.com/stripe/stripe-cli) you can find the instructions on how to configure the CLI to test the Webhook on the Stripe website using the link below, look for step 3 entitled "**Test the webhook**":

[https://stripe.com/docs/webhooks/quickstart?lang=dotnet#run](https://stripe.com/docs/webhooks/quickstart?lang=dotnet#run)
{% endhint %}

### Replacing the event store

The records of which events are being handled or are done are kept by `IStripeWebhookEventStore` (`UmbCheckout.Stripe.Interfaces`). Register your own implementation to keep them elsewhere. `ClaimAsync(eventId, cancellationToken)` returns the outcome (`Claimed`, `AlreadyHandled` or `InProgress`) and, for a claim, a lease token. `CompleteAsync` and `ForgetAsync` have overloads that take that token. The token-less members still work: by default `ClaimAsync` calls `TryClaimAsync`.
