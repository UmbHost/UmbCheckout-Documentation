---
description: Documentation for the uSync Stripe Addon package
---

# uSync

The uSync Stripe package allows for the import and export of the Stripe Tax Rates between environments

One file per tax rate is written to `UmbCheckoutStripeTaxRates` when a rate is saved. Exporting and importing tax rates needs a license: on an unlicensed site an import is reported as failed.
