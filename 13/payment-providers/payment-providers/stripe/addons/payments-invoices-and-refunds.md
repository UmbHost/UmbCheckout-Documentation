---
description: View Stripe payments and invoices, and refund payments, from the backoffice
---

# Payments, Invoices and Refunds

{% hint style="info" %}
This feature requires a paid license
{% endhint %}

The Stripe add-on adds an **UmbCheckout** section to the backoffice, next to Settings. It shows the payments, invoices and refunds in your Stripe account, for the mode selected in the [Stripe settings](../configuration.md#stripe-settings) (test or live).

| Tree item    | Shows                                                       | Who can see it                                 |
| ------------ | ----------------------------------------------------------- | ---------------------------------------------- |
| Overview     | A summary of the section                                    | Users with access to the UmbCheckout section   |
| Transactions | The Stripe payments, with their details and a refund button | Users with access to the UmbCheckout section   |
| Invoices     | The Stripe invoices                                         | Members of the **UmbCheckout Invoices** group  |
| Refunds      | The Stripe refunds                                          | Members of the **UmbCheckout Refunds** group   |

The add-on creates the user groups **UmbCheckout**, **UmbCheckout Invoices** and **UmbCheckout Refunds**. Add users to them in Users -> User Groups to give them access.

Each item links to the payment, invoice or refund in the Stripe Dashboard.
