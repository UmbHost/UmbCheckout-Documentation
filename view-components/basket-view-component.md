# Basket View Component

A prebuilt basket which uses a HTML table is included.

The table is unstyled and either requires styling within the partial cshtml file or using CSS.

The cshtml partial can be found at the following path:

Views -> Partials -> UmbCheckout -> \_Basket.cshtml

To be able to use the Basket View Component you will need to add the following to your `_ViewImports.cshtml` file

```cshtml
@addTagHelper *, UmbCheckout.Core
```

This will allow you to use the following tag helper:

```cshtml
<vc:basket></vc:basket>
```

Alternatively, you can load the View Component without using the tag helper:

```cshtml
@await Component.InvokeAsync(typeof(BasketViewComponent))
```
