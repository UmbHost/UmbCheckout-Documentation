# Shipping Rates

Shipping Rates allow you to charge various shipping options - such as standard, express next day etc...

The Shipping Rates are created within the Stripe Dashboard, you can then enter them into the UmbCheckout configuration area to make them available during the Checkout process.

### Stripe Dashboard

You can create Shipping Rates in the following section of the Stripe Dashboard:

Dashboard -> Products -> Shipping rates -> Create shipping rate

### UmbCheckout Backoffice

You can enter Shipping Rates into your Umbraco site by going to the following area:

Settings -> UmbCheckout -> Stripe Shipping Rates -> Create Shipping Rate

The shipping rate settings are as follows:

| Name               | Value                                                            |
| ------------------ | ---------------------------------------------------------------- |
| Shipping Rate Name | The name of the shipping rate as shown in the Umbraco Backoffice |
| Shipping Rate ID   | The ID of the shipping rate as found in Stripe                   |

{% hint style="info" %}
Currently only fixed rate shipping rates are supported
{% endhint %}
