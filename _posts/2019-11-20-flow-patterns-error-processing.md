---
layout: post
title: "Flow Patterns: Error Processing"
description: "If you want to process errors that may occur in your flow's actions, you can use \"Configure run after \" setting for actions. Here's how you can add error processing to your Flows."
date: 2019-11-20 12:00

series: "Flow Patterns"

image: "/assets/2019/flow-patterns-error-processing-hero.jpg"

tags: [sharepoint, flow, office 365]
---

## Goal

Gracefully process failing actions in your flows without failing the whole flow.

## Solution

Use the "Configure run after" setting to define error processing action.

Let's consider a sample flow:
![Sample flow]({{ site.baseUrl }}/assets/2019/flow-patterns-error-processing-sample.jpg){: .image--original-size-small}

When running the flow, a user should enter a name for a library. The flow requests the last 10 created documents from the library and sends an email with a list of documents. If a user will enter a name for a library that does not exist, the flow will fail. The user will not get any message about that.

Error messages especially important with scheduled and automatically triggered flows.

To process errors, you need to define "Configure run after" setting. Let's add a new parallel action that will send an email about errors:
![Email for errors]({{ site.baseUrl }}/assets/2019/flow-patterns-error-processing-email.jpg)

After that, select "Configure run after" in the action's menu:
![Flow with run after]({{ site.baseUrl }}/assets/2019/flow-patterns-error-processing-run-after.jpg){: .image--original-size-small}

In the "Configure run after" dialog select "has failed" and "has timed out" options:
![Configure run after dialog]({{ site.baseUrl }}/assets/2019/flow-patterns-error-processing-run-after-dialog.jpg){: .image--original-size-small}

You will end with a flow that looks like the following:
![Flow with error processing]({{ site.baseUrl }}/assets/2019/flow-patterns-error-processing-flow-with-error-processing.jpg)

Note that the right "Send email with an error message" action has got a red dashed line to it. It is to highlight that it has got "configure run after" configured.

### Final result

Now, if a user will define an existing name for a library, the flow will run as expected: get last 10 documents from a library and send them in an email:
![Successfull flow]({{ site.baseUrl }}/assets/2019/flow-patterns-error-processing-flow-ok.jpg)

If a user will specify a library that does not exist, the flow will fail and a user will get an email about the problem:
![Failed flow]({{ site.baseUrl }}/assets/2019/flow-patterns-error-processing-flow-fail.jpg)


### Applying error processing to multiple actions

If you want to apply an error processing action to multiple actions, you need to move these actions under a "Scope" action:
![Flow with scope]({{ site.baseUrl }}/assets/2019/flow-patterns-error-processing-flow-scope.jpg)
