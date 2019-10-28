---
layout: post
title: "Video Web Part"
description: "The Video web part allows you to play videos in your SharePoint Online pages. You can add the web part to a full-width section to make a great looking landing page, or add to multi-column sections to make your pages more dynamic. Additionally, you can specify a link to navigate to when a user clicks a video and an optional text that will be shown over a video."

date: 2019-10-28 12:00

image: "/assets/2019/video-web-part-hero.jpg"

tags: [sharepoint, intranet, spfx]
---

The Video web part allows you to play videos in your SharePoint Online pages.

You can add the web part to a full-width section to make a great looking landing page, or add to multi-column sections to make your pages more dynamic. Additionally, you can specify a link to navigate to when a user clicks a video and an optional text that will be shown over a video.

<video autoplay="" loop="" src="{{ site.baseurl }}/assets/2019/video-web-part.mp4" ></video>

The source code for the web part is available in the [GitHub repository](https://github.com/dmitryrogozhny/sharepoint-lab/tree/master/video).

The web part contains the following properties:
- Video link&thinsp;&mdash;&thinsp;link to a video file;
- Poster link&thinsp;&mdash;&thinsp;link to an image that will be shown if a specified video is not available;
- Link&thinsp;&mdash;&thinsp;optional link to navigate to;
- Add text over video&thinsp;&mdash;&thinsp;toggle whether a text should be displayed over a video;
- Title&thinsp;&mdash;&thinsp;text to show over a video;
- Add filter over video&thinsp;&mdash;&thinsp;toggle whether to apply a dimming filter over a video.

![video web part settings]({{ site.baseurl }}/assets/2019/video-web-part-settings.jpg){: .image--original-size-small}

### Using video files instead of gif
Using video files instead of gifs allows loading pages faster. Video files are better optimized and are smaller in size. For example, the size of the video file at the top is 0.2 megabytes, while the same content in a gif file is 1.6 megabytes (eight times larger).

Free video for a demo is taken from the [Coverr](https://coverr.co/) site.
