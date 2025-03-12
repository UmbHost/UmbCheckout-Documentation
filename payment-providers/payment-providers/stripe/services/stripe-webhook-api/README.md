# Stripe Webhook Api

Please ensure you have added the webhook secret as per the [configuration](../../configuration.md).

{% hint style="info" %}
The minimum [Stripe API version](https://dashboard.stripe.com/developers) is `2023-08-16`

If you cannot use this version, please install a newer version of the [Stripe.net NuGet package](https://www.nuget.org/packages/Stripe.net), which matches the Stripe API versions available in your account.\
Use the [Stripe.net changelog](https://github.com/stripe/stripe-dotnet/blob/master/CHANGELOG.md) to find which version of the NuGet package you need.
{% endhint %}

You can configure Stripe to send the webhook request to the below api:

`/umbraco/api/StripeWebhookApi/CheckoutEvents`

This will trigger the following notifications

| Event                                | Notification                                                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| CheckoutSessionAsyncPaymentFailed    | [OnPaymentFailedNotification](../../notifications/onpaymentfailednotification.md)                       |
| CheckoutSessionAsyncPaymentSucceeded | [OnPaymentSuccessNotification](../../notifications/onpaymentsuccessnotification.md)                     |
| CheckoutSessionCompleted             | [OnCheckoutSessionCompletedNotification](../../notifications/oncheckoutsessioncompletednotification.md) |
| CheckoutSessionExpired               | [OnCheckoutSessionExpiredNotification](../../notifications/oncheckoutsessionexpirednotification.md)     |



{% hint style="info" %}
To be able to test the Webhook on localhost you need to install the [Stripe CLI](https://github.com/stripe/stripe-cli) you can find the instructions on how to configure the CLI to test the Webhook on the Stripe website using the link below, look for step 3 entitled "**Test the webhook**":

[https://stripe.com/docs/webhooks/quickstart?lang=dotnet#run](https://stripe.com/docs/webhooks/quickstart?lang=dotnet#run)
{% endhint %}

