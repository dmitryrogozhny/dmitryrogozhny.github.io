---
layout: post
title: "Video Web Part. Implementation Details"
description: "The Video web part allows to show videos in your SharePoint Online pages. This post goes into implementation details. It highlights the usage of SharePoint Framework, React functional and higher order components, @pnp/spfx-controls-react reusable controls, and responsive layout with Office UI Fabric."
date: 2019-10-29 10:00

image: "/assets/2019/video-web-part-implementation-hero.jpg"

tags: [sharepoint, spfx]
---

**Note**: This post is about the implementation details of the Video web part. If you are interested in a web part's overview, check the [Video Web Part]({{ site.baseurl }}{% post_url 2019-10-28-video-web-part %}) post.

The Video web part allows to show videos in your SharePoint Online pages. The source code for the web part is available in the [GitHub repository](https://github.com/dmitryrogozhny/sharepoint-lab/tree/master/video).

<video autoplay="" loop="" src="{{ site.baseurl }}/assets/2019/video-web-part-implementation-settings.mp4" ></video>

This web part illustrates the following concepts on top of the SharePoint Framework:
- Using React for building SharePoint Framework web parts.
- Support for a full-width section.
- Using Placeholder reusable control from [@pnp/spfx-controls-react](https://sharepoint.github.io/sp-dev-fx-controls-react/).
- Using [Office UI Fabric](https://developer.microsoft.com/en-us/fabric#/) for responsive layout.
- Using React functional components and higher order components (HOC).

## Rendering video

The main logic for the Video web part is located in the [`src/webparts/video/components/Video.tsx`](https://github.com/dmitryrogozhny/sharepoint-lab/blob/master/video/src/webparts/video/components/Video.tsx) component.

### When rendering what
Depending on whether we are editing web part and whether a video to a link has been provided, there are four possible outcomes:
1. If we are editing the web part and a video link is not specified&thinsp;&mdash;&thinsp;render a [Placeholder](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/Placeholder/) control from the [@pnp/spfx-controls-react](https://sharepoint.github.io/sp-dev-fx-controls-react/) package. The Placeholder will ask to specify a video link.
2. If we are editing the web part and a video link is specified&thinsp;&mdash;&thinsp;render a video player using the link to a video. An additional link to navigate to will be ignored while editing web part.
3. If we are showing the web part (i.e. not editing) and a video link is not specified&thinsp;&mdash;&thinsp;show empty web part.
4. If we are showing the web part and a video link is specified&thinsp;&mdash;&thinsp;show a video player. An additional link to navigate to, dimming filter and a text over a video will be added if it has been specified in properties. This is the main scenario for end users.

As this component is very simple and does depend on a React lifecycle, it was converted from class to a function. In React this type of components is called functional components as opposed to class components that derive from the `React.Component` class. The function returns what needs to be rendered in the same way as the `render()` function of a class component.

### Conditional wrapper

If a navigation link has been specified in web part properties, we need to wrap a video with an `<a>` tag. If we are editing web part or a link has not been provided, we need to wrap a video in `<div>` tag. This can be achieved with additional `if` statements, but this will lead to code duplication (multiple branches described above that differ in a wrappwer&thinsp;&mdash;&thinsp;either `<a>` or `<div>`).

To avoid duplication, there is an additional component that renders either `<a>` or `<div>` depending on a specified condition. This is a [`ConditionalLinkWrapper.tsx`](https://github.com/dmitryrogozhny/sharepoint-lab/blob/master/video/src/webparts/video/components/ConditionalLinkWrapper.tsx) component.

Here's how it is used by `Video.tsx` component:
{% highlight jsx %}
const videoContainer =
(<ConditionalLinkWrapper
    condition={link && !isEditing}
    link={link}
    className={styles.videoContainer}
 >
    <div className={css(styles.dimmingFilter, addFilter ? '' : styles.hidden)}></div>
        <video autoPlay loop muted playsinline src={videoLink} poster={posterLink}></video>
        <div className={css(styles.textContainer, addTextOver ? '' : styles.hidden)}>
        <div className={styles.overlayTextContainer}>
            <div className={styles.overlayText}>
                {escape(title)}
            </div>
        </div>
    </div>
</ConditionalLinkWrapper>);
{% endhighlight %}

This component rendering depends on the `link && !isEditing` condition, where `link` is a link to a video and `isEditing` specifies whether we are currently editing a page.

## Full-width section support
The Video web part can be added to a full-width section:
![full-width support]({{ site.baseurl }}/assets/2019/video-web-part-implementation-full.jpg)

The support for a full-width is specified in the [`VideoWebPart.manifest.json`](https://github.com/dmitryrogozhny/sharepoint-lab/blob/master/video/src/webparts/video/VideoWebPart.manifest.json) manifest file with the `supportsFullBleed` parameter set to true:
{% highlight json %}
"supportsFullBleed": true,
{% endhighlight %}

## Responsive layout
The size of a text over a video depends on a screen resolution. This is done using Office UI Fabric mixins in the [`Video.module.scss`](https://github.com/dmitryrogozhny/sharepoint-lab/blob/master/video/src/webparts/video/components/Video.module.scss) file. `@include ms-screen-xl-up` mixin is used to define rules for larger screens (1024px and up):
{% highlight scss %}
@import '~office-ui-fabric-react/dist/sass/References.scss';

// some code removed for brevity
.textContainer {
  margin: 16px;

  @include ms-screen-xl-up {
    margin: 32px;
  }

  .overlayTextContainer {
    .overlayText {
      font-size: 20px;
      padding: 8px 16px;
      line-height: 30px;

      @include ms-screen-xl-up {
        font-size: 28px;
        padding: 18px 24px;
        line-height: 42px;
      }
    }
  }
}
{% endhighlight %}

If you want to learn more about responsive layouts with Office UI Fabric, check the [Hiding SPFx Web Part on Small Screens]({{ site.baseurl }}{% post_url 2019-10-17-hiding-spfx-web-part-on-small-screens %}) article.
