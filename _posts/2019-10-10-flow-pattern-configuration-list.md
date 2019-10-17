---
layout: post
title: "Flow Patterns: SharePoint Configuration List"
description: "Here is an approach you can use to manage configuration for complex Flows. The idea is to separate flow's settings from its logic and keep settings in a SharePoint list item. This approach works well for flows with complex configurations, especially if a flow works with SharePoint."
date: 2019-10-10 12:00

image: "/assets/2019/flow-pattern-configuration-list-hero.jpg"

tags: [sharepoint, flow, office 365]
---

Here is an approach you can use to manage configuration for complex Flows. The idea is to separate flow's settings from its logic and keep settings in a SharePoint list item.

This approach works well for flows with complex configurations, especially if a flow works with SharePoint.

For a simple flow, you may be fine with keeping all settings inside the flow, storing them in variables. However, with this approach you may encounter problems with bigger flows:
- Hard to control a process versioning as you need to change a flow every time settings change.
- You need to be a process owner to change its settings.
- The configuration may become complex with multiple conditions if settings depend on a flows' details (current user, their role, metadata of a SharePoint document or other Office 365 items).
- It's hard to tell which settings are needed for a flow---documentation, support, and modifications become more complex.

You can solve these problems by moving your flow's configuration to a SharePoint list item. Depending on your situation, you may use a separate SharePoint list per flow or group similar flows into a single list.

Here's how it works. You create a SharePoint list. You add columns that reflect your flow settings. Next, you create a single or multiple configuration items that contain your flow settings. Finally, you get this configuration in your flow every time it starts.

Advantages of this approach are the following:
- All flow's settings are in a single list---they are easy to document, control, and modify.
- Changing flow settings does not require the modification of the flow.
- Flow owners can delegate settings management to other users by providing them `Edit` permissions for a configuration item.
- You can have multiple configuration items---an item to use is selected depending on a flow's context (e.g. current user, current SharePoint document metadata).

A quick example at the end. I have got a SharePoint list that stores configuration for a flow. I've added `Owner`, `DaysToRead`, and `ItemViewUrl` columns to store settings.
![Flow configuration list]({{ site.baseurl }}/assets/2019/flow-pattern-configuration-list-settings.jpg){: .image--original-size-small}

In the flow, at the start of the process, I retrieve the configuration item by its Id. After that, I initialize flow settings using the information from the config item: days to read and owner's email.
![Getting flow configuration]({{ site.baseurl }}/assets/2019/flow-patter-configuration-list-example.jpg){: .image--original-size-small}




