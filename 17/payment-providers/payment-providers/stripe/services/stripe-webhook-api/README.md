# Stripe Webhook Api

Please ensure you have added the webhook secret as per the [configuration](../../configuration.md).

### Adding the endpoint in Stripe

In the Stripe Dashboard, go to `Developers -> Webhooks -> Add endpoint` and enter:

`https://<your site>/umbraco/api/stripewebhookapi/checkoutevents`

Then copy the endpoint's signing secret into `UmbCheckout:Stripe:Test:WebHookSecret` (or `Live`, for the live endpoint).

{% hint style="info" %}
UmbCheckout 17 uses Stripe.net 50.x, which uses [Stripe API version](https://dashboard.stripe.com/developers) `2026-01-28.clover`. Create the endpoint on that version where you can: the Stripe API and CLI accept an `api_version`, while the Dashboard may only offer your account's default. Events on another version are still handled, with a warning in the log once per version.
{% endhint %}

Select at least these events:

* `checkout.session.completed`
* `checkout.session.async_payment_succeeded`

UmbCheckout uses them to record that a checkout session has been paid (delayed payment methods such as Bacs and SEPA Direct Debit report payment with `async_payment_succeeded`). Add any other events in the table below that your own code handles.

### Events and notifications

The endpoint publishes the following notifications:

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

Other event types are accepted and ignored.

### Each event is handled once

Stripe delivers each event at least once, and retries for up to 3 days until it gets a success response.

* Once your notification handlers have completed for an event, a redelivery is acknowledged without running them again. Handled event IDs are kept for 30 days.
* While the handlers run, the event is claimed with a lease of 10 minutes. If a delivery dies, a retry takes the event over once the lease has expired. A late attempt that outlived its lease can't mark the event handled or release it, because that takes the lease token of the delivery that holds the claim.
* A missing webhook secret is logged as an error once for each mode while the site runs. Further posts are logged at Debug level, so they can't fill the log.
* If a handler throws, or the server stops while handlers are running, the endpoint answers with an error and Stripe's retry runs **all** the handlers again. Write handlers that are safe to run twice.

| Situation                                       | Response | What Stripe does         |
| ----------------------------------------------- | -------- | ------------------------ |
| Handled, or an event type UmbCheckout ignores   | 202      | Done                     |
| Already handled                                 | 200      | Done                     |
| Being handled by another request or server      | 409      | Retries                  |
| A handler threw                                 | 500      | Retries                  |
| The webhook secret for the active mode is unset | 500      | Retries (and an error is logged, once for each mode while the site runs) |
| The event couldn't be claimed (for example the database is unreachable) | 500 | Retries |
| The signature or payload is invalid             | 400      | Retries                  |

The endpoint uses the live webhook secret when **Use live API details** is ticked in the [Stripe settings](../../configuration.md#stripe-settings), and the test one otherwise.

### Load-balanced sites

The endpoint works on every server, including front-end-only servers that don't run the backoffice. Each event is still handled once across all servers.

### Replacing the webhook controller

To change how the endpoint behaves, subclass `UmbCheckout.Stripe.Controllers.Api.StripeWebhookApiController`. When a subclass exists, UmbCheckout's own controller is removed, so only one endpoint answers:

* a subclass without its own `[Route]` takes over `/umbraco/api/stripewebhookapi/checkoutevents`;
* a subclass with its own `[Route]` answers only at that route, so point the Stripe endpoint at it.

{% hint style="info" %}
To be able to test the Webhook on localhost you need to install the [Stripe CLI](https://github.com/stripe/stripe-cli), see [How to test the Stripe Webhook on localhost](how-to-test-the-stripe-webhook-on-localhost.md).
{% endhint %}

### Replacing the event store

The records of which events are being handled or are done are kept by `IStripeWebhookEventStore` (`UmbCheckout.Stripe.Interfaces`). Register your own implementation to keep them elsewhere. `ClaimAsync(eventId, cancellationToken)` returns the outcome (`Claimed`, `AlreadyHandled` or `InProgress`) and, for a claim, a lease token. `CompleteAsync` and `ForgetAsync` have overloads that take that token. The token-less members still work: by default `ClaimAsync` calls `TryClaimAsync`.
