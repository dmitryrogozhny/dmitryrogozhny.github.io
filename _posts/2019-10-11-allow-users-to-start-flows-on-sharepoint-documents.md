---
layout: post
title: "Allow Users to Start Flows in SharePoint Document Libraries"
description: "With Flow you can set up a process that other users would be able to start for a selected document in a SharePoint document library. There is a couple of ways to allow users to start Flows on selected documents in SharePoint document libraries."
date: 2019-10-11 12:00

image: "/assets/2019/allow-users-to-start-flow-hero.jpg"

tags: [sharepoint, flow, office 365]
---

With Flow you can set up a process that other users would be able to start for a selected document in a SharePoint document library.
![Flow settings overview]({{ site.baseurl }}/assets/2019/allow-users-to-start-flow-menu.jpg)

There is a couple of ways to allow users to start Flows on selected documents in SharePoint document libraries.

You can access all of them on the Flow edit page.
![Flow settings overview]({{ site.baseurl }}/assets/2019/allow-users-to-start-flow-details.jpg)

## Invite users and groups to use Flow

You can specify users and groups that will have a run-only access to a flow. Users will be able to start that flow, but won't be able to modify it. This is a good option if users should have read-only permissions for a SharePoint document library and be able to start a flow.
![Flow settings overview]({{ site.baseurl }}/assets/2019/allow-users-to-start-flow-share-users.jpg){: .image--original-size-small}

 When configuring sharing options, you can specify what context to use when running a flow---process owner or current user. Process owner context can be used when you need to perform operations with elevated permissions (e.g. move file to a protected library or folder). Current user context should be used when you need to perform actions as a current user (e.g. post a message to a Teams channel on behalf of a user)

**Note:** At the moment of writing (October, 2019) sharing with a group does not work propertly. Even when shared users from a group won't see the shared flow. Only sharing with a particular user works. This might change in the future.

## Invite a SharePoint list or library to use Flow

Next options is to share a flow with a SharePoint document library. This way all users with `Edit` permissions for that library would be able to run the flow.
![Flow settings overview]({{ site.baseurl }}/assets/2019/allow-users-to-start-flow-share-sharepoint.jpg){: .image--original-size-small}

This works well when it is ok to give `Edit` permissions to users that can start a flow. Be aware that this level of permissions allows to modify not only documents but a document library itself.

## Add process owners

Last option is sharing an ownership of the Flow process with other users. This way users would be able to both start the flow and modify it. This option should be used only if other users will modify the process.
