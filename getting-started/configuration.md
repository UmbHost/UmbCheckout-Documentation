---
description: Configuring UmbCheckout
---

# Configuration

There is no additional coding required to make use of UmbCheckout after being installed.

After the package is installed head to Settings -> UmbCheckout -> Configuration to set the Checkout **Success** and **Cancel** pages / URLs.

```json
  "UmbCheckout": {
    "LicenseKey": "YOUR LICENSE KEY HERE"
  }
```

### Required Product Properties

Your product needs to have the following required properties added

| Alias            | Property Type |
| ---------------- | ------------- |
| umbCheckoutPrice | Decimal       |

Your product can have the following optional properties

| Alias                  | Property Type |
| ---------------------- | ------------- |
| umbCheckoutDescription | Text Area     |
