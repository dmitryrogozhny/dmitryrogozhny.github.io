---
layout: post
title: "Moving Footer from SharePoint Starter Kit. Part 1: Footer Overview"
description: "I will show how to move the Portal Footer from the SharePoint Starter Kit into a separate project. The goal is to get a package that contains only the portal footer. This way we will not deploy components we won't use and we won't need to support them. This gives a smaller package size, faster building and deployment times. And the footer can be customized to your requirements."
date: 2019-11-27 12:00

image: "/assets/2019/moving-footer-from-sp-starter-kit-1-hero.jpg"

tags: [sharepoint, spfx, pnp]
---

<aside markdown="1">
**Posts in the series**:
1. Portal footer overview (_this post_)
2. [Create data sources]({{ site.baseurl }}{% post_url 2019-11-28-moving-footer-from-sharepoint-starter-kit-2-create-data-sources %})
3. [Create new SPFx project]({{ site.baseurl }}{% post_url 2019-11-29-moving-footer-from-sharepoint-starter-kit-3-new-project %})
4. [Fix issues]({{ site.baseurl }}{% post_url 2019-11-30-moving-footer-from-sharepoint-starter-kit-to-4-fix-issues %})
5. [Deploy and add to a site]({{ site.baseurl }}{% post_url 2019-12-1-moving-footer-from-sharepoint-starter-kit-to-5-deploy-and-add-to-site %})
6. [Bonus: Moving Collaboration Footer]({{ site.baseurl }}{% post_url 2019-12-10-moving-collab-footer-from-sharepoint-starter-kit %})
</aside>


I will show how to move the Portal Footer from the [SharePoint Starter Kit](https://github.com/SharePoint/sp-starter-kit) into a separate project.
![Footer preview]({{ site.baseUrl}}/assets/2019/moving-footer-from-sp-starter-kit-footer-preview.jpg)

You can get the source code for the final solution in the [portal-footer](https://github.com/dmitryrogozhny/sharepoint-lab/tree/master/footer/portal-footer) repository.

The goal is to get a package that contains only the portal footer. This way we will not deploy components we won't use and we won't need to support them. This gives a smaller package size, faster building and deployment times. And the footer can be customized to your requirements.

In the same way, you can move other SharePoint Starter Kit components.

## SharePoint Starter Kit overview
[SharePoint Starter Kit](https://github.com/SharePoint/sp-starter-kit) is an open-source project from the SharePoint PnP team. It provides web parts and extensions that you can use as an example for your intranet customizations.

![SharePoint Starter Kit]({{ site.baseUrl}}/assets/2019/moving-footer-from-sp-starter-kit-sp-kit-preview.jpg)

The SharePoint Starter Kit project contains 17 web parts, 7 extensions, and additional deployment scripts. The source code is available in the [sp-starter-kit](https://github.com/SharePoint/sp-starter-kit) GitHub repository.

You also can provision the kit using the [SharePoint provisioning service](https://provisioning.sharepointpnp.com/) (I did an [overview of the service](https://www.youtube.com/watch?v=BmzAyWWoY5s&list=PLNx4CZSyPNnvrAlLo6OJGG5kmcE3LRs0s&index=3)).

## Portal Footer overview
Here's the [footer](https://github.com/SharePoint/sp-starter-kit/blob/master/documentation/components/ext-portal-footer.md) that we're going to extract to a separate project:
![Footer in action ]({{ site.baseUrl}}/assets/2019/moving-footer-from-sp-starter-kit-footer-preview.gif)

The footer provides a support email address, copyright statement, and a list of links. In addition to company-wide links, users can configure personal links that will be available only to them.

Company-wide links are stored in a SharePoint list. Personal links are stored in a user profile property.

Next time we will create data sources for the footer. Stay tuned!
