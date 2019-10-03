---
layout: post
title: "Remind to Update Intranet Content with Flow"
description: "Consistency is critical when publishing news on an intranet. In SharePoint Online intranets you can help your content editors to stay consistent with Microsoft Flow. This Flow process will regularly check intranet news. If there were no news for a specified period, the process will send a reminder notification to content editors."
date: 2019-10-03 12:00

image: "/assets/2019/flow-reminder-to-update-content-hero.jpg"

tags: [sharepoint, flow, office 365, intranet]
---

Consistency is critical when publishing news on an intranet. Even if you don't have a lot of news, they need to appear with an expected regularity. Once a day, once a week, or once in two weeks---consistency is a key. When news posts appear regularly, users will have a good habit of visiting your intranet to learn about what is going on in the company.

In SharePoint Online intranets you can help your content editors to keep consistency with Microsoft Flow.

In this post, I'll describe a Flow process, that will regularly check intranet news. If there were no news for a specified period, the process will send a reminder notification to content editors.

## Implementation details

Here's the screenshot of the flow:
![flow overview]({{ site.baseurl }}/assets/2019/flow-reminder-to-update-content-workflow.jpg)

The flow runs every day. It gets the date of the last published news and checks whether it was more than a week ago. If needed, it then sends an email with a reminder.

### Initializing variables
![flow overview]({{ site.baseurl }}/assets/2019/flow-reminder-to-update-content-part-1.jpg)

The flow triggers once a day. It sets a set of variables on start:
- News owner email---email of a content editor responsible for news;
- Knowledgebase link---URL of the knowledge base article with recommendations and news ideas;
- Recommended news frequency in days---how often news should be published.

### Calculating news last publish date
![flow overview]({{ site.baseurl }}/assets/2019/flow-reminder-to-update-content-part-2.jpg)

To get a last publish date for news the flow requests a list of pages from `Site Pages` library on the intranet site. The action requests one last page sorted by date with a state `PromotedState` equal to 2 (which corresponds to a published news post).

To get the last publish date the following expression is used: `first(body('Get_the_latest_published_news_post')?['Value'])?['Modified']`. It gets the `Modified` property of the returned page.

To the last publish date we add frequency days with the following expression: `addDays(variables('LastNewsDate'), variables('DaysWithoutNews'))`. That gives us the expected date for the next news post. This date can be in the past (we need to send a reminder) or in the future (no need to send).

### Sending email reminder
![flow overview]({{ site.baseurl }}/assets/2019/flow-reminder-to-update-content-part-3.jpg)

Finally, we compare the current date with the expected date for the next news post. If the expected date is in the past, let's send an email reminder. The reminder will be sent to the intranet's news owner.

## Ideas for improvement

This process can be further improved. Here are some ideas that may help you:
- Add escalation contact---if there were no new content for a specific period, send an escalation message to a manager.
- Extend the email template---add helpful information into a reminder, like a link to a knowledge base with recommendations and ideas for news.
- Create a publications' schedule---a reminder will be sent to a user that is specified in a schedule.
