---
layout: post
title:  Adding Post Series to Jekyll Site
date:   2017-08-15 12:00

image: "/assets/adding-post-series-to-jekyll-site-final.png"

series: Adding Anything to Jekyll
tags: [jekyll, personal site]
---

I want to share with you, how I've added a support for post series to my site.

Separating a big topic into several posts allows to deal with complexity. You don't have to write everything in one go. And it's easier to read as well because readers don't get overwhelmed with the information.

I want to help readers to easier navigate post series. At the same time, the navigation should not distract from the content.

The source code for the [`post-series.html`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_includes/post-series.html) include is available in the [site's repository](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io). Here's the final result:
![post series final look](/assets/adding-post-series-to-jekyll-site-final.png)

## Designing the List
Here is how the design for a series posts list changed.

I've started with a simple ordered list:
![post series initial look](/assets/adding-post-series-to-jekyll-site.png)

The problem here is that a list distracts a reader from the main content. It takes a lot of space and looks just like the content. You have to read it first to realize that it's a table of content, and scroll down to the actual content.

First thing, let's make the font size for the list smaller to make it compact:
![post series smaller font](/assets/adding-post-series-to-jekyll-site-smaller-font.png)

Now it looks better on mobiles, but on larger screens it still takes a lot of space.

So, the next step is to try and make it render horizontally:
![post series horizontally](/assets/adding-post-series-to-jekyll-site-horizontal.png)

Much better from a space perspective, but now numbers are gone, and the list looks messy.

To fix that, I'll add numbers back and will increase the distance between the links:
![post series with numbers](/assets/adding-post-series-to-jekyll-site-numbers.png)

Almost there. I want to separate posts' links even more, so a list can be read faster. And I want to highlight the current post in the list, to make the navigation easier.

To separate links, I'll add a [middot separator](https://en.wikipedia.org/wiki/Interpunct), and I'll highlight a current post with a color:
![post series with separator and highlight](/assets/adding-post-series-to-jekyll-site-separator.png)

OK, now it looks as I want.

## How It Is Implemented
To be listed in a series a post should have a variable `series` defined in its front matter block. The value of the variable is the name of the series:
{% highlight html %}
{% raw %}
---
…
series: "Dark Tower by Stephen King"
…
---
{% endraw %}
{% endhighlight %}

All CSS styles for the list are defined in the [`post-series.scss`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_sass/components/post-series.scss) file.

The include [`post-series.html`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_includes/post-series.html) is responsible for rendering a list of posts in a series. It's added to the [`post.html`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_layouts/post.html) layout, which got applied to every post on the site.

The `post-series.html` include checks for the `series` variable. If it's defined for the current post, it gets all the posts with the same series name and renders a list.

That's it. Now post series will be easier to navigate and read.