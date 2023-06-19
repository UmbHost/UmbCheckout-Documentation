# Stripe Webhook Api

You can configure Stripe to send the webhook request to the below api:

`/umbraco/api/StripeWebhookApi/CheckoutEvents`

This will trigger the following notifications

| Event                                | Notification                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| CheckoutSessionAsyncPaymentFailed    | [OnPaymentFailedNotification](notifications/onpaymentfailednotification.md)                       |
| CheckoutSessionAsyncPaymentSucceeded | [OnPaymentSuccessNotification](notifications/onpaymentsuccessnotification.md)                     |
| CheckoutSessionCompleted             | [OnCheckoutSessionCompletedNotification](notifications/oncheckoutsessioncompletednotification.md) |
| CheckoutSessionExpired               | [OnCheckoutSessionExpiredNotification](notifications/oncheckoutsessionexpirednotification.md)     |
