# Tax Rates

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

Tax Rates allow you to define any number of tax rates and assign them to products.

The Tax Rates are created within the Stripe Dashboard, you can then enter them into the UmbCheckout configuration area to make them available to the property editor which can be added to the product node.

### Stripe Dashboard

You can create Tax Rates in the following section of the Stripe Dashboard:

Dashboard -> Products -> Tax rates -> New

### UmbCheckout Backoffice

You can enter Tax Rates into your Umbraco site by going to the following area:

Settings -> UmbCheckout -> Stripe -> Tax Rates -> Create Tax Rate

The Tax Rates item is only shown on licensed sites, to users with access to the Settings section.

The tax rate settings are as follows:

| Name          | Value                                     |
| ------------- | ----------------------------------------- |
| Tax Rate Name | The name of the tax rate                  |
| Tax Rate ID   | The ID of the tax rate as found in Stripe |

The screen also shows the rate's details from Stripe (ID, description, country and percentage) and an **Edit Tax Rate** link to it in the Stripe Dashboard. Two tax rates can't have the same Stripe ID.
