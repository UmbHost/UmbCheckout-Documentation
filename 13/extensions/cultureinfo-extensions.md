---
description: Useful extensions to return culture related data
---

# CultureInfo Extensions

These extensions can be found within the namespace `UmbCheckout.Shared.Extensions`

#### GetISOCurrencySymbol

Gets the 3 letter ISO4217 currency code

{% code title="Example" %}
```csharp
CultureInfo.CurrentUICulture.GetISOCurrencySymbol()
```
{% endcode %}
