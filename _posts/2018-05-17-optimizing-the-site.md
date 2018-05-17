---
layout: post
title:  Optimizing This Site
date:   2018-05-17 12:00

image: "/assets/optimizing-this-site-hero.png"

series: Adding Anything to Jekyll
tags: [personal site, jekyll]
---

Here's the great talk on the website obesity crisis by Maciej Ceglowski (and here's the [text version](http://idlewords.com/talks/website_obesity.htm) of the talk):
{% include youtube.html id="iYpl0QVCr6U" %}


After this talk, I've decided to take a look at this site. I want to check for problems outlined by Maciej.


## Before optimizations

Currently, for a simple blog post, it takes about __80 requests and 1.4 MB of data__. Even for a post with a single sentence! While this amount of traffic is not a problem for most internet connections, this still may be a problem for slower mobile networks. That is the kind of problems Maciej is talking about.

In my case, most of a page load is taken by the [Disqus comments widget]({{ site.baseurl }}{% post_url 2017-07-10-adding-disqus-to-jekyll-site %})--- __about 70 requests and 1.3 MB of data__. While the Disqus comments are great, they are not always needed.

If a user leaves without reading the whole post, there's no need to load comments. If a user has scrolled the whole post to the bottom, we can load comments. This will optimize the load time and the amount of traffic taken per page.

The rest of requests are the blog post itself, my custom CSS and javascript files, site's logo, and [normalize.css](https://necolas.github.io/normalize.css/) styles. Additionally, there are requests for the Google Analytics service, and custom fonts from the Google Fonts library.

I can optimize these as well, while they do not influence the size of a page that much.

## Optimizing Disqus widget loading

To optimize the load of comments, I'm going to apply a lazy loading technique. Thus the comments will be loaded only if a user scrolled down to the comments section.

I will use the [Disqus lazy loading](https://css-tricks.com/lazy-loading-disqus-comments/) implemented by Osvaldas Valutis. I will replace the current implementation in the [_includes/disqus.html](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_includes/disqus.html) include file with a `div`:

```<div class="disqus"></div>```

The [script](https://github.com/osvaldasvalutis/disqusLoader.js/blob/master/disqusloader.js) for loading the comments I'll add to the [js/main.js](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/tree/master/js) file.

### Testing optimization

I'm using the Chrome developer tools to check the network traffic. After the optimization it takes __10 requests and 100 KB for a post__. When I scroll down to the comments section, Disqus widget gets loaded. Nice.

## Optimizing CSS, JavaScript, and images

At this stage I'm pretty satisfied with the result. I've decided to add some optimizations while I'm on the topic.

These optimizations include:
- switched on the CSS compression in [_config.yml](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_config.yml) with `sass: style: compressed`;
- moved [normalize.css](https://necolas.github.io/normalize.css/) from CDN to the unified CSS file;
- optimized the logo image;
- minified scripts from [js/main.js](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/tree/master/js) and inlined them in the page layout.

These optimizations saved __2 more requests and 30 KB of traffic__.

Ok. Good enough. I'll stop at that.

Whether you implement simple sites or complex applications, it's always a good thing to think about your users. Anything that makes their experience better should be appreciated.
