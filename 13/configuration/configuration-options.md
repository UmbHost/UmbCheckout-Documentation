# Configuration Options

There are a number of settings which can be configured within the backoffice on the configuration dashboard found here:

Settings -> UmbCheckout -> Configuration

The configuration options and their possible options are as below:

| Name                           | Type    | Options                                                                                                                                                                 |
| ------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fallback Currency Code         | Text    | The 3-letter ISO currency code used when neither the product's currency node nor the site root sets `umbCheckoutCurrencyCode` (see [Currency](../getting-started/configuration.md#currency))                |
| Success Page URL               | Picker  | Select either a content node or enter an external URL                                                                                                                   |
| Cancel Page URL                | Picker  | Select either a content node or enter an external URL                                                                                                                   |
| Enable Shipping                | Boolean | <p><strong>True:</strong> The shipping rates are passed to the payment provider<br><br><strong>False:</strong> No shipping rates are passed to the payment provider</p> |
| \*Store Basket In a Cookie     | Boolean | <p><strong>True:</strong> A cookie is set which stores the users current Basket<br><br><strong>False:</strong> No cookie is set</p>                                     |
| \*Basket Expiry (Cookie)       | Integer | The number of days in the future the cookie expires (30 by default)                                                                                                     |
| \*Store Basket In The Database | Boolean | <p><strong>True:</strong> The users current Basket is stored in the database<br><br><strong>False:</strong> The Basket is not stored</p>                                |
| \*Basket Expiry (Database)     | Integer | The maximum number of days the Basket is stored in the database                                                                                                         |

{% hint style="info" %}
Features marked with \* require a paid license. Without one, they aren't shown and are always off.
{% endhint %}

Storing the Basket in the database also turns on storing it in a cookie: the cookie is how a returning visitor's Basket is found again.
