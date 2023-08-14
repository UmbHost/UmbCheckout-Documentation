# DecimalExtensions

These extensions can be found within the namespace `UmbCheckout.Shared.Extensions`

#### FormatCurrency

Returns the decimal as currency with the symbol, this can be combined with [GetIsoCurrencySymbol](cultureinfoextensions.md#getisocurrencysymbol)

{% code title="Example" %}
```csharp
Model.SubTotal.FormatCurrency(CultureInfo.CurrentUICulture.GetISOCurrencySymbol())
```
{% endcode %}
