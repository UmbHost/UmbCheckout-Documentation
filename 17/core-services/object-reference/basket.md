# Basket

The Basket object contains the below properties

| Property Name       | Type                                 | Use                                                        |
| ------------------- | ------------------------------------ | ---------------------------------------------------------- |
| Id                  | string                               | The Basket id                                              |
| SessionId           | string                               | The UmbCheckout Session Id                                 |
| SiteRootCulture     | string?                              | The culture of the site root the Basket belongs to         |
| CurrencyCode        | string?                              | The 3-letter ISO currency code of every line in the Basket |
| CheckoutSessionId   | string?                              | The Stripe checkout session started for this Basket        |
| CustomerReferenceId | string?                              | A unique reference which can be used to identify the order |
| Customer            | [Customer?](customer.md)             | Information relating to the customer                       |
| LineItems           | IEnumerable<[LineItem](lineitem.md)> | The line items (products) contained in the Basket          |
| ItemCount           | long                                 | The number of lines (products) in the Basket; use `IBasketService.TotalItems()` for the total quantity |
| Total               | decimal                              | The sub total of the Basket, excluding Tax and Shipping (calculated, not stored) |
| MetaData            | Dictionary\<string, string>          | Used to store meta data against the basket                 |
