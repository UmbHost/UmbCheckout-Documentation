---
description: View Stripe payments and invoices, and refund payments, from the backoffice
---

# Payments, Invoices and Refunds

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

The Stripe add-on adds an **UmbCheckout** section to the backoffice, next to Settings. It shows the payments, invoices and refunds in your Stripe account, for the mode selected in the [Stripe settings](../configuration.md#stripe-settings) (test or live).

| Tree item    | Shows                                                       | Who can see it                                                   |
| ------------ | ----------------------------------------------------------- | ---------------------------------------------------------------- |
| Overview     | A summary of the section                                    | Users with access to the UmbCheckout section                     |
| Transactions | The Stripe payments, with their details and a refund button | Users with access to the UmbCheckout section                     |
| Invoices     | The Stripe invoices                                         | Members of the **UmbCheckout Invoices** group, or administrators |
| Refunds      | The Stripe refunds                                          | Members of the **UmbCheckout Refunds** group, or administrators  |

The add-on creates the user groups **UmbCheckout**, **UmbCheckout Invoices** and **UmbCheckout Refunds**. Add users to them in Users -> User Groups to give them access.

### Permissions

The payments, invoices and refunds screens check three permissions on the server, so a user without them can't read the data by calling the API directly:

| Permission      | Needed for                                                                                   | Who has it                                                      |
| --------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| UmbCheckout section | Everything in the section, including the payment list and payment details                | Users with access to the UmbCheckout section                    |
| Invoices        | The invoices                                                                                 | Members of the **UmbCheckout Invoices** group, and administrators |
| Refunds         | Viewing a charge or a refund, and refunding a payment                                        | Members of the **UmbCheckout Refunds** group, and administrators |

Administrators pass the Invoices and Refunds checks without being in the groups. The section and these permissions are new in this update.

Each item links to the payment, invoice or refund in the Stripe Dashboard (the test or live dashboard, following the Stripe settings).

The **To** date of the date filters includes the whole of the chosen day. The status filters only accept Stripe's own statuses.

### Refunds

* The **Refund** button asks for confirmation before refunding the payment.
* A refund request that is cancelled (for example the editor closes the browser) still completes, and is recorded in the audit log.
* Each refund is recorded in Umbraco's audit log, with the user, the payment and the refund.
* If Stripe rejects the API key (a 401 or 403 answer), the screen shows a fixed message, "Stripe rejected the API key for the active mode (test or live). Check the Stripe settings.", and the log says the same. Stripe's own message includes the last 4 characters of the key, so it is never shown or logged.
* A Stripe call that times out is logged as a warning. If the editor closes the screen while a list is loading, the request ends quietly.
