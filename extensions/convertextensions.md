# ConvertExtensions

These extensions can be found within the namespace `UmbCheckout.Shared.Extensions`

#### ToBoolean

Converts a string to boolean

{% code title="Example" %}
```csharp
Model.StringBoolean.ToBoolean()
```
{% endcode %}

| String Value | Returned Boolean |
| ------------ | ---------------- |
| "true"       | true             |
| "1"          | true             |
| "false"      | false            |
| "0"          | false            |
