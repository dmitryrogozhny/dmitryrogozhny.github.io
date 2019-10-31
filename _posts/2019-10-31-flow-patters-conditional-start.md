---
layout: post
title: "Flow Patterns: Conditional Start"
description: "Conditional start is a useful pattern you can use in Microsoft Flow. It allows to start the main flow logic only on a particular condition."
date: 2019-10-31 12:00

series: "Flow Patterns"

image: "/assets/2019/flow-patterns-conditional-start-hero.jpg"

tags: [sharepoint, flow, office 365]
---

## Goal

Run a Microsoft Flow only when a particular condition is met.

## Solution

Here's how you can implement the conditional start in Flow. On a Flow start, we need to check for a target condition with the `Condition` action. If the condition is not met, we stop the flow execution with `Terminate` action.

The condition and terminate logic is wrapped in the `Scope`, so it can be collapsed and make it easier to work with the main flow logic.

![Conditional start overview]({{ site.baseurl }}/assets/2019/flow-patterns-conditional-start-overview.jpg)
