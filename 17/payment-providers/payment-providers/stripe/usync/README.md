---
description: Documentation for the uSync Stripe Addon package
---

# uSync

The uSync Stripe package allows for the import and export of the Stripe Settings and Shipping Rates between environments

* **Stripe Settings:** every setting is exported (`UmbCheckoutStripeSettings`), each time they are saved. A file from an older version keeps the site's current value for any setting the file doesn't have.
* **Shipping Rates:** one file per rate (`UmbCheckoutStripeShippingRates`), written when a rate is saved and removed when it is deleted.
