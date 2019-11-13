---
layout: post
title: "Flow Patterns: Name Your Actions and Add Comments"
description: "Power Automate (aka Microsoft Flow) allows to rename a title for action and add a comment. The best practice is to always give a descriptive name for your actions, so it is easier to understand your intentions. It also makes it easier to use your actions in expressions.Add comments to complex actions when nesessary."
date: 2019-11-13 12:00

series: "Flow Patterns"

image: "/assets/2019/flow-patterns-action-name-and-comments-hero.jpg"

tags: [sharepoint, flow, power automate, office 365]
---

## Goal

Your flows should be well documented, so others can understand, maintain and modify them if needed.

## Solution

Power Automate (aka Microsoft Flow) allows to rename a title for action and add a comment. The best practice is to always give a descriptive name for your actions, so it is easier to understand your intentions. It also makes it easier to use your actions in expressions.

Add comments to complex actions when necessary.

The `Rename` and `Add a comment` menu items available  in a dropdown menu for each action:
![Rename and Add a comment actions]({{ site.baseurl }}/assets/2019/flow-patterns-action-name-and-comments-rename.jpg){: .image--original-size-small}

Compare two actions below: one with a default name and one renamed and with a comment applied:
![Default and renamed actions]({{ site.baseurl }}/assets/2019/flow-patterns-action-name-and-comments-compare.jpg){: .image--original-size-small}

You can tell what the second action does even without looking at its details.

And don't forget to give a name and a description for your flows.
