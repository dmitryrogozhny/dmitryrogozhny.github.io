---
layout: post
title: "Flow Patterns: Run Actions in Parallel"
description: "You can improve the performance of your Power Automate flows by running actions in parallel. There are two ways to run actions in parallel: add a parallel branch to an action and enable concurrency for \"Apply to each\" action."
date: 2019-11-21 12:00

series: "Flow Patterns"

image: "/assets/2019/flow-patterns-run-actions-in-parallel-hero.jpg"

tags: [sharepoint, flow, office 365]
---

## Goal

Improve the performance of your flow by running actions in parallel.

## Solution

There are two ways to run actions in parallel:
1. Add a parallel branch to an action.
2. Enable concurrency for "Apply to each" action.

### Add a parallel branch

Let's consider a sample flow that gets properties for documents from four different SharePoint libraries. All requests to libraries will be done sequentially:
![Sample flow]({{ site.baseUrl }}/assets/2019/flow-patterns-run-actions-in-parallel-sample.jpg)

 We can modify the flow by adding parallel branches to the first action:
![Add parallel branch]({{ site.baseUrl }}/assets/2019/flow-patterns-run-actions-in-parallel-add-branch.jpg)

This allows to modify the flow so all the actions will run in parallel:
![Run in parallel]({{ site.baseUrl }}/assets/2019/flow-patterns-run-actions-in-parallel-run-parallel.jpg)

### Enable concurrency for "Apply to each"

You can use "Apply to each" action to run actions on items in an array in parallel. By default, actions will be executed sequentially, but you can change this is the "Apply to each" action settings:
![Apply to each settings]({{ site.baseUrl }}/assets/2019/flow-patterns-run-actions-in-parallel-apply-to-each.jpg)

You can turn on the concurrency control and select a level of parallelism from 1 up to 50.

### Things to consider

When running actions in parallel there are several things you need to consider to avoid issues.

**Note 1**: Be aware of the limits of connectors and external APIs in your actions. When running actions in parallel, there is a higher chance to hit API limits which will cause your flow to fail.

**Note 2**: When applying concurrency in "Apply to each" action there is no guaranteed order on applying actions to items in a collection. If you need to ensure that actions will run on items in an order, switch off concurrency to run actions sequentially.
