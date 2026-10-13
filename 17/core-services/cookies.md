# Cookies

The possible cookies which can be set are outlined below with their explanations

| Name                                           | Reason                                                                                                                  |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| UmbCheckoutSession                             | The .NET Session Id (HttpOnly, essential)                                                                               |
| UmbCheckoutSession\_Basket{culture}\_{currency} | The encrypted [Basket](object-reference/basket.md) for one site root culture and currency, e.g. `UmbCheckoutSession_Basketen-GB_GBP` |

{% hint style="info" %}
The Basket cookie requires a paid license, and is only set when **Store Basket In a Cookie** is on. It is HttpOnly and Secure, and expires after the number of days set in the [configuration](../configuration/configuration-options.md).
{% endhint %}

The Basket is encrypted with ASP.NET Core Data Protection. On a load-balanced site, share the Data Protection key ring between the servers, or a server that can't read a visitor's Basket cookie ignores it. A cookie that is corrupt is deleted; Basket cookies from UmbCheckout 1.x are split into one cookie per currency.
