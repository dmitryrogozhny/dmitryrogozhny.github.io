---
layout: post
title: "Generate PDF Files from SharePoint List Items with SPFx"
description: ""
date: 2019-10-16 12:00

image: "/assets/2019/generate-pdf-files-hero.jpg"

tags: [sharepoint, spfx]
---

This example project shows how you can generate Pdf files in a browser using SharePoint list items as a data source. You can start generation with actions in a SharePoint list or use a web part.

The source code for the project is available in the [github repository](https://github.com/dmitryrogozhny/sharepoint-lab/tree/master/export-to-pdf).

There are several ways to generate pdf documents in SharePoint: with browser-only code, with Flow, with Word Online, with custom Azure function or web service. This project shows how you can generate a pdf document using a code that runs locally in a user's browser.

## Demo functionality

There is a demo for four scenarios in this project.

**Export a single item**: you can select a single item in a SharePoint list and call `Export Item` action to generate a pdf file. The file will contain a list item's info in a custom layout.
![Export item]({{ site.baseurl }}/assets/2019/export-to-pdf-item.gif)

**Export a list of items**: you can select multiple items in a list and call `Export Items` action to generate a pdf for selected items. The fill will contain a table with items' info.
![Export items]({{ site.baseurl }}/assets/2019/export-to-pdf-items.gif)

**Create a travel list**: a `Travel List` action is similar to `Export Item` action but generates more complex pdf file. The file will contain a selected item's info and a generated Bing map image with a route between the source and destination points specified in the item properties.
![Travel list]({{ site.baseurl }}/assets/2019/export-to-pdf-travel-list.gif)

__Export to Pdf web part__: gives an example of the same functionality wrapped in a web part instead of list actions.
![Export to pdf web part]({{ site.baseurl }}/assets/2019/export-to-pdf-web-part.gif)

## Implementation details
The project is available in the [github repository](https://github.com/dmitryrogozhny/sharepoint-lab/tree/master/export-to-pdf). The [READ.ME](https://github.com/dmitryrogozhny/sharepoint-lab/blob/master/export-to-pdf/README.md) describes steps to deploy the solution.

The source code is available in the [src](https://github.com/dmitryrogozhny/sharepoint-lab/tree/master/export-to-pdf/src) folder. It contains the following folders:
- **extensions**&thinsp;---&thinsp;contains a code for an extension that defines list actions.
- **webparts**&thinsp;---&thinsp;contains a code of the `Export to Pdf` web part.
- **services**&thinsp;---&thinsp;contains a code for services that implement pdf generation, Bing map generation, and accessing SharePoint list items.
- **deploy**&thinsp;---&thinsp;contains a script for provisioning the `Travel` list that is needed for the demo to work.

### Pdf generation

The [PdfService.ts](https://github.com/dmitryrogozhny/sharepoint-lab/blob/master/export-to-pdf/src/services/PdfService.ts) contains the logic for creating pdf files. It exports the `exportItemToPdf`, `exportListToPdf`, and `generateTravelListToPdf` functions that generate pdfs. Pdf files got generated on the fly with a help of [jspdf](https://github.com/MrRio/jsPDF) library, and [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) plugin for jspdf is used to generate tables.

### Bing map generation

The `Travel List` action generates a pdf file with a Bing map inside. The map is a static image that shows a route between the source and destination points defined in a selected SharePoint item. All the logic for a static map generation is located in the [MapService.ts](https://github.com/dmitryrogozhny/sharepoint-lab/blob/master/export-to-pdf/src/services/MapService.ts) file.

You can check my [How to Get the Static Bing Maps Image]({{ site.baseurl }}{% post_url 2019-04-29-getting-static-map-bing-image %}) post to learn more about a static Bing map generation.

### Extension

The source code for the extension is straightforward.

In the `onListViewUpdated` function, we track that export actions for a single item would be available only if a single item has been selected. In the `onExecute` function, we get info about selected items and call selected action.

There is also a private `httpGet` function defined that wraps a call to a standard SPFx `HttpClient.get` function. This function got passed to a function that generates pdf with a travel list. This way a pdf generation function does not depend on SharePoint and can be reused in a non-SharePoint environment.

### Web part

The web part provides the same functionality as the extension. The title of a data source list should be specified as a property for a web part instance.

It uses the `ListView` component from the [`@pnp/spfx-controls-react`](https://sharepoint.github.io/sp-dev-fx-controls-react/) package to show items from a list and `ActionButton` from [office-ui-fabric-react](https://developer.microsoft.com/en-us/fabric/#/controls/web) for action buttons.

The web part and the extension share the logic for pdf file generation.
