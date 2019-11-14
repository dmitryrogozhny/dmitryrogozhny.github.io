---
layout: post
title: "Can Editor Break SharePoint Online Site?"
description: "Here's a question: can an Editor break a SharePoint Online site? As a site Owner, you would always benefit from a spare pair of hands that'll help you keeping everything neat and tidy. But can Editors unintentionally break a site? What do you need to be aware of? There are four issues listed below along with ways on how to fix them. Note that you can avoid most of these problems with proper training for your Editors."
date: 2019-11-14 12:00

image: "/assets/2019/can-editor-break-sharepoint-site-hero.jpg"

tags: [sharepoint, intranet]
---

Here's a question: can an Editor break a SharePoint Online site?

As a site Owner, you would always benefit from a spare pair of hands that'll help you keeping everything neat and tidy. But can Editors unintentionally break a site? What do you need to be aware of?

There are four issues listed below along with ways on how to fix them. Note that you can avoid most of these problems with proper training for your Editors.

## Adding an Editor to a site

As a site Owner, you have got full control over the site. Using the **Share site** link on the top right of a home page you can share the site with others. You can select a level of control to share: Full control, Edit or Read only.

Here's how you can add an Editor to a site:
![Adding editor]({{ site.baseUrl }}/assets/2019/can-editor-break-sharepoint-site-share.gif){: .image--original-size-small}

Now, let's take a look at what an Editor can do.

## Issue 1: Giving Editor permissions to other users

Your Editors would be able to add other Editors to the site. The problem here is with the SharePoint Online interface. It does not show a level of permissions that will be shared by an Editor.

When I first saw the sharing screen, my assumption was that it will give **Read only** permissions, while permissions shared will be **Edit**, thus giving other users Editor permissions on the site.

This might not be the intention!

Take a look at how it looks like. Note that there is no level of permissions selector shown for Editors:
![Adding editor by editor]({{ site.baseUrl }}/assets/2019/can-editor-break-sharepoint-site-share-editor.gif){: .image--original-size-small}

### How to fix
You can modify site Members group's setting "Who can edit the membership of the group?" from "Group Members" to "Group Owner". The sharing dialog will stay visible, but Editors won't be able to add other Editors anymore.

## Issue 2: Modifying and Publishing home page and other site pages

Editors can modify and re-publish your home page and other pages.

### How to fix
If you want to avoid that, enable approval for your pages. This way, Editors would be able to modify pages but publishing would require your review and approval.

## Issue 3: Removing existing libraries and lists

Your Editors can unintentionally remove existing document libraries and lists. If there's a functionality that depends on these lists and libraries, it will break.

### How to fix
If that happened, even if an Editor deleteed a library from a Recycle bin, you will be able to restore it from a second-level Recycle bin.

## Issue 4: Changing Site and Hub navigation
Editors can modify your site's navigation. If the site is the root of a Hub, Editors will be able to modify Hub's navigation as well.

### How to fix
There's no easy way to fix that. You can modify Members group permissions on a site to limit Editors' permissions. By default, this group has got "Edit" permissions and you would need to move closer to "Contribute" permissions. This would require revision of Editors' features availability though.
