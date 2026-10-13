---
description: >-
  Notification which is triggered after the Stripe settings are saved
---

# OnStripeSettingsSavedNotification

The following properties are available within the notification

| Property Name | Type |
| ------------- | ---- |
| StripeSettings | UmbCheckoutStripeSettings |

It is published after every save that writes the Stripe settings, including the first one, so the first save writes the uSync file and clears the cached settings on the other servers of a load-balanced site.
