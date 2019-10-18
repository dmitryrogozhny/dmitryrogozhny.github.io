---
layout: post
title: "Hiding SPFx Web Part on Small Screens"
description: "You might want to hide your SPFx web part or some of its elements for a particular screen size. For example, you can hide your web part on small screens or display different controls for different screen sizes. You can do that with Office UI Fabric. There is a set of SCSS mixins available in Office UI Fabric that you can use to control the visibility of your web part and its elements."
date: 2019-10-17 12:00

image: "/assets/2019/hiding-spfx-web-part-hero.jpg"

tags: [sharepoint, spfx]
---

You might want to hide your SPFx web part or some of its elements for a particular screen size. For example, you can hide your web part on small screens or display different controls for different screen sizes.

You can do that with [Office UI Fabric](https://developer.microsoft.com/en-us/fabric#/). There is a set of SCSS mixins available in Office UI Fabric that you can use to control the visibility of your web part and its elements.

If you want your elements to hide starting from some resolution and smaller, you need one of mixins:
- `ms-screen-sm-down` (480px and down)
- `ms-screen-md-down` (640px and down)
- `ms-screen-lg-down` (1024px and down)
- `ms-screen-xl-down` (1366px and down)
- `ms-screen-xxl-down` (1920px and down)

If you want your elements to hide starting from some resolution and larger, you need these mixins:
- `ms-screen-md-up` (480px and up)
- `ms-screen-lg-up` (640px and up)
- `ms-screen-xl-up` (1024px and up)
- `ms-screen-xxl-up` (1366px and up)
- `ms-screen-xxxl-up` (1920px and up)

For example, if you want to hide your web part on screens smaller than 1024px, you can do that with the `ms-screen-lg-down` mixin and the following scss code:
{% highlight scss %}
.hideInMobileView {
    @include ms-screen-lg-down {
        display: none !important;
    }
}
{% endhighlight %}

In the final CSS you would get the following code:
{% highlight css %}
@media only screen and (max-width:1023.99999px) {
    .hideInMobileView_376f4be0{
        display:none!important
    }
}
{% endhighlight %}

Now, to hide the web part, you need to apply this style in your code (through the `styles.hideInMobileView`).

**Note**: your web part will still be rendered, it will not be invisible though. This approach is intended for usability scenarios and should not be used for security trimming.
