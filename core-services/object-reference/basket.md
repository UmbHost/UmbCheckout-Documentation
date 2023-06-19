# Basket

The Basket object contains the below properties

| Property Name | Type                                 | Use                                                     |
| ------------- | ------------------------------------ | ------------------------------------------------------- |
| Id            | string                               | The Basket id                                           |
| SessionId     | string                               | The UmbCheckout Session Id                              |
| LineItems     | IEnumerable<[LineItem](lineitem.md)> | The line items (products) contained in the Basket       |
| ItemCount     | long                                 | The total count of line item quantity                   |
| Total         | decimal                              | The sub total of the Basket, excluding Tax and Shipping |
