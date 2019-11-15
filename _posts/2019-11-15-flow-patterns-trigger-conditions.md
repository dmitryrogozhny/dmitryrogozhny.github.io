---
layout: post
title: "Flow Patterns: Trigger Conditions"
description: "I previously wrote about a conditional start for flows using conditions and the \"Terminate Flow\" action. Here's an alternative approach that leverages Trigger Conditions. This approach hides the flow's starting condition better, which may be pros or cons depending on your situation."
date: 2019-11-15 12:00

series: "Flow Patterns"

image: "/assets/2019/flow-patterns-trigger-conditions-hero.jpg"

tags: [sharepoint, flow, office 365]
---

## Goal

Run a Microsoft Flow only when a particular condition is met.

## Solution

I previously wrote about a [conditional start for flows]({{ site.baseUrl }}{% post_url 2019-10-31-flow-patters-conditional-start %}) using conditions and the `Terminate Flow` action.

Here's an alternative approach that leverages Trigger Conditions. This approach hides the flow's starting condition better, which may be pros or cons depending on your situation.

Let's consider a sample flow scenario "Send a customized email when a new file is added". This flow will send an email for all new items created in a document library, both documents and folders:
![Sample flow]({{ site.baseUrl }}/assets/2019/flow-patterns-trigger-conditions-sample.jpg){: .image--original-size-small}

If we don't want to start the flow for folders, we can specify a trigger condition in the "When a file is created (properties only)" trigger action settings:
![Trigger settings]({{ site.baseUrl }}/assets/2019/flow-patterns-trigger-conditions-settings.jpg){: .image--original-size-small}

I'm using the `triggerBody()` expression to get details of the trigger. The condition will evaluate to `False` for folders, so the flow will start only for documents:
{% highlight bash %}
@not(equals(triggerBody()?['{IsFolder}'], true))
{% endhighlight %}

This way you can specify multiple conditions for a flow.

### How to view skipped runs
Using a trigger condition you won't see skipped runs in a flow's dashboard:
![Sample flow]({{ site.baseUrl }}/assets/2019/flow-patterns-trigger-conditions-skipped.jpg){: .image--original-size-small}

To view skipped runs you need to select `All runs` link in a top right corner of a "Runs" window. In the opened window, select "Checks (no new data)" to view flow runs that were skipped due to a trigger condition.
![Sample flow]({{ site.baseUrl }}/assets/2019/flow-patterns-trigger-conditions-skipped-all.jpg){: .image--original-size-small}
