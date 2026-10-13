---
description: Notification which is triggered after the UmbCheckout configuration is saved
---

# OnConfigurationSavedNotification

The following properties are available within the notification

| Property Name | Type                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------- |
| Configuration | [UmbCheckoutConfiguration](../../core-services/object-reference/umbcheckoutconfiguration.md) |

It is published after every save that writes the configuration, including the first one. So the first save also writes the uSync file, clears the cached configuration on the other servers of a load-balanced site and sends the anonymous telemetry.
