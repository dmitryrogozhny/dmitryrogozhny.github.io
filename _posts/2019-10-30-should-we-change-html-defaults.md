---
layout: post
title:  "Should We Change HTML Defaults?"
date:   2019-10-30 12:00

image: /assets/2019/should-we-change-default-html-hero.jpg
tags: [typography, design]
---

I want to talk a little about typography in Html.

Let's take an example markup with some headings and a paragraph of text:
{% highlight html %}
<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<h3>This is heading 3</h3>
<h4>This is heading 4</h4>
<h5>This is heading 5</h5>
<h6>This is heading 6</h6>

<p>
  <b>Tip:</b> Use h1 to h6 elements only for headings.
  Do not use them just to make text bold or big.
  Use other tags for that.
</p>
{% endhighlight %}

There are no default styles defined in the Html standard for heading and paragraph elements. In most modern browsers you will see this by default (default CSS settings are mentioned in [HTML <h1> to <h6> Tags](https://www.w3schools.com/tags/tag_hn.asp) article on w3schools.com):
<style>
        .defaults {
            border: 1px solid grey;
        }

        .defaults h1 {
            display: block;
            font-size: 2em;
            margin-top: 0.67em;
            margin-bottom: 0.67em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
            font-family: serif;
        }

        .defaults h2 {
            display: block;
            font-size: 1.5em;
            margin-top: 0.83em;
            margin-bottom: 0.83em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
            font-family: serif;
        }

        .defaults h3 {
            display: block;
            font-size: 1.17em;
            margin-top: 1em;
            margin-bottom: 1em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
            font-family: serif;
        }

        .defaults h4 {
            display: block;
            font-size: 1em;
            margin-top: 1.33em;
            margin-bottom: 1.33em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
            font-family: serif;
        }

        .defaults h5 {
            display: block;
            font-size: .83em;
            margin-top: 1.67em;
            margin-bottom: 1.67em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
            font-family: serif;
        }

        .defaults h6 {
            display: block;
            font-size: .67em;
            margin-top: 2.33em;
            margin-bottom: 2.33em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
            font-family: serif;
        }
    </style>

<div class="defaults">
    <h1>This is heading 1</h1>
    <h2>This is heading 2</h2>
    <h3>This is heading 3</h3>
    <h4>This is heading 4</h4>
    <h5>This is heading 5</h5>
    <h6>This is heading 6</h6>

    <p><b>Tip:</b> Use h1 to h6 elements only for headings. Do not use them just to make text bold or big. Use other
        tags for that.</p>

</div>

#### Default settings

By default, browsers will add equal margins at the top and bottom of headings.

Here are margins highlighted for each element:
![Default margins highlighted]({{ site.baseurl }}/assets/2019/html-defaults-default.gif)

You may find such style in books, but it is rarely can be seen on the web. Let's take a look at some examples.

#### Bootstrap CSS framework

[Bootstrap](https://getbootstrap.com/) is a popular framework for building sites and applications. Default styles applied to headings and paragraphs by Bootstrap influence lots of sites. Font family, size, and other settings will differ from site to site, but the trend to remove top margin, a use equal bottom margin will stay:
{% highlight css %}
h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}
{% endhighlight %}

Here are margins highlighted for a default Bootstrap css:
![Bootstrap margins highlighted]({{ site.baseurl }}/assets/2019/html-defaults-bootstrap.gif)

#### Apple developer site

Here are styles from the [Apple site for developers](https://developer.apple.com) (paddings are highlighted in green):
![Bootstrap margins highlighted]({{ site.baseurl }}/assets/2019/html-defaults-apple-developer.gif)

#### Dropbox site

And one more example, this time from the [Dropbox](https://help.dropbox.com) site:
![Bootstrap margins highlighted]({{ site.baseurl }}/assets/2019/html-defaults-dropbox.gif)

## Summary

In modern web sites, headings are usually outlined more either from the top or bottom, but not equally from both sides. This differs from the standard rendering of modern browsers, which follows a more traditional, book-like approach.
