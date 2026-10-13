---
description: Change or refuse data going in, and change data coming out, without changing UmbCheckout
---

# Extending UmbCheckout

UmbCheckout publishes Umbraco notifications around its data. A site can change or refuse data before it is saved, and change data after it is read, without changing UmbCheckout itself.

Register handlers in a composer as usual:

{% code title="MyComposer.cs" %}
```csharp
public class MyComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AddNotificationAsyncHandler<OnShippingRateSavingNotification, StripeShippingRateIds>();
        builder.AddNotificationAsyncHandler<OnShippingRatesLoadedNotification, HideInternalShippingRates>();
    }
}
```
{% endcode %}

### Data hooks

| Data                        | Before it is saved (change it, or cancel)                                                    | After it is read (change what is returned) |
| --------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Configuration               | `OnConfigurationSavingNotification`                                                          | `OnConfigurationLoadedNotification`        |
| Stripe settings             | `OnStripeSettingsSavingNotification`                                                         | `OnStripeSettingsLoadedNotification`       |
| Shipping rates              | `OnShippingRateSavingNotification` (create and update), `OnShippingRateDeletingNotification` | `OnShippingRatesLoadedNotification`        |
| Tax rates (licensed add-on) | `OnStripeTaxRateSavingNotification`, `OnStripeTaxRateDeletingNotification`                   | `OnStripeTaxRatesLoadedNotification`       |
| Basket                      | `OnSessionSavingNotification`                                                                | `OnSessionLoadedNotification`              |

- **Saving** notifications carry the object about to be saved (`Target`) and, for an update, the stored one (`Existing`).
- **Loaded** notifications carry the object (`Target`) or, for shipping and tax rates, the list about to be returned (`Items`). Remove a rate from `Items` to hide it from lists and single reads alike (checkout and shop code). Editors still see and manage it in the backoffice.
- The existing `…Saved`, `…Deleted`, basket and session notifications are unchanged.

### Refuse a save or delete

Cancel with `CancelOperation(...)` and an `Error` or `Warning` event message. That message is what the person sees.

{% code title="StripeShippingRateIds.cs" %}
```csharp
public sealed class StripeShippingRateIds : INotificationAsyncHandler<OnShippingRateSavingNotification>
{
    public Task HandleAsync(OnShippingRateSavingNotification notification, CancellationToken cancellationToken)
    {
        if (!notification.Target.Value.StartsWith("shr_", StringComparison.Ordinal))
        {
            notification.CancelOperation(new EventMessage("Shipping", "Stripe shipping rate IDs start with shr_", EventMessageType.Error));
        }

        return Task.CompletedTask;
    }
}
```
{% endcode %}

Nothing is saved.

- **In the backoffice**, the error toast shows "Save cancelled" or "Delete cancelled" with your message.
- **On the shop**, a cancelled basket change leaves the basket as it was, and puts your message in `TempData[UmbCheckout.Shared.Consts.TempData.UmbCheckoutBasketChangeCancelled]` for your views to show.
- `notification.Cancel = true` also cancels, with a generic message.

### Change what is read

{% code title="HideInternalShippingRates.cs" %}
```csharp
public sealed class HideInternalShippingRates : INotificationAsyncHandler<OnShippingRatesLoadedNotification>
{
    public Task HandleAsync(OnShippingRatesLoadedNotification notification, CancellationToken cancellationToken)
    {
        notification.Items.RemoveAll(rate => rate.Name.StartsWith("Internal", StringComparison.Ordinal));
        return Task.CompletedTask;
    }
}
```
{% endcode %}

### Rules

- Loaded changes are for what is shown and handed to code. They are never stored.
- UmbCheckout reads the stored data, without the Loaded hooks, wherever it changes or charges data:
  - basket changes and checkout (checkout charges the stored basket, with every unit price re-priced from published content);
  - the backoffice screens that edit configuration, Stripe settings, shipping rates and tax rates;
  - uSync exports and imports.
- Your own code can do the same with `using (UmbCheckoutHooks.SuppressLoaded()) { ... }` (namespace `UmbCheckout.Shared.Notifications`). `UmbCheckoutHooks.SuppressSaving()` turns the Saving hooks off in the same way.
- Checkout records its Stripe session on the basket with the Saving hooks off, so a basket Saving handler can't stop the paid basket being cleared.
- Loaded handlers run on every other read, including frequent internal ones, so keep them cheap.
- A handler that throws fails the operation. UmbCheckout doesn't hide handler errors.

### When a paid basket is cleared

When a customer pays, the basket is cleared on the success page or, if they never come back to it, on their next visit (see [Payment Flow / Lifecycle](../payment-providers/payment-providers/stripe/payment-flow-lifecycle.md)). After a basket is cleared because its checkout session was paid, UmbCheckout publishes `OnPaidBasketClearedNotification`, with the basket and the checkout session ID. Use it, for example, to send a follow-up email.

Whether a checkout session has been paid is answered by `IPaidCheckoutSessions` (UmbCheckout.Core). UmbCheckout.Stripe registers an implementation backed by the webhook's paid-sessions table. A site can register its own implementation; UmbCheckout.Stripe then leaves it in place.

### Webhook notifications must be safe to repeat

Stripe delivers each webhook event at least once. Once your handlers have completed for an event, a redelivery is acknowledged without running them again. If a handler throws, or the server stops while handlers run, Stripe's retry runs all the handlers again. Write webhook notification handlers so that running them twice does no harm (for example, check whether you've already sent that order's email).

### Replace a service

Every UmbCheckout service is a public interface registered in Umbraco's dependency injection, so a site can read every entity through it, decorate it or replace it. When you mock or decorate a service, cover the overloads that take a `CancellationToken`: UmbCheckout calls those (see [Cancellation tokens](cancellation-tokens.md)).
