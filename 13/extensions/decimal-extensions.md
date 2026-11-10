---
title: Decimal Extensions
description: Useful extensions for use with decimals
---

These extensions can be found within the namespace `UmbCheckout.Shared.Extensions`

#### FormatCurrency

Returns the decimal as currency with the symbol, this can be combined with [GetIsoCurrencySymbol](cultureinfo-extensions.md#getisocurrencysymbol)

```csharp title="Example"
Model.SubTotal.FormatCurrency(CultureInfo.CurrentUICulture.GetISOCurrencySymbol())
```
