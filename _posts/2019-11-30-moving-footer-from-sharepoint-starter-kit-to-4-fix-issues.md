---
layout: post
title: "Moving Footer from SharePoint Starter Kit. Part 4: Fix Issues"
description: ""
date: 2019-11-30 12:00

image: "/assets/2019/moving-footer-from-sp-starter-kit-4-hero.jpg"

tags: [sharepoint, spfx, pnp]
---

<aside markdown="1">
**Posts in the series**:
1. [Portal footer overview]({{ site.baseurl }}{% post_url 2019-11-27-moving-footer-from-sharepoint-starter-kit-1-footer-overview %})
2. [Create data sources]({{ site.baseurl }}{% post_url 2019-11-28-moving-footer-from-sharepoint-starter-kit-2-create-data-sources %})
3. [Create new SPFx project]({{ site.baseurl }}{% post_url 2019-11-29-moving-footer-from-sharepoint-starter-kit-3-new-project %})
4. Fix issues (_this post_)
5. [Deploy and add to a site]({{ site.baseurl }}{% post_url 2019-12-1-moving-footer-from-sharepoint-starter-kit-to-5-deploy-and-add-to-site %})
6. [Bonus: Moving Collaboration Footer]({{ site.baseurl }}{% post_url 2019-12-10-moving-collab-footer-from-sharepoint-starter-kit %})
</aside>

In the previous part, we've started the footer on a test site.

But depending on your SharePoint Online environment you may encounter two issues:
**broken layout for the footer**:
![Broken footer in action]({{ site.baseUrl}}/assets/2019/moving-footer-from-sp-starter-kit-footer-preview-broken.gif)

**Personal links dialog does not open**.
![Broken personal links]({{ site.baseUrl}}/assets/2019/moving-footer-from-sp-starter-kit-footer-broken-personal.gif)

This time we're going to fix that.

## Issue 1: Broken layout
The reason for the problem is that the footer uses [Office UI Fabric](https://developer.microsoft.com/en-us/fabric) global CSS classes, such as "ms-Grid" and "ms-sm2", directly in the markup:
{% highlight html %}
<div className="ms-Grid">
  <div className="ms-Grid-row">
    <div className="ms-Grid-col ms-sm3" onClick={ this._handleToggle }>
      <Label className={styles.copyright}>{this.props.copyright}</Label>
    </div>
    <div className="ms-Grid-col ms-sm2">
      ...
    </div>
    <div className="ms-Grid-col ms-sm6" onClick={ this._handleToggle }>
      ...
    </div>
    <div className="ms-Grid-col ms-sm1" onClick={ this._handleToggle }>
      ...
    </div>
  </div>
</div>
{% endhighlight %}

I wrote about that problem in the [Common Issue When Using Office UI Fabric in SPFx Projects]({{ site.baseUrl}}{% post_url 2019-10-25-using-office-ui-fabric-in-spfx %}). And here’s an excerpt from the [Using Office UI Fabric Core and Fabric React in SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/office-ui-fabric-integration) article:
> To achieve reliability, one of the main problems we need to solve is that of Global CSS styles. This accounts to **not using global class names in the HTML markup and instead using Fabric Core mixins and variables in the Sass declaration file**. This involves importing the Fabric Core’s Sass declarations in your Sass file and then consuming the variables and mixins appropriately.

So in order to fix this issue, we need to use mixins provided by Office UI Fabric instead of using global class names.

### Why does it work in Starter Kit?
The footer layout works fine in the SharePoint starter kit because there are other extensions that add Office UI Fabric global CSS classes to a page. The footer uses these classes for its layout. Once we've moved the footer away, these CSS classes won't be loaded (as we do not request them).

### How to fix layout
To fix the layout we need to use Office UI Fabric mixins instead of global CSS classes. So instead of referencing classes like:
{% highlight html %}
<div className="ms-Grid">
{% endhighlight %}

we need to define a class in the `PortalFooter.module.scss` file like this:
{% highlight less %}
.grid {
    @include ms-Grid;
}
{% endhighlight %}

after that we can use this class in our layout:
{% highlight html %}
<div className={styles.grid}>
{% endhighlight %}

### Fixing myLinks dialog
The dialog for adding personal links has got the same issue with global CSS class names. We need to fix it in the same way.

## Issue 2: Personal links dialog does not open
A dialog for personal links may disappear right after opening it:
![Broken personal links]({{ site.baseUrl}}/assets/2019/moving-footer-from-sp-starter-kit-footer-broken-personal.gif)

The reason for that is that a user profile property that stores personal links for a user will return `undefined` on first use. The dialog for editing personal links expects an array of links and fails. We need to explicitly process that in the code and pass an empty array when the user profile property value is undefined.

### Fix issues in sp-starter-kit
Now that we've got these issues fixed in a local repository, we need to apply the same fixes to the original [SharePoint Starter Kit](https://github.com/SharePoint/sp-starter-kit).

I've forked the starter kit repository, applied the same fixes, and created pull requests to add them to the original repository.

## Final solution
Ok, now let's run the project again with `gulp serve`.

It will open a page with a footer. This time, it should look as expected and everything should work properly.
![Footer in action]({{ site.baseUrl}}/assets/2019/moving-footer-from-sp-starter-kit-footer-preview.gif)

Now we've got the footer working as expected.

The last thing we have left is to look at how to deploy and add the footer to sites. We'll look at that next time.
