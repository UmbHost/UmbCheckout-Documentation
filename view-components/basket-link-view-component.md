# Basket Link View Component

A prebuilt basket link which incudes the Basket Count is included.

The link is unstyled and either requires styling within the partial cshtml file or using CSS.

The cshtml partial can be found at the following path:

Views -> Partials -> UmbCheckout -> \_BasketLink.cshtml

To be able to use the Basket Link View Component you will need to add the following to your `_ViewImports.cshtml` file

```cshtml
@addTagHelper *, UmbCheckout.Core
```

This will allow you to use the following tag helper:

```cshtml
<vc:basket-link></vc:basket-link>
```

Alternatively, you can load the View Component without using the tag helper:

```cshtml
@await Component.InvokeAsync(typeof(BasketLinkViewComponent))
```

### Configurable Properties

You can set the following properties

| Property     | Use                                       |
| ------------ | ----------------------------------------- |
| basketAlias  | The Content Type alias of the Basket page |
| linkName     | The text shown on the link                |
| linkCssClass | The CSS class to be added to the \<a> tag |
