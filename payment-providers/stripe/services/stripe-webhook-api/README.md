# Stripe Webhook Api

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
To be able to test the Webhook on localhost you need to install the [Stripe CLI](https://github.com/stripe/stripe-cli) you can find the instructions on how to configure the CLI to test the Webhook on the Stripe website here, look for step 3 entitled "**Test the webhook**":

[https://stripe.com/docs/webhooks/quickstart?lang=dotnet#run](https://stripe.com/docs/webhooks/quickstart?lang=dotnet#run)
{% endhint %}

