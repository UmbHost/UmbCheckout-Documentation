---
description: Useful extensions for use with decimals
---

# Decimal Extensions

These extensions can be found within the namespace `UmbCheckout.Shared.Extensions`

#### FormatCurrency

Returns the decimal as currency, with the currency's symbol and number of decimal places, in the current culture (or the culture you pass). This can be combined with [GetIsoCurrencySymbol](cultureinfo-extensions.md#getisocurrencysymbol)

```csharp
string FormatCurrency(this decimal amount, string? currencyCode, CultureInfo? culture = null)
```

{% code title="Example" %}
```csharp
Model.SubTotal.FormatCurrency(CultureInfo.CurrentUICulture.GetISOCurrencySymbol())
```
{% endcode %}
