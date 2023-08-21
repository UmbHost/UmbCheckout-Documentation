# LineItem

The LineItem object contains the below properties

| Property Name | Type    | Use                                                                                                                   |
| ------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| Key           | Guid    | The Umbraco Node Key                                                                                                  |
| Name          | string  | The item name which fallsback to the Umbraco Node Name                                                                |
| Description   | string? | The item description which fallsback to the Node property alias`umbCheckoutDescription`  and finally to `description` |
| CurrencyCode  | string  | The Currency Symbol                                                                                                   |
| Price         | decimal | The price of the line item                                                                                            |
| CurrencyPrice | string  | The price formatted as currency                                                                                       |
| Quantity      | long    | The quantity of the line item                                                                                         |
