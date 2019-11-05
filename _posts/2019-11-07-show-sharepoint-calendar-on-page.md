---
layout: post
title: "Showing Calendars on SharePoint Page"
description: "Here'a how you can show events in a calendar on SharePoint Online pages using standard functionality. You can use this approach to show month/week/day views for your events."
date: 2019-11-07 12:00

image: "/assets/2019/showing-calendar-hero.jpg"

tags: [sharepoint, intranet]
---

Here's how you can show events in a calendar on SharePoint Online pages using standard functionality. You can use this approach to show month/week/day views for your events.

First of all, we need to create a list for events.

There are two easy ways to do that in SharePoint Online:
- Create a new list by using the existing events list as a template (there's the `Events` list that got created by default in modern communication sites);
- Create a new custom list, add columns to describe your events, and add a Calendar view to your list.

You will end with something like this example events list:
![SharePoint calendar standard view]({{ site.baseurl }}/assets/2019/showing-calendar-standard-view.jpg)

At this stage, you can use all the standard SharePoint features: set up access permissions, define view options, setup recurrent events, configure overlay for calendars.

Now, we want to have a page with an events' calendar in it. We're going to use the standard `Embed` web part for that.

If we'll specify a link to a calendar page, by default it will include the page header and toolbar:
![SharePoint calendar embed view]({{ site.baseurl }}/assets/2019/showing-calendar-embed-fail.jpg)

This looks confusing as there will be a duplicate header in the middle of a page.

To fix that we need to add the `?Minimized=true` parameter at the end of the embedded page Url. This will force the embedded page to hide the header and minimize the toolbar:
![SharePoint calendar embed]({{ site.baseurl }}/assets/2019/showing-calendar-embed.jpg)

This way the calendar takes less space and there's no confusing header.

Finally, you can add other content to a page to provide a context and additional actions for your calendar:
![SharePoint calendar embed]({{ site.baseurl }}/assets/2019/showing-calendar-example.jpg)
