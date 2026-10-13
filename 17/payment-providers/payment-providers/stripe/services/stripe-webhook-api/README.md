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

In Stripe, select the events you want to receive when you add the endpoint. Other event types are logged as unhandled and ignored.



{% hint style="info" %}
To be able to test the Webhook on localhost you need to install the [Stripe CLI](https://github.com/stripe/stripe-cli) you can find the instructions on how to configure the CLI to test the Webhook on the Stripe website using the link below, look for step 3 entitled "**Test the webhook**":

[https://stripe.com/docs/webhooks/quickstart?lang=dotnet#run](https://stripe.com/docs/webhooks/quickstart?lang=dotnet#run)
{% endhint %}

