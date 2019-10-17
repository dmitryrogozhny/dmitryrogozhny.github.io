---
layout: post
title: "Flow Patterns: Service Account"
description: "If you are using Microsoft Flow to automate processes in your company, you may benefit from dedicated service accounts to run your Flows."
date: 2019-10-15 12:00

image: "/assets/2019/flow-pattern-service-account-hero.jpg"

tags: [sharepoint, flow, office 365]
---

If you are using Microsoft Flow to automate processes in your company, you may benefit from dedicated service accounts to run your Flows.

For simple personal flows, users can use their accounts. With more complex flows you may encounter the following problems:
- Flow will stop working if an owner's account has been deleted or disabled.
- Flow may access unwanted secure data if a flow's owner has got elevated access permissions, e.g an admin account.
- Owners' access permissions may change, which may lead to a flow failure.

These problems can be avoided with a service account. There is no such a special type of account in Office 365, so the service account is a regular Office 365 user account created to run Flows. You would need to assign licenses to this account as well. Using the service account (or multiple service accounts) you can effectively control flows in your company.

Advantages of using service accounts are:
- Flow is not tied to a user account---the flow will continue working even if a user has left the company.
- Control over security and access permissions---service account can be granted with specific permissions needed by the flow. No more, no less.
- There can be several service accounts with different access permissions---this way it's easier to control security in flows.

Using service accounts makes the process of managing flows more secure and controllable. At the same time, it's more complex than using personal accounts. An optimal approach should be defined in each particular case.

Some additional advises and tips that might help:
- Every flow should have its owner---even if a flow got created and run using a service account, there should be a user that owns a process, knows its implementation, and can support it.
- Service accounts should have their owners---as they are regular Office 365 accounts, they should be controlled by admins to avoid uncontrolled access to data.
- Service accounts and their permissions should be documented.
- Try to minimize the number of service accounts. Create new service accounts when access permissions needed are not available with existing service accounts.
- Flow owners and editors should make sure to use a service account's connections and not their own.
- There is no official support for service accounts in Flow, thus no recommendations from the Flow product team. Work out your own best practices and policies depending on your needs.
