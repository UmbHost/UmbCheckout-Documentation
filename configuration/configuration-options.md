# Configuration Options

There are a number of settings which can be configured within the backoffice on the configuration dashboard found here:

Settings -> UmbCheckout -> Configuration

The configuration options and their possible options are as below:

| Name                           | Type    | Options                                                                                                                                                                 |
| ------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Success Page URL               | Picker  | Select either a content node or enter an external URL                                                                                                                   |
| Cancel Page URL                | Picker  | Select either a content node or enter an external URL                                                                                                                   |
| \*Store Basket In a Cookie     | Boolean | <p><strong>True:</strong> A cookie is set which stores the users current Basket<br><br><strong>False:</strong> No cookie is set</p>                                     |
| \*Basket Expiry (Cookie)       | Integer | The number of days in the future the cookie expires (30 by default)                                                                                                     |
| \*Store Basket In The Database | Boolean | <p><strong>True:</strong> The users current Basket is stored in the database<br><br><strong>False:</strong> The Basket is not stored</p>                                |
| \*Basket Expiry (Database)     | Integer | The maximum number of days the Basket is stored in the database                                                                                                         |
| Enable Shipping                | Boolean | <p><strong>True:</strong> The shipping rates are passed to the payment provider<br><br><strong>False:</strong> No shipping rates are passed to the payment provider</p> |

{% hint style="info" %}
Features marked with \* require a paid license
{% endhint %}
