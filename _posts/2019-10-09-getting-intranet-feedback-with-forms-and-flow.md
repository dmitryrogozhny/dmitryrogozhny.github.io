---
layout: post
title: "Getting Feedback for SharePoint Intranet with Forms and Flow"
description: "Getting feedback is important for every intranet. This allows users to make intranet better by submiting ideas, reporting errors, and proposing changes. Here is how you can collect feedback in your SharePoint Online intranet with Microsoft Forms and Flow."
date: 2019-10-09 10:00

image: "/assets/2019/getting-intranet-feedback-with-forms-and-flow-hero.jpg"

tags: [sharepoint, flow, forms, office 365, intranet]
---

Getting feedback is important for every intranet. This allows users to make intranet better by submiting ideas, reporting errors, and proposing changes.

Here is how you can collect feedback in your SharePoint Online intranet with Microsoft Forms and Flow.

To collect feedback you will need to: create a feedback form with Microsoft Forms, embed the form to a SharePoint page, process submitted feedback with a Flow process.

## Feedback page
You can create a feedback form with Microsoft Forms and embed it into your SharePoint Online intranet with the `Microsoft Forms` web part. I recommend to keep this form simple---a single text field for feedback would be enough. You can always request more details later if needed.

You can create one or several pages to collect feedback. It makes sense to create multiple pages if you want to route different types of feedback to different groups inside a company.
![Feedback form]({{ site.baseurl }}/assets/2019/getting-intranet-feedback-with-forms-and-flow-form.jpg)

A link to a feedback page can be added to a navigation menu, promoted with a banner, shared with users via email or Teams.
![navigation menu with feedback items]({{ site.baseurl }}/assets/2019/getting-intranet-feedback-with-forms-and-flow-menu.jpg)

## Flow to process feedback
The Flow process will start with every new form submission. It will collect the feedback and send it to a reviewer for processing.
![Flow overview]({{ site.baseurl }}/assets/2019/getting-intranet-feedback-with-forms-and-flow-overview.jpg)

## Futher improvements
This process can be futher improved. Here's a couple of ideas:
- Save all submitted feedback to an Excel sheet or to a SharePoint Online list.
- Assign a unique ID for every submitted feedback to make it trackable.
- Extend fields in a feedback form and then route a feedback data to different reviewers depending on submitted fields.
- Integrate a feedback form with an idea center---make feedback available for users so they can vote up and discuss.
