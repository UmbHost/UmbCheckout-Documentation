# Synchronising Changes

Once installed uSync will create config files on disk in the uSync folder alongside other uSync content.

These files should be committed to your repository and transferred between environments.

Depending on your uSync configuration the importing and exporting may occur either manually or automatically.

* The UmbCheckout tables are created before an import starts, so importing on a site's first start works.
* If an imported item is refused (for example a shipping or tax rate whose Stripe ID is already used by another rate), uSync reports it as failed instead of as imported.
