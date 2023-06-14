# Basket Service

The basket service is what and handles all the UmbCheckout Basket operations.

You can access the basket service by injecting `IBasketService.cs` which can be found within the namespace namespace `UmbCheckout.Core.Interfaces`

#### Get

Gets the Baset

```csharp
Task<Basket> Get();
```

#### Add

Adds an item to the Basket

```csharp
Task<Basket> Add(LineItem item);
```

#### Add Multiple

Adds multiple items to the Basket

```csharp
Task<Basket> Add(IEnumerable<LineItem> items);
```

#### Reduce

Reduces the specified item by a count of 1

```csharp
Task<Basket> Reduce(Guid id);
```

#### Remove

Removes the specified item from the Basket

```csharp
Task<Basket> Remove(Guid id);
```

#### Remove Multiple

Removes multiple items from the Basket

```csharp
Task<Basket> Remove(IEnumerable<Guid> ids);
```

#### Clear

Removes all items from the Basket and clears any set Basket cookies

```csharp
Task<Basket> Clear();
```

#### TotalItems

Returns the total item quantity count

```csharp
Task<long> TotalItems();
```

#### SubTotal

Returns the Basket subtotal (minus any shipping or tax)

```csharp
Task<decimal> SubTotal();
```
