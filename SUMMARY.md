# Table of contents

* [🛒 UmbCheckout Documentation](README.md)

## Getting Started

* [Overview](getting-started/overview.md)
* [License Comparison](getting-started/license-comparison.md)
* [Installation](getting-started/installation.md)
* [Configuration](getting-started/configuration.md)
* [Buy a License](https://my.umbhost.net)

## Configuration

* [Configuration Options](configuration/configuration-options.md)
* [Shipping Rates](configuration/shipping-rates.md)
* [Tax Rates](configuration/tax-rates.md)

## Core Services

* [Session Service](core-services/session-service.md)
* [Database Service](core-services/database-service.md)
* [Basket Service](core-services/basket-service.md)
* [Object Reference](core-services/object-reference/README.md)
  * [Basket](core-services/object-reference/basket.md)
  * [UmbCheckoutSession](core-services/object-reference/umbcheckoutsession.md)
  * [LineItem](core-services/object-reference/lineitem.md)
  * [UmbCheckoutConfiguration](core-services/object-reference/umbcheckoutconfiguration.md)
  * [MultiUrlPicker](core-services/object-reference/multiurlpicker.md)
* [Cookies](core-services/cookies.md)

## Payment Providers

* [Stripe](payment-providers/stripe/README.md)
  * [Stripe Session Service](payment-providers/stripe/stripe-session-service.md)
  * [Stripe Database Service](payment-providers/stripe/stripe-database-service.md)
  * [Stripe Basket Controller](payment-providers/stripe/stripe-basket-controller.md)
  * [Stripe Webhook Api](payment-providers/stripe/stripe-webhook-api.md)
  * [Notifications](payment-providers/stripe/notifications/README.md)
    * [OnCheckoutSessionCompletedNotification](payment-providers/stripe/notifications/oncheckoutsessioncompletednotification.md)
    * [OnCheckoutSessionExpiredNotification](payment-providers/stripe/notifications/oncheckoutsessionexpirednotification.md)
    * [OnPaymentFailedNotification](payment-providers/stripe/notifications/onpaymentfailednotification.md)
    * [OnPaymentSuccessNotification](payment-providers/stripe/notifications/onpaymentsuccessnotification.md)
  * [Object Reference](payment-providers/stripe/object-reference/README.md)
    * [TaxRate](payment-providers/stripe/object-reference/taxrate.md)
    * [ShippingRate](payment-providers/stripe/object-reference/shippingrate.md)
* [GoCardless](payment-providers/gocardless.md)
* [PayPal](payment-providers/paypal.md)
* [Klarna](payment-providers/klarna.md)

## Scheduled Tasks & Notifications

* [Remove Expired Baskets From Database](scheduled-tasks-and-notifications/remove-expired-baskets-from-database.md)
* [Basket Notifications](scheduled-tasks-and-notifications/basket-notifications/README.md)
  * [OnBasketAddedNotification](scheduled-tasks-and-notifications/basket-notifications/onbasketaddednotification.md)
  * [OnBasketAddedManyNotification](scheduled-tasks-and-notifications/basket-notifications/onbasketaddedmanynotification.md)
  * [OnBasketAddManyStartedNotification](scheduled-tasks-and-notifications/basket-notifications/onbasketaddmanystartednotification.md)
  * [OnBasketAddStartedNotification](scheduled-tasks-and-notifications/basket-notifications/onbasketaddstartednotification.md)
  * [OnBasketClearedNotification](scheduled-tasks-and-notifications/basket-notifications/onbasketclearednotification.md)
  * [OnBasketClearStartedNotification](scheduled-tasks-and-notifications/basket-notifications/onbasketclearstartednotification.md)
  * [OnBasketReducedNotification](scheduled-tasks-and-notifications/basket-notifications/onbasketreducednotification.md)
  * [OnBasketReduceStartedNotification](scheduled-tasks-and-notifications/basket-notifications/onbasketreducestartednotification.md)
  * [OnBasketRemovedManyNotification](scheduled-tasks-and-notifications/basket-notifications/onbasketremovedmanynotification.md)
  * [OnBasketRemovedNotification](scheduled-tasks-and-notifications/basket-notifications/onbasketremovednotification.md)
  * [OnBasketRemoveManyStartedNotification](scheduled-tasks-and-notifications/basket-notifications/onbasketremovemanystartednotification.md)
  * [OnBasketRemoveStartedNotification](scheduled-tasks-and-notifications/basket-notifications/onbasketremovestartednotification.md)
* [Session Notifications](scheduled-tasks-and-notifications/session-notifications/README.md)
  * [OnSessionClearedNotification](scheduled-tasks-and-notifications/session-notifications/onsessionclearednotification.md)
  * [OnSessionClearStartedNotification](scheduled-tasks-and-notifications/session-notifications/onsessionclearstartednotification.md)
  * [OnSessionCreatedNotification](scheduled-tasks-and-notifications/session-notifications/onsessioncreatednotification.md)
  * [OnSessionCreateStartedNotification](scheduled-tasks-and-notifications/session-notifications/onsessioncreatestartednotification.md)
  * [OnSessionGetNotification](scheduled-tasks-and-notifications/session-notifications/onsessiongetnotification.md)
  * [OnSessionGetStartedNotification](scheduled-tasks-and-notifications/session-notifications/onsessiongetstartednotification.md)
  * [OnSessionUpdatedNotification](scheduled-tasks-and-notifications/session-notifications/onsessionupdatednotification.md)
  * [OnSessionUpdateStartedNotification](scheduled-tasks-and-notifications/session-notifications/onsessionupdatestartednotification.md)
* [Payment Provider Notifications](scheduled-tasks-and-notifications/payment-provider-notifications/README.md)
  * [OnProviderClearSessionStartedNotification](scheduled-tasks-and-notifications/payment-provider-notifications/onproviderclearsessionstartednotification.md)
  * [OnProviderCreateSessionStartedNotification](scheduled-tasks-and-notifications/payment-provider-notifications/onprovidercreatesessionstartednotification.md)
  * [OnProviderGetSessionNotification](scheduled-tasks-and-notifications/payment-provider-notifications/onprovidergetsessionnotification.md)
  * [OnProviderGetSessionStartedNotification](scheduled-tasks-and-notifications/payment-provider-notifications/onprovidergetsessionstartednotification.md)
  * [OnProviderSessionClearedNotification](scheduled-tasks-and-notifications/payment-provider-notifications/onprovidersessionclearednotification.md)
  * [OnProviderSessionCreatedNotification](scheduled-tasks-and-notifications/payment-provider-notifications/onprovidersessioncreatednotification.md)

## View Components

* [Basket View Component](view-components/basket-view-component.md)
* [Basket Link View Component](view-components/basket-link-view-component.md)

## Property Editors

* [Tax Rates Property Editor](property-editors/tax-rates-property-editor.md)
* [Meta Data Property Editor](property-editors/meta-data-property-editor.md)
