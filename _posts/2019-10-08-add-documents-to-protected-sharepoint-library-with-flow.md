---
layout: post
title: "Add Documents to Protected SharePoint Library with Flow"
description: "If you have a protected library in your SharePoint Online site and you want to allow users to contribute after approval, you can do that with Flow."
date: 2019-10-08 12:00

image: "/assets/2019/copy-to-protected-library-hero.jpg"

tags: [sharepoint, flow, office 365, intranet]
---

Let's consider the following scenario: there is a document library on a SharePoint Online intranet with a read-only access for all users. We want to allow users to propose new documents for this library even if they don't have permissions to add new files. There is an approver who can either approve or decline users' submissions.

For example, we may have a list of useful documents on an intranet's home page, and users may propose new documents for that section.

We can set up such a scenario in SharePoint Online with an additional Flow process. The process will start every time a new document got uploaded. It will request approval from a predefined approver, and if approved, the process will copy a document to the protected document library.

## Configuring SharePoint libraries

First, lets set up document libraries. We'll create the `Documents` library that will store final documents. This library will provide a read-only access for everyone. Flow process we will set up will need edit permissions for this library to be able to add documents.

Next, let's create the `Upload Documents` document library where users can add their documents. This library should give `Contribute` permissions to all users. It should also have a content approval enabled, so new files will be visible to an author and users with approve permissions. Flow process (i.e. account that will own the process) should have approval permissions for the document library.
![Approval library settings]({{ site.baseurl }}/assets/2019/copy-to-protected-library-settings.jpg)

Now all users can upload documents to the `Upload Documents` document library. Once uploaded, documents will be visible to an author and users who can approve files.

## Configuring Flow

Now we need to set up a Flow process. Here's an overview of the process:
![Flow overview]({{ site.baseurl }}/assets/2019/copy-to-protected-library-flow-overview.jpg)

### Get uploaded file details

The process starts when a new document is uploaded. We'll get additional details about the document with the `Get file metadata` action.
![Flow get file details]({{ site.baseurl }}/assets/2019/copy-to-protected-library-flow-file.jpg)

### Initialize variables

Next, we'll initialize variables for a list of approvers and approval comments.
![Flow initialize variables]({{ site.baseurl }}/assets/2019/copy-to-protected-library-flow-variables.jpg)

### Approve document

Now we're ready to start the approval process. We'll send the approval request along with a link to a new document to approvers. The first response will be used as an approval result. As soon as any approver responses, we collect comments and set approval status for a document.
![Flow start approval]({{ site.baseurl }}/assets/2019/copy-to-protected-library-flow-approval.jpg)

### Copy file to protected library

Finally, we check the approval status. If the status is `Approve`, we copy the document to the protected library.
![Flow copy file]({{ site.baseurl }}/assets/2019/copy-to-protected-library-flow-copy.jpg)
