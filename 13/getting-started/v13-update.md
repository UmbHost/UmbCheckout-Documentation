---
description: What changed in the latest UmbCheckout update for Umbraco 13
---

# Changes in the v13 Update

The latest UmbCheckout 1.x update brings the fixes made for UmbCheckout 17 to Umbraco 13. Your settings and data stay as they are. Your license key stays the same too, but a perpetual V1 license (a one-off purchase made before 14 October 2026) doesn't cover 1.6.0 or later: see [Perpetual licenses](license-checks.md#perpetual-licenses).

* **Licensing:** 1.6.0 needs an annual V1 license (a perpetual license must be converted), the license is checked in the background, licensed domains are checked on every request, a warning banner shows when a request isn't licensed, and development mode works on your own machine. After an outage of more than 30 days the license switches off while the site runs, a license that doesn't cover the site reads "Not licensed for this site", and a site whose license can't be evaluated at startup still starts. See [License Checks](license-checks.md).
* **Money and baskets:** prices and currencies are decided on the server, every currency is charged in its own minor unit, prices are checked again at checkout, and there is one Basket per site and currency. Display and charge use one table of decimal places, currency codes are trimmed and upper-cased, and re-pricing removes older lines with a quantity outside 1–999,999 and lines past the 100th. See [Prices, Currencies and Baskets](../configuration/prices-currencies-and-baskets.md).
* **Checkout and the webhook:** a paid Basket is cleared even if the customer doesn't return to the success page, the success page clears only the Basket that was paid, a Basket whose checkout session has been paid is cleared on its next read from any Basket store, the success page for a checkout started before the update clears the matching Basket, a Basket cookie cleared in a request isn't restored later in it, and each webhook event is handled once (a lease token stops a late retry from completing or releasing a newer claim, a failed claim answers 500, and a missing webhook secret is logged as an error once for each mode). See [Payment Flow / Lifecycle](../payment-providers/payment-providers/stripe/payment-flow-lifecycle.md#when-the-basket-is-cleared) and [Stripe Webhook Api](../payment-providers/payment-providers/stripe/services/stripe-webhook-api/README.md).
* **Backoffice:** settings screens need Settings section access, payments, invoices and refunds need the new UmbCheckout section and the Invoices and Refunds permissions (see [Payments, Invoices and Refunds](../payment-providers/payment-providers/stripe/addons/payments-invoices-and-refunds.md#permissions)), a missing Stripe key shows a clear message, a key Stripe rejects shows a fixed message that never includes the key, refunds ask for confirmation and are recorded in the audit log, and the date filters include the chosen day.
* **uSync:** every Stripe setting is exported, and refused imports are reported as failed. The tax rate items need a license.
* **Saving settings:** the first save of the configuration or of the Stripe settings publishes the Saved notification, as every later save does, so it writes the uSync file and clears the cache on the other servers. See [OnConfigurationSavedNotification](../scheduled-tasks-and-notifications/configuration-notifications/onconfigurationsavednotification.md).
* **Settings cache:** the configuration and the Stripe settings are cached, and a save clears the cache on every server of a load-balanced site (see [Load-balanced sites](#load-balanced-sites)).
* **Telemetry:** the `installedPackages` list is still sent. See [Anonymous Telemetry](anonymous-telemetry.md).
* **Services:** the async methods take a `CancellationToken`, and the old overloads are obsolete (see [Obsolete members](#obsolete-members)). A Stripe timeout is logged as a warning, a request the customer or editor abandoned ends quietly, and a refund always completes.
* **Stripe.net** stays on the same major version, so a minor Stripe.net update can't change the Stripe API version under you.

### Obsolete members

These still work, but calling one gives a compiler warning that names the replacement. They are scheduled for removal in 17.1 ([UmbHost/UmbCheckout#108](https://github.com/UmbHost/UmbCheckout/issues/108)).

* The overloads without a `CancellationToken`. Use the overload that takes a `CancellationToken` as its last parameter (pass `CancellationToken.None` if you have no token). See [Cancellation Tokens](../core-services/cancellation-tokens.md).
  * `ISessionService` (and `SessionService`): `Get`, `Update` and `Clear`, every overload.
  * `IBasketService` (and `BasketService`): `Get`, `Add`, `Reduce`, `Remove`, `Clear`, `TotalItems` and `SubTotal`.
  * `ICurrencyService`: `GetCurrencyAsync(currencyNodeKey = null)` and `GetCurrencyForContentAsync(content)`. For the global currency, call `GetCurrencyAsync(null, cancellationToken)`.
  * `IBasketContext.GetCurrencyAsync()`.
  * `IStripeSessionService`: `GetSessionAsync(id)`, `CreateSessionAsync(basket)` and `ClearSessionAsync(id)`.
  * `IUmbCheckoutStripeClientFactory.CreateAsync()`, `IStripeLineItemPricingService.GetPriceAsync(product)`, `IStripeBasketPricingService.RepriceAsync(basket)`, `IStripeShippingOptionsService.GetShippingOptions(basket)` (and `StripeDefaultShippingOptionsService`), and `IStripeShippingRateApiService.GetShippingRates()` and `GetShippingRate(id)`.
  * Add-ons: the database service's `UpdateBasket`, `DeleteBasket(sessionId, siteRootCulture, currencyCode)` and `DeleteBaskets`, and the Stripe tax rate API service's `GetTaxRates` and `GetTaxRate`.
* `IStripeSessionService.GetSession`, `CreateSession` and `ClearSession`: they block a thread on the Stripe call. Use the `...Async` methods with a `CancellationToken`.
* `BasketAdd.CurrencyCode`: it is ignored, because the currency is decided on the server.
* The constructors that were replaced. Use the constructor that takes the new dependency, as the obsolete message says: `SessionService` (the ones without `IPaidCheckoutSessions`), `StripeBasketController`, `StripeWebhookApiController`, `StripeResponseNotificationHandler`, `StripeDefaultShippingOptionsService`, `StripeAddToBasketButtonViewComponent`, `UmbCheckoutTelemetryNotificationHandler` (the one without an `ILogger`) and the Umbraco Forms `SendToUmbCheckoutWorkflow`.

Implementing an obsolete interface member gives no warning, only calling one does. A class written before the token overloads keeps working: each token overload calls the old one by default.

### New for developers

* **`IPaidCheckoutSessions`** (`UmbCheckout.Core.Interfaces`) answers whether a checkout session has been paid. UmbCheckout.Stripe registers an implementation backed by the webhook's records, and a site can register its own. See [OnPaidBasketClearedNotification](../scheduled-tasks-and-notifications/session-notifications/onpaidbasketclearednotification.md#which-sessions-are-paid).
* **`OnPaidBasketClearedNotification`** is published after a Basket is cleared because its checkout session was paid.
* **Cancellation-token overloads** on the services. See [Cancellation Tokens](../core-services/cancellation-tokens.md).
* **`IStripeWebhookEventStore`** has `ClaimAsync`, and `CompleteAsync` and `ForgetAsync` overloads that take the lease token. See [Replacing the event store](../payment-providers/payment-providers/stripe/services/stripe-webhook-api/README.md#replacing-the-event-store).
* **`SettingsCache<TEntity>`** (`UmbCheckout.Shared.Persistence`) holds one cached settings row, with `TryGet`, `TrySet` and `Clear`.
* **`StripeApiErrorResult`** (`UmbCheckout.Stripe.Helpers`) builds the problem response that the add-on controllers return for a Stripe failure. Its `KeyRejectedDetail` is the fixed message for a rejected key, and `IsKeyRejected` tests for one.
* **`CurrencyDecimals`** (`UmbCheckout.Shared.Money`) is the table of decimal places for each currency.

### Load-balanced sites

The configuration and the Stripe settings are cached in memory. When either is saved, the cache is cleared on the server that saved it and, through Umbraco's distributed cache, on every other server of a load-balanced site. This needs no setup beyond Umbraco's own load balancing. A save reads the stored row from the database, not the cache, so two servers can't each insert a first row. A settings read inside another scope (for example a uSync import) is read but not cached.
