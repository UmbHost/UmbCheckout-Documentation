---
description: View Stripe payments and invoices, and refund payments, from the backoffice
---

# Payments, Invoices and Refunds

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

The Stripe add-on adds an **UmbCheckout** section to the backoffice, next to Settings. It shows the payments, invoices and refunds in your Stripe account, for the mode selected in the [Stripe settings](../configuration.md#stripe-settings) (test or live).

| Menu item    | Shows                                                       | Who can see it                                                   |
| ------------ | ----------------------------------------------------------- | ---------------------------------------------------------------- |
| Overview     | The section's dashboard                                     | Users with access to the UmbCheckout section                     |
| Transactions | The Stripe payments, with their details and a refund button | Users with access to the UmbCheckout section                     |
| Invoices     | The Stripe invoices                                         | Members of the **UmbCheckout Invoices** group, or administrators |
| Refunds      | The Stripe refunds, and the refund button on a payment      | Members of the **UmbCheckout Refunds** group, or administrators  |

The add-on creates the user groups **UmbCheckout**, **UmbCheckout Invoices** and **UmbCheckout Refunds**, each with access to the UmbCheckout section. Add users to them in Users -> User Groups to give them access. The Administrators group isn't given the section automatically.

### Permissions

The payments, invoices and refunds screens check three permissions on the server, so a user without them can't read the data by calling the API directly:

| Permission          | Needed for                                                                  | Who has it                                                        |
| ------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| UmbCheckout section | Everything in the section, including the payment list and payment details   | Users with access to the UmbCheckout section                      |
| Invoices            | The invoices                                                                | Members of the **UmbCheckout Invoices** group, and administrators |
| Refunds             | Viewing a charge or a refund, and refunding a payment                       | Members of the **UmbCheckout Refunds** group, and administrators  |

Administrators pass the Invoices and Refunds checks without being in the groups, but still need access to the UmbCheckout section.

On an unlicensed site the section is still there, but it shows a message instead of your Stripe data.

### Filtering

* **Transactions** can be filtered by status (Succeeded, Cancelled, Processing, Requires Action, Requires Capture, Requires Confirmation, Requires Payment Method) and by date.
* **Invoices** can be filtered by status (Paid, Open, Draft) and by date.
* **Refunds** can be filtered by date.

The **To** date includes the whole of that day. Dates are UTC days. With no **From** date, the last 90 days are listed.

### Payment details

A payment shows the customer, the transaction (receipt email, currency, amount, status, whether it was refunded, created date and description), any error, and the shipping details.

**View In Stripe Dashboard** opens the payment, invoice or refund in the Stripe Dashboard (the test or live dashboard, matching the payment). Invoices also have **View Invoice** and **Download Invoice**.

### Refunds

The **Refund** button is shown to members of the UmbCheckout Refunds group when the payment has a charge that hasn't been refunded.

* It asks "Refund this payment in full? This can't be undone." before refunding.
* The refund is always for the full amount.
* Each refund is recorded in Umbraco's audit log, with the user, the payment and the refund.
* A refund request that is cancelled (for example the editor closes the browser) still completes, and is recorded in the audit log.
* If Stripe rejects the API key (a 401 or 403 answer), the screen shows a fixed message, "Stripe rejected the API key for the active mode (test or live). Check the Stripe settings.", and the log says the same. Stripe's own message includes the last 4 characters of the key, so it is never shown or logged.
* A Stripe call that times out is logged as a warning. If the editor closes the screen while a list is loading, the request ends quietly.
