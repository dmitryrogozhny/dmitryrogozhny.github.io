---
layout: post
title:  Adding Previous and Next Post Navigation
date:   2017-07-11 12:00

tags: [jekyll]
---

In this post, I'll show how to add links to a previous and next posts. This makes it easier to navigate between posts back and forth.

The final result looks like this:
![previous and next post links]({{ site.baseurl }}\assets\adding-previous-next-post-links.png)

The code for the previous and next post links can be found in the [`previous-next-post-links.html`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_includes/previous-next-post-links.html) include. The implementation looks like the following:
{% highlight html %}
{% raw %}
<div class="previous-next-post-links">
    <div>
        {% if page.previous != nil %}
            <a class="arrow arrow__left" href="{{ site.baseurl }}{{ page.previous.url }}">{{ page.previous.title }}</a>
        {% endif %}
    </div>

    <div>
        {% if page.next != nil %}
            <a class="arrow arrow__right" href="{{ site.baseurl }}{{ page.next.url }}">{{ page.next.title }}</a>
        {% endif %}
    </div>
</div>
{% endraw %}
{% endhighlight %}

It uses `page.next` and `page.previous` variables to render links. If a next or previous post is not available, the value will be `nil`.

The include is added to the [`post.html`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_layouts/post.html) layout, so these links will be rendered for every blog post.

CSS styles for links are defined in [`previous-next-post-links.scss`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_sass/components/previous-next-post-links.scss).