---
layout: post
title: "Controlling SharePoint Framework Package Size"
description: "It is important to remember about the performance of your SharePoint Framework solutions. We'll look at a demo web part, review its size, and after that we'll see how this web part can be improved with webpack-bundle-analyzer, and React.lazy and Suspence."
date: 2019-12-11 12:00

image: "/assets/2019/controling-spfx-package-size-hero.jpg"

tags: [sharepoint, spfx, pnp]
---

It is important to remember about the performance of your SharePoint Framework solutions. Today we'll look at a demo web part, review its size, and after that we'll see how this web part can be improved.

I previously wrote about the demo [video web part]({{ site.baseUrl }}{% post_url 2019-10-28-video-web-part %}). This web part shows a video using a preconfigured Url.
<video autoplay="" loop="" src="{{ site.baseurl }}/assets/2019/video-web-part.mp4" ></video>

Also, there is a functionality for page editors that allows to specify the video's Url along with other options.
![video web part settings]({{ site.baseurl }}/assets/2019/improve-spfx-size-hero-editor.gif)

In addition to a standard SharePoint Framework web part code, this web part uses [Placeholder](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/Placeholder/) reusable control to ask an editor for a configuration. It also uses `css` function from the [office-ui-fabric-react](https://github.com/OfficeDev/office-ui-fabric-react) package to bring multiple CSS styles into a single string.

## Initial size

I'll be using `webpack-bundle-analyzer` as recommended in the [Optimize SharePoint Framework builds for production](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/optimize-builds-for-production#verify-the-contents-of-your-bundle) article to analyze the final bundle size. This package generates an html file that visualizes the size and content of your builds.

Here's what I've got initially:
![default state]({{ site.baseUrl }}/assets/2019/improve-spfx-size-hero-default.jpg)

On this page I can see which packages contribute to the bundle size: in green I've got code required by the `Placeholder` control, in blue the code required by the `css` function, and in pink is the rest of the code including the actual logic for the video web part.

The size of the bundle is **822Kb**.

## Remove css function

As we've seen the `css` function from the [office-ui-fabric-react](https://github.com/OfficeDev/office-ui-fabric-react) package contributes 200Kb to the bundle size. Most of the code is additional logic from the Office UI Fabric package, the `css` function itself is a small one. But we cannot use it without that additional code. This is fine when used along with other components and functions from the [office-ui-fabric-react](https://github.com/OfficeDev/office-ui-fabric-react) package in larger and more complex projects. But for a single function that's too much.

I'll avoid using this function for that project by removing its import and replacing it with my own implementation:
{% highlight javascript %}
function css(...args: string[]) {
  return args.join(' ');
}
{% endhighlight %}

This simple implementation just takes passed strings and joins them into a string, but that will suffice.

The updated bundle looks like that:
![default state]({{ site.baseUrl }}/assets/2019/improve-spfx-size-hero-nocss.jpg)

The size of the bundle is **616Kb** (which is a **25%** gain already).

## Dynamically load Placeholder

Currently, the `Placeholder` control gets loaded for every user, be it a regular user or an editor. I don't want to remove `Placeholder` control from the solution completely as it provides good guidance for editors when the web part is not configured properly. What I want is that this control to load only for editors when needed. Regular users should not load additional code when viewing videos.

I will be using the [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) functionality to organize the dynamic load of the `Placeholder` control. It allows to dynamically load React components only when they are needed.
Before optimizations I use the Placeholder component like that:
{% highlight jsx %}
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
// later in code
return (
  <Placeholder
    iconName="MSNVideos"
    iconText="Video"
    description="Display a video with an optional link and text."
    buttonLabel="Add video"
    onConfigure={onConfigure}
  />
);
{% endhighlight %}

An optimized version looks like the following:
{% highlight jsx %}
import { Suspense } from "react";
// instead of importing directly, wrap import in React.lazy()
const PlaceholderControl = React.lazy(() =>
  import(
    "@pnp/spfx-controls-react/lib/Placeholder"
  ).then(({ Placeholder }) => ({ default: Placeholder }))
);
// later in code, use Suspense to wrap lazy-loaded component
return (
  <Suspense fallback={<div className={styles.placeholder}>&nbsp;</div>}>
    <PlaceholderControl
      iconName="MSNVideos"
      iconText="Video"
      description="Display a video with an optional link and text."
      buttonLabel="Add video"
      onConfigure={onConfigure}
    />
  </Suspense>
);
{% endhighlight %}

Note the usage of `React.lazy` and `Suspence` in the code above.

Now, the bundle looks like that:
![default state]({{ site.baseUrl }}/assets/2019/improve-spfx-size-hero-lazy.jpg)

The total bundle size would still be **616Kb** but now it's been split into two parts: smaller one (**28Kb**) will be loaded for everyone, and a larger one (**588Kb**) will be loaded only for editors to show `Placeholder`.

## Final thoughts

With simple improvements, we've decreased the video web part site for most of the users from **822Kb** down to **28Kb** (**96%** improvement without a functionality loss). The updated source code is available in the [video](https://github.com/dmitryrogozhny/sharepoint-lab/tree/master/video) repository.

When implementing SharePoint Framework solutions it is important to think about lots of things: usability, tools for page editors, and performance.
