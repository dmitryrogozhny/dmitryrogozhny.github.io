---
layout: post
title:  "Leaking Abstraction in WebPartTitle Control from @pnp/spfx-controls-react"
date:   2019-04-09 12:00

tags: [sharepoint, office 365, spfx, pnp]
---

A quick note about the [WebPartTitle](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/WebPartTitle/) control.

[WebPartTitle](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/WebPartTitle/) control renders a web part title that can be changed in the edit mode. It is a useful component from the [@pnp/spfx-controls-react](https://sharepoint.github.io/sp-dev-fx-controls-react) package of reusable React components for SharePoint Framework.

![WebPartTitle control]({{ site.baseurl }}/assets/webparttitle-control.gif)

One thing here that I find a bit confusing is that we propagate the knowledge about the SharePoint environment to React components. Instead of pure components that can render in any environment, we bind them to the SharePoint Framework. This happens because the `WebPartTitle` requires the `DisplayMode` as one of properties.

This way your React component should import the DisplayMode from the `@microsoft/sp-core-library` package:

`import { DisplayMode } from '@microsoft/sp-core-library';`

This is not a big deal, but the edit mode for the WebPartTitle could have been implemented using the `boolean` property. And it would work just fine. Anyway, this is a great component to use if you need an editable title for your SharePoint Framework web parts.
