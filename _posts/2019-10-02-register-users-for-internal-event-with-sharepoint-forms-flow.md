---
layout: post
title: "Registering Users for Internal Event with SharePoint Online, Forms, and Flow"
description: "If you are organizing an internal event for your company, you will need a way for users to learn more about the upcoming event and a way to register. Here's how you can organize registration for an internal event in your company with SharePoint Online, Flow, and Forms."
date: 2019-10-02 12:00

image: "/assets/2019/register-for-internal-event-with-sharepoint-flow-forms-hero.jpg"

tags: [sharepoint, flow, forms, office 365, intranet]
---

If you are organizing an internal event for your company, you will need a way for users to learn more about the upcoming event and a way to register. Here's how you can organize registration for an internal event in your company with SharePoint Online, Flow, and Forms.

## Create registration form with Forms
First, we need to create an event registration form with Forms. Add fields that you need, but try to keep it simple. On submission, you'll get the user's email, so no need to ask for contact details during the registration.
![Form example]({{ site.baseurl }}/assets/2019/register-for-internal-event-with-sharepoint-flow-forms-form.jpg)

## Promote event on SharePoint intranet
Now we need to promote the upcoming event. SharePoint intranet and Teams are both great ways to let users know about the event.

You can create a news post on your intranet to promote the event, add this event to events list, or create a banner with `Call to Action` web part.
![Call to action example]({{ site.baseurl }}/assets/2019/register-for-internal-event-with-sharepoint-flow-forms-call-to-action.jpg)

Additionally, you can create a page on your SharePoint intranet for the event and embed the form to a page with the `Microsoft Form` web part. This way you can provide all the required information in one place along with the registration form.

## Use Flow to process submitted results
Microsoft Forms allows viewing submitted responses in Excel. But this is not always convenient, as users need to have edit access permissions to a form to view responses. If the same person will create a form and process responses, you may not need an additional Flow process. The Flow process is useful when you want to share responses, but do not want to allow editing of the form. This way it's easier to save data into a separate Excel file and share access to the file.

Create a new Excel file that will store responses. In the file create a new table that will have columns corresponding to submitted data (e.g. email, preferred date). The flow will start with every new submission. It will get the response details and insert them into the Excel file. Additionally, you may want to send an email notification to an organizer.
![Flow overview]({{ site.baseurl }}/assets/2019/register-for-internal-event-with-sharepoint-flow-forms-flow.jpg)

## Further improvements
You can further improve the solution. Here's a couple of ideas:
- Add information about an upcoming event to an intranet's events list.
- Use a list of registered users to send a newsletter after the event with additional materials.
- Save a list of participants to a SharePoint list and make it publicly available.
