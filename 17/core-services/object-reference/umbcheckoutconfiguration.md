# UmbCheckoutConfiguration

The UmbCheckoutConfiguration object contains the below properties

| Property Name          | Type                                             | Use                                                    |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| Id                     | int                                              | The internal configuration Id                          |
| Key                    | Guid                                             | The internal configuration Key                         |
| CurrencyCode           | string                                           | The fallback 3-letter ISO currency code                |
| SuccessPageUrl         | IEnumerable<[MultiUrlPicker](multiurlpicker.md)> | The success page                                       |
| CancelPageUrl          | IEnumerable<[MultiUrlPicker](multiurlpicker.md)> | The cancel page                                        |
| StoreBasketInCookie    | Boolean                                          | Whether the Basket is stored in a cookie               |
| StoreBasketInDatabase  | Boolean                                          | Whether the Basket is stored in the database           |
| BasketInDatabaseExpiry | int                                              | The number of days the Basket can live in the database |
| BasketInCookieExpiry   | int                                              | The number of days the Basket can live in a cookie     |
| EnableShipping         | Boolean                                          | Whether the shipping is enabled                        |
