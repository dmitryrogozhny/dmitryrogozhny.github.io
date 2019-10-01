---
layout: post
title:  "Sample Excel Dashboard for SharePoint Online"
description: "With File Viewer web part you can display your Excel dashboard in your SharePoint Online sites. There are some gotchas you need to be aware though. This post gives an example of an original dashboard and its optimized for SharePoint Online version."
date:   2019-10-01 08:00

tags: [sharepoint, excel]
---

Yesterday I wrote about [tips for showing Excel dashboards in SharePoint Online]({{ site.baseurl }}{% post_url 2019-09-30-5-tips-for-showing-excel-dashboards-in-sharepoint-online %}).

With File Viewer web part you can display Excel dashboards in your SharePoint Online sites. There are some gotchas you need to be aware though. This post gives an example of an original dashboard and its optimized for SharePoint Online version.

Here are two sample Excel dashboards that you can use to check that functionality:
- [Original Excel dashboard]({{ site.baseurl }}/lab/excel-dashboard/sample-dashboard.xlsx)---test performance dashboard based on pivot tables and charts.
- [Excel dashboard optimized for SharePoint Online]({{ site.baseurl }}/lab/excel-dashboard/sample-dashboard-online.xlsx)---dashboard modified to work in SharePoint Online.

The second dashboard contains the following modifications:
- Blocks with charts and slicers are ungrouped, otherwise filters won't work;
- Background image removed as it's not supported online;
- Map chart removed as it's not supported online;
- Charts made smaller to reduce scrolling (the area up to cell R29 is shown without scrolling in a one column layout);
- Removed header "Performance Dashboard" to save up space.

After modifications, I've got the following result:
![Excel dashboard example]({{ site.baseurl }}/assets/2019/excel-dashboard-online.jpg)

 I've used the [financial sample workbook](https://docs.microsoft.com/en-us/power-bi/sample-financial-download) from Mircorsoft for demo data.


