---
layout: post
title:  Adding Disqus to Jekyll Site
date:   2017-07-10 12:00

published: true

tags: [jekyll, disqus]
---

After [adding Google Analytics]({{ site.baseurl }}{% post_url 2017-07-07-adding-google-analytics-to-jekyll-site %}) to the site, I've decided to add an ability to comment posts.

This is another standard task for Jekyll. I've selected [Disqus](https://disqus.com/) as the commenting platform. If you are looking for alternatives, I recommend you to check implementation for [comments providers](https://github.com/plusjade/jekyll-bootstrap/tree/master/_includes/JB/comments-providers) from the [jekyll-bootstrap](https://github.com/plusjade/jekyll-bootstrap) project.

The implementation for Disqus is available in the [standard minima theme](https://github.com/jekyll/minima/blob/master/_includes/disqus_comments.html). My implementation adds checks for required parameters and renders HTML warnings if commenting won't be available.

The [`disqus.html`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_includes/disqus.html) include requires `disqus.shortname` variable in the `_config.yml` file. This is a shortname of the site you'll get after registering your site in Disqus. I've added the include to the `post.html` layout along with `comments: true` variable in the layout's header, so commenting is available for all blog posts by default. To disable comments on a particular post, I can specify `comments: false` value in the post's YAML header.

The bits I've added to the `post.html` layout:
{% highlight html %}
{% raw %}
---
...
comments: true
---

<article class="post">
    ...

    <br/>
    {% include disqus.html %}
</article>

{% endraw %}
{% endhighlight %}


And here's the code for the [`disqus.html`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_includes/disqus.html) include:
{% highlight html %}
{% raw %}

<!-- Disqus comments -->
{% if site.disqus.shortname %}
    {% if jekyll.environment == "production" %}
        {% if page.comments != false %}
            <div id="disqus_thread"></div>
            <script>
                var disqus_config = function () {
                    this.page.url = "{{ site.url }}{{ page.url }}";
                    this.page.identifier = "{{ site.url }}{{ page.url }}";
                };

                (function() {
                    var d = document, s = d.createElement('script');
                    s.src = 'https://{{ site.disqus.shortname }}.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', +new Date());
                    (d.head || d.body).appendChild(s);
                })();
            </script>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
        {% else %}
            <!-- Comments are disabled for this post. -->    
        {% endif %}
    {% else %}
        <!-- jekyll.environment variable is "{{ jekyll.environment }}" and not "production", Disqus snippet will be skipped. -->
    {% endif %}

    {% else %}
        <!-- Please specify disqus.shortname variable in the _config.yml to enable Disqus comments -->
{% endif %}
<!-- End Disquss comments -->

{% endraw %}
{% endhighlight %}
