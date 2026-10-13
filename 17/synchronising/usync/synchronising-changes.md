# Synchronising Changes

Once installed uSync will create config files on disk in the uSync folder alongside other uSync content.

These files should be committed to your repository and transferred between environments.

Depending on your uSync configuration the importing and exporting may occur either manually or automatically.

* The UmbCheckout tables are created before an import starts, so importing on a site's first start works.
* If a [Saving notification handler](../../core-services/extending-umbcheckout.md) refuses an imported item, or a shipping or tax rate's Stripe ID is already used by another rate, uSync reports the item as failed instead of importing it.
* Imports and exports read the stored data: Loaded notification handlers don't change what is exported.
