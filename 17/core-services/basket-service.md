---
description: A service which handles all things around the basket
---

# Basket Service

The basket service is what and handles all the UmbCheckout Basket operations.

You can access the basket service by injecting `IBasketService` which can be found within the namespace`UmbCheckout.Core.Interfaces`

#### Get

Gets the [Basket](object-reference/basket.md)

```csharp
Task<Basket> Get();
```

#### Add

Adds an item to the [Basket](object-reference/basket.md)

Parameters:

| Name | Detail                                                         |
| ---- | -------------------------------------------------------------- |
| item | [Item](object-reference/lineitem.md) to be added to the Basket |

```csharp
Task<Basket> Add(LineItem item);
```

#### Add Multiple

Adds multiple items to the [Basket](object-reference/basket.md)

Parameters:

| Name  | Detail                                                          |
| ----- | --------------------------------------------------------------- |
| items | [Items](object-reference/lineitem.md) to be added to the Basket |

```csharp
Task<Basket> Add(IEnumerable<LineItem> items);
```

#### Reduce

Reduces the specified item by a count of 1 or removes from the [Basket](object-reference/basket.md) if only 1

Parameters:

| Name | Detail                                                           |
| ---- | ---------------------------------------------------------------- |
| key  | [Item](object-reference/lineitem.md) to be reduced in the Basket |

```csharp
Task<Basket> Reduce(Guid id);
```

#### Remove

Removes the specified item from the [Basket](object-reference/basket.md)

Parameters:

| Name | Detail                                                             |
| ---- | ------------------------------------------------------------------ |
| key  | [Item](object-reference/lineitem.md) to be removed from the Basket |

```csharp
Task<Basket> Remove(Guid id);
```

#### Remove Multiple

Removes multiple items from the [Basket](object-reference/basket.md)

Parameters:

| Name | Detail                                                              |
| ---- | ------------------------------------------------------------------- |
| keys | [Items](object-reference/lineitem.md) to be removed from the Basket |

```csharp
Task<Basket> Remove(IEnumerable<Guid> ids);
```

#### Clear

Removes all items from the Basket and clears any set [Basket](object-reference/basket.md) cookies

```csharp
Task<Basket> Clear();
```

#### TotalItems

Returns the total item quantity count

```csharp
Task<long> TotalItems();
```

#### SubTotal

Returns the [Basket](object-reference/basket.md) subtotal (minus any shipping or tax)

```csharp
Task<decimal> SubTotal();
```
