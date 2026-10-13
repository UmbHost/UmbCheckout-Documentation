# Shipping Rates

Shipping Rates allow you to charge various shipping options - such as standard, express next day etc...

The Shipping Rates are created within the Stripe Dashboard, you can then enter them into the UmbCheckout configuration area to make them available during the Checkout process.

### Stripe Dashboard

You can create Shipping Rates in the following section of the Stripe Dashboard:

Dashboard -> Products -> Shipping rates -> Create shipping rate

### UmbCheckout Backoffice

You can enter Shipping Rates into your Umbraco site by going to the following area:

Settings -> UmbCheckout -> Stripe -> Stripe Shipping Rates -> Create Shipping Rate

The list shows each shipping rate's name and Stripe ID. The screen links to the Shipping Rates page of your Stripe Dashboard (test or live, following the [Stripe settings](configuration.md#stripe-settings)), where you create them first.

The shipping rate settings are as follows:

| Name               | Value                                                            |
| ------------------ | ---------------------------------------------------------------- |
| Shipping Rate Name | The name of the shipping rate as shown in the Umbraco Backoffice |
| Shipping Rate ID   | The ID of the shipping rate as found in Stripe                   |

Below the settings, the screen shows the rate's details from Stripe (name, ID and amount) and an **Edit Shipping Rate** link to it in the Stripe Dashboard.

Changing a rate's Stripe ID updates the rate. Two rates can't have the same Stripe ID. Only users with access to the Settings section can manage shipping rates.

{% hint style="info" %}
Currently only fixed rate shipping rates are supported. At checkout, only the rates that charge in the Basket's currency are offered, at most 5 (see [Prices, Currencies and Baskets](../../../configuration/prices-currencies-and-baskets.md#shipping-rates-follow-the-basket-currency)).
{% endhint %}

To calculate shipping yourself, for example per product, see [Custom Shipping Calculator](services/custom-shipping-calculator.md).
