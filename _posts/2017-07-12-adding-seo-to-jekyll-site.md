---
layout: post
title:  Adding SEO to Jekyll Site
date:   2017-07-12 12:00

series: Adding Anything to Jekyll
tags: [jekyll]
---

To provide more information to search engines, I've used [`jekyll-seo-tag`](https://github.com/jekyll/jekyll-seo-tag) plugin.

Before activating the plugin, I've checked my site with the SEO-audit tool [SEOSiteCheckup](https://seositecheckup.com). Here's the summary of the audit:
![SEO Site Checkup without jekyll-seo-tag]({{ site.baseurl }}/assets/adding-seo-tag-to-jekyll-site-no-seo-tag.png)

Several errors relate to missing `<meta>` tags:
![missing meta tags]({{ site.baseurl }}/assets/adding-seo-tag-to-jekyll-site-errors.png)

The `jekyll-seo-tag` plugin renders `<meta>` tags that help search engines to better describe your page. Additionally, it adds `<meta>` tags specific to social networks. All this make your pages more accessible for your visitors.

The installation process is simple and [described on the home page of the plugin](https://github.com/jekyll/jekyll-seo-tag#installation). The `jekyll-seo-tag` plugin is supported by GitHub Pages, so it'll work if you're using GitHub Pages to host your site.

Additionally, I've edited required values in the `_config.yml` file, such as `title`, `author`, `description`, and `twitter:username`.

After the plugin activation, `<meta>` tags got added to pages. For example, for [Adding Google Analytis to Jekyll Site](https://dmitryrogozhny.com/blog/adding-google-analytics-to-jekyll-site) post the following tags have been added:
{% highlight html %}
<!-- Begin Jekyll SEO tag v2.2.3 -->
<title>Adding Google Analytics to Jekyll Site | Dmitry Rogozhny</title>
<meta property="og:title" content="Adding Google Analytics to Jekyll Site" />
<meta name="author" content="Dmitry Rogozhny" />
<meta property="og:locale" content="en_US" />
<meta name="description" content="Adding Google Analytics to your Jekyll site is a “Hello, world” excercise." />
<meta property="og:description" content="Adding Google Analytics to your Jekyll site is a “Hello, world” excercise." />
<link rel="canonical" href="https://dmitryrogozhny.com/blog/adding-google-analytics-to-jekyll-site" />
<meta property="og:url" content="https://dmitryrogozhny.com/blog/adding-google-analytics-to-jekyll-site" />
<meta property="og:site_name" content="Dmitry Rogozhny" />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2017-07-07T12:00:00+00:00" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@dro_stories" />
<meta name="twitter:creator" content="@Dmitry Rogozhny" />
<script type="application/ld+json">
{"@context":"http://schema.org","@type":"BlogPosting","headline":"Adding Google Analytics to Jekyll Site",
"author":{"@type":"Person","name":"Dmitry Rogozhny"},"datePublished":"2017-07-07T12:00:00+00:00",
"dateModified":"2017-07-07T12:00:00+00:00","description":"Adding Google Analytics to your Jekyll site is a “Hello, world” excercise.",
"mainEntityOfPage":{"@type":"WebPage","@id":"https://dmitryrogozhny.com/blog/adding-google-analytics-to-jekyll-site"},
"url":"https://dmitryrogozhny.com/blog/adding-google-analytics-to-jekyll-site"}</script>
<!-- End Jekyll SEO tag -->
{% endhighlight %}

You can find the descriptio of tags added at the [plugins page](https://github.com/jekyll/jekyll-seo-tag#what-it-does).

Here's the second run of the audit tool after the plugin actiovation:
![SEO Site Checkup with jekyll-seo-tag]({{ site.baseurl }}/assets/adding-seo-tag-to-jekyll-site.png)

As you can see it got better. There's much more to SEO than providing `<meta>` tags, but that would be enough for me for now. You can check your site in the same way to see where your site stands.

If you want to get more information about SEO and how to improve your site pages visibility, check these articles:
- [The beginners guide to SEO](https://moz.com/beginners-guide-to-seo);
- [The Essential Meta Tags for Social Media](https://css-tricks.com/essential-meta-tags-social-media/);
- [SEO Site Checkup](https://seositecheckup.com)---online tool that audits your site and provides advice on how to improve it.