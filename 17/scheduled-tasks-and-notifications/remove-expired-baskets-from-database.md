# Remove Expired Baskets From Database

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

This task runs once a day (first one minute after the site starts) as an Umbraco recurring background job, and removes any [Baskets ](../core-services/object-reference/basket.md)stored in the database that haven't been updated for longer than the number of days specified in the [configuration](../configuration/configuration-options.md) (**Basket Expiry (Database)**).

It only runs when the site is licensed and **Store Basket In The Database** is on. It reads the configuration on each run, so a changed expiry applies from the next run. Dates are compared in UTC.

On a load-balanced site, Umbraco runs recurring background jobs on the scheduling server.
