# Cookies

The possible cookies which can be set are outlined below with their explanations

| Name                               | Reason                                             |
| ---------------------------------- | -------------------------------------------------- |
| UmbCheckoutSession                 | The .NET Session Id                                |
| umbCheckoutBasketSessionId         | Contains the UmbCheckout Session Id                |
| umbCheckoutBasketSessionId\_Basket | The encrypted [Basket](object-reference/basket.md) |

{% hint style="info" %}
umbCheckoutBasketSessionId\_Basket requires a paid license. A Basket cookie that is corrupt, has been tampered with, or was encrypted with an old key ring is ignored, with a warning in the log. Clearing the cookie after a Basket is cleared also needs a paid license, and a cookie cleared in a request isn't read back later in the same request
{% endhint %}
