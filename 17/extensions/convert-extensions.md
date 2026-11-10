---
title: Convert Extensions
description: Useful extensions which convert from one type to another
---

These extensions can be found within the namespace `UmbCheckout.Shared.Extensions`

#### ToBoolean

Converts a string to boolean

```csharp title="Example"
Model.StringBoolean.ToBoolean()
```

| String Value | Returned Boolean |
| ------------ | ---------------- |
| "true"       | true             |
| "1"          | true             |
| "false"      | false            |
| "0"          | false            |
