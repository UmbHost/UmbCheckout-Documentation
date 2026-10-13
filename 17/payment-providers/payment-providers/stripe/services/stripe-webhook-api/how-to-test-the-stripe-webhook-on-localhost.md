# How to test the Stripe Webhook on localhost

To be able to test the Webhook on localhost you need to install the [Stripe CLI](https://github.com/stripe/stripe-cli) you can find the instructions on how to configure the CLI to test the Webhook on the Stripe website using the link below, look for step 3 entitled "**Test the webhook**":

[https://stripe.com/docs/webhooks/quickstart?lang=dotnet#run](https://stripe.com/docs/webhooks/quickstart?lang=dotnet#run)

Forward the events to your site's endpoint, for example:

```
stripe listen --forward-to https://localhost:44381/umbraco/api/stripewebhookapi/checkoutevents
```

The CLI prints a signing secret (`whsec_…`). Put it in your user secrets as `UmbCheckout:Stripe:Test:WebHookSecret`:

```
dotnet user-secrets set "UmbCheckout:Stripe:Test:WebHookSecret" "whsec_..."
```
