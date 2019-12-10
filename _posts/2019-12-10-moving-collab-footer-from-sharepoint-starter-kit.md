---
layout: post
title: "Moving Collaboration Footer from SharePoint Starter Kit"
description: "This time we're going to move to a separate project the Collaboration Footer from the SharePoint Starter Kit. It provides company-wide links that are stored in a term set and personal links that are stored in a user profile property. The collaboration footer is similar to the portal footer but looks a little bit different."
date: 2019-12-10 12:00

image: "/assets/2019/moving-collab-footer-from-sp-starter-kit-hero.jpg"

tags: [sharepoint, spfx, pnp]
---

<aside markdown="1">
**Posts in the series**:
1. [Portal footer overview]({{ site.baseurl }}{% post_url 2019-11-27-moving-footer-from-sharepoint-starter-kit-1-footer-overview %})
2. [Create data sources]({{ site.baseurl }}{% post_url 2019-11-28-moving-footer-from-sharepoint-starter-kit-2-create-data-sources %})
3. [Create new SPFx project]({{ site.baseurl }}{% post_url 2019-11-29-moving-footer-from-sharepoint-starter-kit-3-new-project %})
4. [Fix issues]({{ site.baseurl }}{% post_url 2019-11-30-moving-footer-from-sharepoint-starter-kit-to-4-fix-issues %})
5. [Deploy and add to a site]({{ site.baseurl }}{% post_url 2019-12-1-moving-footer-from-sharepoint-starter-kit-to-5-deploy-and-add-to-site %})
6. Bonus: Moving Collaboration Footer (_this post_)
</aside>

This is the bonus post in the [mini-series]({{ site.baseurl }}{% post_url 2019-11-27-moving-footer-from-sharepoint-starter-kit-1-footer-overview %}) about moving the portal footer from the [SharePoint Starter Kit](https://github.com/SharePoint/sp-starter-kit) into a separate project.

This time we're going to move to a separate project the [Collaboration Footer](https://github.com/SharePoint/sp-starter-kit/blob/master/documentation/components/ext-collab-footer.md):
![footer preview]({{ site.baseUrl}}/assets/2019/moving-collab-footer-from-sp-starter-kit-preview.jpg)

You can get the source code for the final solution in the [collab-footer](https://github.com/dmitryrogozhny/sharepoint-lab/tree/master/footer/collab-footer) repository.

I'll give a shortened version of how to move the footer to a separate package. Refer to the main posts in the series for details.

## Collaboration footer overview

The collaboration footer is similar to the portal footer but looks a little bit different. It provides company-wide links that are stored in a term set and personal links that are stored in a user profile property.

## Create data sources

Let's start by creating a term set for company-wide links and a user profile property for personal links.

You can provision a demo term group with the [collab-footer-term-group.xml](https://github.com/dmitryrogozhny/sharepoint-lab/blob/master/footer/collab-footer/provisioning/collab-footer-term-group.xml) and PnP cmdlet:
{% highlight bash %}
Import-PnPTermGroupFromXml -Path ./collab-footer-term-group.xml
{% endhighlight %}

This will create the `PnPTermSets` group with the `PnP-CollabFooter-SharedLinks` term set that contains demo links.
![Term store]({{ site.baseUrl}}/assets/2019/moving-collab-footer-from-sp-starter-kit-term.jpg){: .image--original-size-small}

For personal links, we need to create a property in user profiles. The process is described in the [Create a Custom Property in the User Profile Service](https://github.com/SharePoint/sp-starter-kit/blob/master/documentation/tenant-settings.md#create-a-custom-property-in-the-user-profile-service) section in the Starter Kit guide.

The only thing to consider is that an access point for the user profiles page has been changed in the SharePoint admin center. You can now find it in the SharePoint admin center in More features&thinsp;→&thinsp;User profiles:
![User profile page]({{ site.baseUrl}}/assets/2019/moving-footer-from-sp-starter-kit-user-profile.jpg)

## Create new project

Now, we're ready to create a new SharePoint Framework project. I'll skip the details here, refer to the [Moving Footer from SharePoint Starter Kit. Part 3: New Project]({{ site.baseurl }}{% post_url 2019-11-29-moving-footer-from-sharepoint-starter-kit-3-new-project %}) post for a detailed process description.

Once the project is created, we need to copy the collaboration footer files from the SharePoint Starter Kit. Copy [collabFooter](https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/extensions/collabFooter), [common](https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/common), and [services](https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/services) folders to the `src` folder of the new project.

**Note**: Keep the original `CollabFooterApplicationCustomizer.manifest.json` file from the new project. This way the collaboration footer id would be different from the one in the SharePoint Starter Kit. It is important to avoid possible collisions.

## Deploy and add to site

Now you can use `gulp serve` to start the debug version of the footer.

To deploy the final solution you can use pre-built [collab-footer.sppkg](https://github.com/dmitryrogozhny/sharepoint-lab/tree/master/footer/collab-footer/package) package or build it with the source code:
{% highlight bash %}
gulp clean
gulp bundle --ship
gulp package-solution --ship
{% endhighlight %}

### Deploy package to the App site

Now we need to deploy our app to the App catalog site collection. After that, we can install the app with the footer on sites.

### Add footer to site

We can add the footer to a site by installing the footer app on this site. This can be done in UI by going to Site Content&thinsp;→&thinsp;New App&thinsp;→&thinsp;collab-footer-client-side-solution.

The same can be done in PowerShell (I'm using PnP PowerShell cmdlets here):
{% highlight bash %}
Connect-PnPOnline SITE_URL
Install-PnPApp -Identity APP_ID
{% endhighlight %}
Here `SITE_URL` is the url of the site you want to add the footer to; APP_ID is the unique id of the application. You can get the id by listing all the applications with the `Get-PnPApp` cmdlet.

After adding the app to the site, the footer will appear:
![collab footer in action]({{ site.baseUrl}}/assets/2019/moving-footer-from-sp-starter-kit-collab.gif)
