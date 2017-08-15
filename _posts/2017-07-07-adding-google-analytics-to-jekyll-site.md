---
layout: post
title:  Adding Google Analytics to Jekyll Site
date:   2017-07-07 12:00

published: true

series: Adding Anything to Jekyll
tags: [jekyll, google analytics]
---

Adding Google Analytics to your Jekyll site is a "Hello, world" excercise.

If you don't bother about the manual implementation, [minima](https://github.com/jekyll/minima), which is a default theme for new Jekyll sites, already contains this integration. The [include for Google Analytics](https://github.com/jekyll/minima/blob/master/_includes/google-analytics.html) is added to the `default.html` layout and thus applies to all site's pages. To enable it, you need to add `google_analytics` variable in your `_config.yml` file, and specify your [Google Tracking ID](https://support.google.com/analytics/answer/1008080).

You might want to read further to find out how my implementation compares to the standard one. You can check the complete code in [the repository](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_includes/google-analytics.html).

## Implementing Google Analytics Integration

Google Tracking code is specified in the [`_config.yml`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_config.yml) file in the `google_analytics` variable. It is used later by the include.

As I want to track visits to all pages, [`default.html`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_layouts/default.html) layout is a good place to add the integration script. This is done by adding the [`google-analytics.html`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_includes/google-analytics.html) include inside the `<head>` tag:

{% highlight html %}
{% raw %}
<!DOCTYPE html>
<html lang="en">
<head>
    ...

    {% include google-analytics.html %}

    ...
</head>
{% endraw %}
{% endhighlight %}

The **`google-analytics.html`** contains a description on how to use the include and what are expected parameters. Description is done with a liquid `comment` tag, so it does not affect the final HTML.

Here's the code for the include:
{% highlight html %}
{% raw %}
{% if site.google_analytics %}

    {% if jekyll.environment == "production" %}
        <script>
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

            ga("create", "{{ site.google_analytics }}", "auto");
            ga("send", "pageview");
        </script>
        <script async src="https://www.google-analytics.com/analytics.js"></script>
    {% else %}
        <!-- jekyll.environment variable is "{{ jekyll.environment }}" and not "production", Google Analytics snippet will be skipped. -->
    {% endif %}

{% else %}
    <!-- Please specify google_analytics variable in the _config.yml to enable Google Analytics -->
{% endif %}
{% endraw %}
{% endhighlight %}

There are two checks in the include that control the rendering. First one checks for the `google_analytics` variable in the `_config.yml`. If it's not defined, final pages will contain HTML comment about it, and the script for integration will be skipped.

Second check is for the Jekyll environment. Integration script is rendered only when `jekyll.environment` variable is equal to "production". Otherwise, the HTML comment with a warning will be rendered.

If your site is hosted and rendered by GitHub Pages, "production" value will be used by GitHub during the rendering, so you don't have to do anything.

When working with Jekyll locally, this value can be set when [running Jekyll build](https://jekyllrb.com/docs/configuration/#specifying-a-jekyll-environment-at-build-time). By default, local Jekyll will have `jekyll.environment` equal to "development".

Adding these checks makes the rendering process more transparent. I can always check the source of a page, and define whether all my configuration is in the right place.

The JavaScript tracking snippet is the standard one [provided by Google Analytics team](https://developers.google.com/analytics/devguides/collection/analyticsjs/).