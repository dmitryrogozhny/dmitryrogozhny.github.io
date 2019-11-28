---
layout: post
title: "Moving Footer from SharePoint Starter Kit. Part 2: Data Sources"
description: "This time we will create a SharePoint list that will store company-wide links for the portal footer. Also we will create a user profile property that will store users' personal links. Finally, we will create a test site for the footer."
date: 2019-11-28 12:00

image: "/assets/2019/moving-footer-from-sp-starter-kit-2-hero.jpg"

tags: [sharepoint, spfx, pnp]
---

<aside markdown="1">
**Posts in the series**:
1. [Portal footer overview]({{ site.baseurl }}{% post_url 2019-11-27-moving-footer-from-sharepoint-starter-kit-1-footer-overview %})
2. Create data sources (_this post_)
3. Create new SPFx project
4. Fix issues
5. Deploy and add to a site
</aside>

This time we will create a SharePoint list that will store company-wide links for the portal footer. Also we will create a user profile property that will store users' personal links.

Finally, we will create a test site for the footer.

## Create SharePoint list for links

Let's start with a list for company-wide links.

The footer expects a list of links to have a specific set of fields. It tries to get the list from the hub site. If no hub site is available, the list is retrieved from the current site.

We can create this list manually or use the PnP provisioning. I'll show the latter approach.

You can get the [portal-footer/provisioning/portal-footer-links.xml](https://github.com/dmitryrogozhny/sharepoint-lab/blob/master/footer/portal-footer/provisioning/portal-footer-links.xml) PnP provisioning template for the list in the GitHub repository. This template has been extracted from the [starterkit.xml](https://github.com/SharePoint/sp-starter-kit/blob/master/provisioning/starterkit.xml) PnP provisioning template of the SharePoint Starter kit.

You need to use the PnP PowerShell to apply the template (check the [Getting started](https://github.com/SharePoint/sp-starter-kit#getting-started) section in the Starter Kit to learn more about PnP PowerShell).

To create a links list you need to connect to your site and apply the provisioning template:
{% highlight powershell %}
Connect-PnPOnline https://YOURDOMAIN.sharepoint.com/sites/YOURSITE
Apply-PnPProvisioningTemplate -Path ./portal-footer-links.xml
{% endhighlight %}

The provisioning template will create the `PnP-PortalFooter-Links` list with demo links:
![Portal footer links]({{ site.baseUrl}}/assets/2019/moving-footer-from-sp-starter-kit-links-list.jpg)

**Note**: you can change the list name or modify the template to include links you want.

## Create User Profile property

The process is described in the [Create a Custom Property in the User Profile Service](https://github.com/SharePoint/sp-starter-kit/blob/master/documentation/tenant-settings.md#create-a-custom-property-in-the-user-profile-service) section in the Starter Kit guide.

The only thing to consider is that an access point for the user profiles page has been changed in the SharePoint admin center. You can now find it in the SharePoint admin center in More features&thinsp;→&thinsp;User profiles:
![User profile page]({{ site.baseUrl}}/assets/2019/moving-footer-from-sp-starter-kit-user-profile.jpg)

**Note**: you can use any name you like for the property. We will use the created property name later when adding the footer to a site.

## Create test site

Now we can create a new site that we'll use for testing purposes. You can use any modern site template you want for it. Once the site is created, apply the PnP provisioning template to it to create a list of links for the footer. We will use this test site later.

Next time we will create a new project and move the source code for the footer in it.
