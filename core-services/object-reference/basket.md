# Basket

The Basket object contains the below properties

| Property Name       | Type                                 | Use                                                        |
| ------------------- | ------------------------------------ | ---------------------------------------------------------- |
| Id                  | string                               | The Basket id                                              |
| SessionId           | string                               | The UmbCheckout Session Id                                 |
| CustomerReferenceId | string?                              | A unique reference which can be used to identify the order |
| Customer            | [Customer?](customer.md)             | Information relating to the customer                       |
| LineItems           | IEnumerable<[LineItem](lineitem.md)> | The line items (products) contained in the Basket          |
| ItemCount           | long                                 | The total count of line item quantity                      |
| Total               | decimal                              | The sub total of the Basket, excluding Tax and Shipping    |
| MetaData            | Dictionary\<string, string>          | Used to store meta data against the basket                 |
