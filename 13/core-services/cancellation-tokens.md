---
description: Passing a CancellationToken to UmbCheckout's services
---

# Cancellation Tokens

Every public async service method in UmbCheckout can take a `CancellationToken`. Pass the request's token (`HttpContext.RequestAborted`, or the `cancellationToken` your notification handler receives), so work stops when the shopper leaves.

* New methods take it as an optional last parameter (`CancellationToken cancellationToken = default`).
* Methods that existed before the v13 update keep their old signature, and gain an overload with a `CancellationToken` as the last parameter. These overloads are default interface methods that call the old method, so classes that implement the interfaces still compile.
* The old overloads are `[Obsolete]`, "Scheduled for removal in 17.1." Call the overload with the token. If you have no token, pass `CancellationToken.None`. The compiler warning names the replacement. See [Obsolete members](../getting-started/v13-update.md#obsolete-members).
* The old overloads of the session service use the current request's token. The other old overloads use `CancellationToken.None`.
* UmbCheckout's own controllers, view components, Forms workflow and notification handlers pass the request's token.
* When a shopper leaves during checkout, the call to Stripe stops, and the request ends quietly (no error page, no error log). A Stripe timeout is logged as a warning.
* A refund's call to Stripe is never cancelled, so it always reaches the audit log.

The services with token overloads are: the session, basket, currency and basket context services; the Stripe session, client factory, line and basket pricing, shipping options and shipping rate services; and, in the add-ons, the database service and the Stripe tax rate service.

### Mocks and decorators

Because UmbCheckout calls the token overloads:

* a Moq mock set up only for the old overload returns `null` from the new one. Set up the overload with the `CancellationToken`;
* a decorator that overrides only the old method is bypassed. Override the token overload too.

For example, mock `CreateSessionAsync(basket, It.IsAny<CancellationToken>())` rather than `CreateSessionAsync(basket)`.
