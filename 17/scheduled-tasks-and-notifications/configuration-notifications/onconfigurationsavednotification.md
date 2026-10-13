---
description: Notification which is triggered after the UmbCheckout configuration is saved
---

# OnConfigurationSavedNotification

It is also published on the first save. To change or refuse a save, use `OnConfigurationSavingNotification` (see [Extending UmbCheckout](../../core-services/extending-umbcheckout.md)).

The following properties are available within the notification

| Property Name | Type                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------- |
| Configuration | [UmbCheckoutConfiguration](../../core-services/object-reference/umbcheckoutconfiguration.md) |
