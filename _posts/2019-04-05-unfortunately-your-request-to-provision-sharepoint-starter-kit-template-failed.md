---
layout: post
title:  "SharePoint PnP Provisioning Service: Request to provision \"SharePoint Starter Kit\" template failed"
date:   2019-04-05 12:00

tags: [sharepoint, office 365, spfx]
---

A quick note about provisioning the [SharePoint Starter Kit](https://github.com/SharePoint/sp-starter-kit) solution using the [SharePoint PnP Provisioning Service](https://provisioning.sharepointpnp.com/).

![SharePoint Starter Kit]({{ site.baseurl }}/assets/sp-starter-kit-front-page-16x9.png)

During the privisioning of the [SharePoint Starter Kit](https://github.com/SharePoint/sp-starter-kit) you may receive an email from the provisioning service with the following text:
```
Unfortunately, your request to provision "SharePoint Starter Kit" template failed.
Here is the exception that occurred:
...
```

In my case the problem was that I didn't add my tenant admin account as Term Store Administrator in the Taxonomy Term Store. So the part of the exception stack trace mentioned the term store:
```
...
Microsoft.SharePoint.Client.ClientContextExtensions.ExecuteQueryRetry
(ClientRuntimeContext clientContext, Int32 retryCount, Int32 delay, String userAgent)
at OfficeDevPnP.Core.Framework.Provisioning.ObjectHandlers.Utilities.TermGroupHelper.ProcessGroup
(ClientContext context, TaxonomySession session, TermStore termStore, TermGroup modelTermGroup,
    TermGroup siteCollectionTermGroup, TokenParser parser, PnPMonitoredScope scope)
...
```

After I've added the admin account to Term Store Administrators, the problem was gone and everything worked like a charm.

This requirement is actually specified among others in the [Prerequisites](https://provisioning.sharepointpnp.com/home/details?packageId=5c3f13eb-e7c0-4d71-8154-d33dee71356d#prerequisites) section of the provisioning tempate. But it is easy to miss as other templates do not require this kind of permissions.
