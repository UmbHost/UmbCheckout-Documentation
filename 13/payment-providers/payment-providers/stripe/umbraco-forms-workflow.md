---
description: Redirect to Stripe Checkout on Form Submission
---

# Umbraco Forms Workflow

Using the Stripe Umbraco Forms Workflow package you can redirect to the Stripe Checkout on submission of a form.

Add the workflow **Send form to UmbCheckout for payment** (in the **Payment** group) to the form's submit step. The customer's current Basket is sent to Stripe Checkout, and they are redirected to pay.

The workflow settings are as follows:

| Name        | Use                                                                                  |
| ----------- | ------------------------------------------------------------------------------------ |
| Email alias | The alias of the field used to capture the email address (`emailAddress` by default) |

The Basket's `CustomerReferenceId` is set to `{form id}@{record id}` and sent to Stripe as the checkout session's client reference ID, so the payment can be matched to the form entry.
