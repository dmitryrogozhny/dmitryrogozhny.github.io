---
layout: post
title: "Daily Changes Digest for SharePoint Library with Flow"
description: "If you need to recieve a daily, weekly, or monthly digest about changes in a SharePoint document library, you can do that with Flow. I will show how to configure a daily changes digest for a specific folder in a SharePoint Online document library."
date: 2019-10-04 10:00

image: "/assets/2019/daily-changes-digest-hero.jpg"

tags: [sharepoint, flow, office 365, intranet]
---

If you need to receive a daily, weekly, or monthly digest about changes in a SharePoint document library, you can do that with Flow. I will show how to configure a daily changes digest for a specific folder in a SharePoint Online document library.

Before configuring your custom flow, consider using standard SharePoint alerts functionality. SharePoint provides standard alerts that you can use to set up email notifications about changes in a particular document library:
![Alert dialog]({{ site.baseurl }}/assets/2019/daily-digest-alert.jpg)

Setting up the custom Flow might be helpful when the standard alert functionality is not enough.

Here are some scenarios, when you may consider custom Flow process:
- you need to get a unified digest from multiple libraries in a single email.
- you need to dynamically control a list of recipients.
- you are interested in a specific set of changes, e.g. in a specific folder, for a particular file type.
- you need to control the email template, e.g. add additional information, change the layout.
- you need to send notifications to a Teams channel instead of email.

## Sample Flow

Let's build a flow that will run once a day, get a list of documents created or modified during the day, and send an email message with links to these documents. We'll be interested in changes in a specific folder in a SharePoint Online document library.

Here's how the Flow process looks like:
![Flow overview]({{ site.baseurl }}/assets/2019/daily-digest-flow.jpg)

### Start and initialize variables
The flow starts every day. On start, I initialize variables that the process will be using. This way it's easier to manage them and change as needed.

I've got a list of recipients for an email and path to a specific folder as variables. Additionally, I've got a start of today's date that I'll use for data query and a string for HTML that I'll put into an email.
The start of today can be set with the `startOfDay(utcNow())` expression.
![Flow initialize variables]({{ site.baseurl }}/assets/2019/daily-digest-flow-init.jpg)

### Get data from SharePoint

Next, I need to select information about modified documents in a specific folder.
![Flow get documents from SharePoint]({{ site.baseurl }}/assets/2019/daily-digest-flow-select.jpg)

I use `Get files (properties only)` action followed by the `Filter array` action to show possible ways to filter the data. It is preferable to use filters specified by `Get files (properties only)` action, as this will work on SharePoint side and Flow will receive a filtered array back.

You can use `Filter array` action as well. This works well for small amounts of data or when you need to filter the same list of documents in several ways (e.g. get one list of SharePoint documents and create two filtered arrays from it).


### Send email notification
The last step is to create an HTML message and send an email.
![Flow send email]({{ site.baseurl }}/assets/2019/daily-digest-flow-email.jpg)

I use `Apply to each` action to loop through values of a filtered array. For each item I create a HTML string like `<li><a href='file_link'>file_name</a><li>` and append it to the `FilesListHtml` variable.

The expression to create such string is `concat('<li><a href="',item()?['{Link}'],'" >',item()?['{FilenameWithExtension}'],'</a></li>')`. It users values of `{Link}` and `{FilenameWithExtension}` properties of each array item.

Finally, there's the `Send an email notification (V3)` action that sends the digest email.

Here's how the email message looks like:
![Email notification example]({{ site.baseurl }}/assets/2019/daily-digest-flow-email-message.jpg)
