---
description: What data do we collect and why?
---

# Anonymous Telemetry

By default, anonymous telemetry is sent to us every time you save the UmbCheckout configuration and after a remote license check has been completed.

#### Why do we collect this data?

It is so that we concentrate our development in the most used areas, it also lets us have a rough idea on how many sites are using our package

**What data is collected?**

We collect the following data:

| Key                  | Value                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| umbracoId            | The Umbraco Guid for the site                                                 |
| umbracoVersion       | The Umbraco version                                                           |
| umbCheckoutVersion   | The UmbCheckout version                                                       |
| installedPackages    | The UmbCheckout sub packages which are installed                              |
| isLicensed           | Whether the site is running on a paid license                                 |
| isDevelopmentLicense | Whether the site is running on a development license                          |
| environmentName      | The sites hosting environment name (Development, Staging, Production, etc...) |

_There is a unique constraint on `umbracoId` and `environmentName`_

#### Can I disable the telemetry?

Yes, you can disable the telemetry service by setting the following configuration in your appsettings.json file

```json
{
  "UmbCheckout": {
    "DisableTelemetry": true
  }
}
```
