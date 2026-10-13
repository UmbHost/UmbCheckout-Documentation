---
description: Moving a site from UmbCheckout 1.x on Umbraco 13 to UmbCheckout 17
---

# Upgrading from v13

UmbCheckout 17 keeps the screens, settings, data and front-end of UmbCheckout 1.x, so most sites upgrade by updating the packages. Read this page first if your site has custom code that calls UmbCheckout's services.

### Steps

1. **Upgrade the site to Umbraco 17.6 or later and .NET 10**, following [Umbraco's upgrade guide](https://docs.umbraco.com/umbraco-cms/fundamentals/setup/upgrading).
2. **Update every UmbCheckout package to 17.x**: `UmbCheckout`, `UmbCheckout.Stripe` and any of `UmbCheckout.uSync`, `UmbCheckout.Stripe.uSync`, `UmbCheckout.Stripe.Forms`, `UmbCheckout.Core.Addons`, `UmbCheckout.Stripe.Addons` and `UmbCheckout.Stripe.Addons.uSync` that you use.
3. **Get an UmbCheckout 17 license** if you use the licensed features. UmbCheckout 17 is licensed by subscription, per production domain and per running instance (see [Licensing](licensing.md)). Put the new key in `UmbCheckout:LicenseKey`. Deploy while the license server can be reached: the first check after the upgrade always asks it.
4. **Remove `app.UseSession()`** from `Program.cs` if you like. UmbCheckout adds the session middleware itself, and an existing call is harmless.
5. **Start the site.** UmbCheckout adopts your existing tables on the first start:
   * no data is copied, and the tables keep their names;
   * shipping rates, tax rates and Stripe settings saved before keys existed are given keys;
   * MetaData properties are moved to Umbraco 17's JSON storage.
6. **Check your Stripe webhook** points at `https://<your site>/umbraco/api/stripewebhookapi/checkoutevents` and uses API version `2026-01-28.clover` (see [Stripe Webhook Api](../payment-providers/payment-providers/stripe/services/stripe-webhook-api/README.md)).
7. **If you overrode the partial views** in `Views/Partials/UmbCheckout/`, compare them with the new ones. The add-to-basket form no longer posts a currency, and the Basket shows notices when an item can't be added or prices changed at checkout.

### Behaviour that changed

* **Prices and currencies** are always read on the server. The `currencyCode` form field of the add-to-basket form is ignored. See [Prices, Currencies and Baskets](../configuration/prices-currencies-and-baskets.md).
* **The currency a product is charged in** comes from its site root's `umbCheckoutCurrencyCode`, or the Fallback Currency Code. The UI culture's currency is no longer used to charge.
* **Prices are checked at checkout.** If a price changed, the shopper sees the change on the Basket page before going to Stripe.
* **One Basket per site root culture and currency.** Baskets that mixed currencies are split on first read.
* **A product with an empty price** can't be added to the Basket (it was sold at 0.00).
* **Baskets are stored in the database only when "Store Basket In The Database" is on** (they used to follow the cookie setting), and viewing a Basket no longer extends its expiry. Basket dates are stored in UTC.
* **The webhook** handles each event once, answers 500 when a handler throws or the webhook secret is missing (so Stripe retries), and accepts events on other API versions with a warning.
* **The success page** clears only the Basket the returning checkout session paid for, and only on the configured success page.
* **Telemetry** still sends the list of installed UmbCheckout packages, as `installedPackages` (see [Anonymous Telemetry](anonymous-telemetry.md)).

### Breaking changes

These affect code that calls UmbCheckout's services. Members that were removed are listed with their replacement; members that still work but are marked `[Obsolete]` are listed separately.

| Before (v13)                                                                                                               | Now (v17)                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IConfigurationService.GetConfiguration()` / `UpdateConfiguration(...)`                                                    | `GetConfigurationAsync(CancellationToken)` / `UpdateConfigurationAsync(configuration, CancellationToken)`                                                         |
| `IStripeSettingsService.GetStripeSettings()` / `UpdateStripeSettings(...)`                                                 | `GetStripeSettingsAsync(...)` / `UpdateStripeSettingsAsync(...)`                                                                                                  |
| `IStripeShippingRateDatabaseService.GetShippingRates()`, `GetShippingRate(...)`, `Create…`, `Update…`, `DeleteShippingRate(...)` | The same names with an `Async` suffix and an optional `CancellationToken`                                                                                  |
| `IStripeTaxRateDatabaseService` methods (add-on)                                                                           | The same names with an `Async` suffix and an optional `CancellationToken`                                                                                         |
| Core `IDatabaseService.GetBasket(sessionId)`, Core `IDatabaseMapperService`                                                | Removed from Core. The Basket table belongs to the add-on: use the add-on's `IDatabaseService.GetBasketAsync(sessionId, siteRootCulture, currencyCode)` or `GetBasketsAsync(sessionId)` |
| Add-on `IDatabaseService.UpdateBasket`, `DeleteBasket(sessionId)`, `DeleteBaskets(DateTime)`                               | `UpdateBasketAsync`, `DeleteBasketAsync(sessionId, siteRootCulture, currencyCode)`, `DeleteBasketsAsync(DateTime expiryUtc)` (returns the number deleted)         |
| `BasketAdd.CurrencyCode`                                                                                                   | Removed: the currency is decided on the server                                                                                                                    |
| `StripeWebhookApiController` was an `UmbracoApiController`                                                                 | A plain ASP.NET Core controller with the route `umbraco/api/stripewebhookapi`; see [replacing the webhook controller](../payment-providers/payment-providers/stripe/services/stripe-webhook-api/README.md#replacing-the-webhook-controller) |

**Obsolete, still working** (scheduled for removal in 17.1, [UmbHost/UmbCheckout#108](https://github.com/UmbHost/UmbCheckout/issues/108)):

* `IStripeSessionService.GetSession`, `CreateSession` and `ClearSession`: they block a thread. Use the `…Async` methods with a `CancellationToken`.
* `LicenseService.RunLicenseCheck`: the license is checked in the background. Read `UmbCheckoutSettings.IsLicensed`, or call `RequestCheck`.
* The constructors of `SessionService` and `BasketService` without `IEventMessagesFactory` (and, for `SessionService`, `IPaidCheckoutSessions`).
* The constructors of `UmbCheckoutTelemetryNotificationHandler` without an `IPackagingService` and an `ILogger`.
* The overloads without a `CancellationToken`. Use the overload that takes a `CancellationToken` as its last parameter (pass `CancellationToken.None` if you have no token). The compiler warning names the replacement.
  * `ISessionService` (and `SessionService`): `Get`, `Update` and `Clear`, every overload.
  * `IBasketService` (and `BasketService`): `Get`, `Add`, `Reduce`, `Remove`, `Clear`, `TotalItems` and `SubTotal`.
  * `ICurrencyService`: `GetCurrencyAsync(currencyNodeKey = null)` and `GetCurrencyForContentAsync(content)`. For the global currency, call `GetCurrencyAsync(null, cancellationToken)`.
  * `IBasketContext.GetCurrencyAsync()`.
  * `IStripeSessionService`: `GetSessionAsync(id)`, `CreateSessionAsync(basket)` and `ClearSessionAsync(id)`.
  * `IUmbCheckoutStripeClientFactory.CreateAsync()`, `IStripeLineItemPricingService.GetPriceAsync(product)`, `IStripeBasketPricingService.RepriceAsync(basket)`, `IStripeShippingOptionsService.GetShippingOptions(basket)` (and `StripeDefaultShippingOptionsService`), and `IStripeShippingRateApiService.GetShippingRates()` and `GetShippingRate(id)`.
  * Add-ons: `ICookieService.GetFromCookie(session)`, and the Stripe customer, payments, invoices, refunds and tax rate API services (`GetCustomer`, `GetPayments`, `GetPayment`, `GetCharge`, `GetInvoices`, `GetInvoice`, `GetRefunds`, `GetRefund`, `CreateRefund`, `GetTaxRates`, `GetTaxRate`).
* The add-on's `LicensedConfigurationService(IConfigurationService)` constructor. Use the one that also takes an `IEventAggregator` and an `IEventMessagesFactory`.
* `UmbCheckoutSection` in the Stripe add-on. The section is registered in `umbraco-package.json`; its alias is `Consts.Sections.SectionAlias`.

Implementing an obsolete interface member gives no warning, only calling one does. A class written before the token overloads keeps working: each token overload calls the old one by default.

**Mocks and decorators:** UmbCheckout now calls the overloads that take a `CancellationToken`. They are default interface methods that call the old ones, so your implementations still compile. But a Moq mock set up only for the old overload returns `null` from the new one, and a decorator that overrides only the old method is bypassed. Set up or override the token overloads (see [Cancellation Tokens](../core-services/cancellation-tokens.md)).
