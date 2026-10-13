---
description: What changed in UmbCheckout 17 for Umbraco 17
---

# What's new in 17

UmbCheckout 17 brings UmbCheckout to Umbraco 17. The screens, the settings and the way you build a shop are the same as in UmbCheckout 1.x for Umbraco 13. What changed is the technology underneath, the license, and many fixes to how money and baskets are handled.

To move a site from Umbraco 13, see [Upgrading from v13](upgrading-from-v13.md).

### Umbraco 17 and .NET 10

* Requires Umbraco 17.6 or later and .NET 10.
* The backoffice screens are rebuilt for Umbraco 17's backoffice, with the same layout, fields and messages as in v13. They are under **Settings → UmbCheckout**; the payments, invoices and refunds screens are in the **UmbCheckout** section.
* Data is stored with Entity Framework Core, on SQL Server or SQLite. An existing database is adopted on first start: no data is copied or lost.
* You no longer need `app.UseSession()` in `Program.cs`.

### Licensing

* Licenses are an annual subscription for each production domain.
* Every running instance of a production site needs a license. Replica add-ons license the extra instances of a load-balanced site.
* Licensed features work on `localhost` and `*.local` in Debug builds without a license (development mode), and a free development license covers staging sites.
* A licensed site only enables the licensed features for the domains on its license, and shows a banner on the shop when a request isn't licensed.
* The license is checked in the background. A short outage of the license server doesn't switch your features off.

See [Licensing](licensing.md).

### Money and baskets

* Prices and currencies are decided on the server, from the product, at add-to-basket and again at checkout. A changed price is shown to the shopper before they pay.
* Every currency is charged in its own minor unit, including zero-decimal (JPY) and three-decimal (KWD) currencies.
* One Basket per site root culture and currency.
* Quantities and Basket size follow Stripe's limits.
* Shipping rates are offered only in the Basket's currency.

See [Prices, Currencies and Baskets](../configuration/prices-currencies-and-baskets.md).

### Checkout and the Stripe webhook

* A paid Basket is cleared even when the shopper never returns to the success page: the webhook records the payment, and the shopper's next visit clears it. A new notification, `OnPaidBasketClearedNotification`, tells your code.
* The success page clears only the Basket that the returning checkout session paid for.
* The webhook handles each Stripe event once, answers with an error so Stripe retries when a handler fails, and logs a missing webhook secret.
* The webhook works on front-end-only servers of a load-balanced site.

See [Payment Flow / Lifecycle](../payment-providers/payment-providers/stripe/payment-flow-lifecycle.md) and [Stripe Webhook Api](../payment-providers/payment-providers/stripe/services/stripe-webhook-api/README.md).

### Extending UmbCheckout

* New cancellable **Saving** and **Deleting** notifications, and **Loaded** notifications, let your code change or refuse data going in and change data coming out. See [Extending UmbCheckout](../core-services/extending-umbcheckout.md).
* Every service is a public interface, and the async methods take a `CancellationToken`. See [Cancellation Tokens](../core-services/cancellation-tokens.md).
* You can replace the Stripe webhook controller by subclassing it.

### Other changes

* uSync exports and imports every Stripe setting, and saving the Stripe settings writes the uSync file.
* The Umbraco Forms workflow charges the stored Basket and no longer blocks a thread.
* Configuration and Stripe settings are cached, and cleared on every server of a load-balanced site when they are saved.
* Missing Stripe API keys show a clear message instead of an error page.
* Telemetry is sent in the background and can't slow the site down.

### Breaking changes

See [Upgrading from v13](upgrading-from-v13.md#breaking-changes) for the API changes that affect custom code.

### Updates to 17

* **Licensing:** after an outage of more than 30 days the license switches off while the site runs, a license that doesn't cover the site reads "Not licensed for this site", and a site whose license can't be evaluated at startup still starts. See [Licensing](licensing.md#how-the-license-is-checked).
* **Money:** display and charge use one table of decimal places, currency codes are trimmed and upper-cased, and re-pricing removes lines with a quantity outside 1–999,999 and lines past the 100th. See [Prices, Currencies and Baskets](../configuration/prices-currencies-and-baskets.md).
* **Baskets:** a Basket whose checkout session has been paid is cleared on its next read from any Basket store, the success page for a checkout session created by UmbCheckout 1.x clears the matching Basket, and a Basket cookie cleared in a request isn't restored later in it. See [Payment Flow / Lifecycle](../payment-providers/payment-providers/stripe/payment-flow-lifecycle.md#when-the-basket-is-cleared).
* **The webhook:** a lease token stops a late retry from completing or releasing a newer claim, a failed claim answers 500, and a missing webhook secret is logged as an error once for each mode. See [Stripe Webhook Api](../payment-providers/payment-providers/stripe/services/stripe-webhook-api/README.md).
* **Backoffice:** payments, invoices and refunds need the UmbCheckout section, invoices need the Invoices permission, and viewing a charge or a refund, or refunding, needs the Refunds permission. Administrators pass both permission checks. See [Payments, Invoices and Refunds](../payment-providers/payment-providers/stripe/addons/payments-invoices-and-refunds.md#permissions).
* **Stripe errors:** a key Stripe rejects shows a fixed message that never includes the key. A Stripe timeout is logged as a warning, a request the customer or editor abandoned ends quietly, and a refund always completes.
* **Licensed add-ons:** the cookie-clear handler and the tax rate uSync items need a license.
* **Telemetry:** the `installedPackages` list is sent. See [Anonymous Telemetry](anonymous-telemetry.md).
* **Obsolete members:** the overloads without a `CancellationToken`, the blocking `IStripeSessionService` methods and the replaced constructors are `[Obsolete]`, scheduled for removal in 17.1 ([UmbHost/UmbCheckout#108](https://github.com/UmbHost/UmbCheckout/issues/108)). See [Upgrading from v13](upgrading-from-v13.md#breaking-changes).
* **New public members:** `IPaidCheckoutSessions`, `OnPaidBasketClearedNotification`, `SettingsCache<TEntity>`, `StripeKeyRejection`, and `ClaimAsync` and token overloads of `CompleteAsync` and `ForgetAsync` on `IStripeWebhookEventStore`. See [Extending UmbCheckout](../core-services/extending-umbcheckout.md).
