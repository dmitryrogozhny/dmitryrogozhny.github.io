---
layout: post
title:  How to Add Custom Script to Single Post in Jekyll
date:   2017-08-02 12:00

series: Adding Anything to Jekyll
tags: [jekyll]

image: /assets/how-to-add-custom-script-header.png

custom-javascript-list:
    - "https://code.jquery.com/jquery-3.2.1.min.js"

custom-css-list:
     - "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
---

Here's how I've implemented the ability to add JavaScript and CSS files to specific posts in Jekyll.

What I want:
- Embed a simple JavaScript and CSS demos directly in a post.
- Be able to add multiple JavaScript and CSS files.
- All scripts should be added to the `<HEAD>` tag.
- No need for dependencies between scripts during loading.

## Implementation Details

Include file [`custom-scripts.html`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_includes/custom-scripts.html) contains all the logic for the rendering:
{% highlight html %}
{% raw %}
{% for javascript in page.custom-javascript-list %}
    <script src="{{ javascript }}"></script>
{% endfor %}

{% for css in page.custom-css-list %}
    <link href="{{ css }}" rel="stylesheet">
{% endfor %}
{% endraw %}
{% endhighlight %}

This include expects two page variables `custom-javascript-list` and `custom-css-list` and renders tags for each value in these lists.

The call to this include is added to the [`head.html`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_includes/head.html) which renders the content of the `<HEAD>` tag.

## Usage Example

To test new functionality I added [animate.css](https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css) for animation effects and [jQuery](http://code.jquery.com/jquery-3.2.1.min.js) to this page. Try clicking on the label below (hint: it should bounce):
<div id="demo1" style="width: 80%; text-align: center; cursor: pointer;">
    <h4 style="color: #b4009e;">
        Click Me!
    </h4>
</div>

<script>
    $("#demo1").click(function() {
        $(this).addClass("rubberBand animated");

        setTimeout( function(){
            $("#demo1").removeClass("rubberBand animated");
        }, 1000);
    });
</script>

And here is how it's implemented. For the current post, the front matter header contains links to files on CDN:
{% highlight html %}
{% raw %}

custom-javascript-list:
    - "https://code.jquery.com/jquery-3.2.1.min.js"

custom-css-list:
     - "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"

{% endraw %}
{% endhighlight %}

During processing this will be rendered into the following lines:
{% highlight html %}

<script src="http://code.jquery.com/jquery-3.2.1.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" rel="stylesheet">
{% endhighlight %}

Now I can reference jQuery and animate.css functionality. Jekyll allows to use HTML and JavaScript code directly in markdown files.

Below is the code for the "Click Me!" label added directly to this post. The `jQuery` code gets element by its id and sets the animate.css class to bounce (inline CSS styles are omitted for brevity). After a second the CSS classes got removed, so they can be applied again:

{% highlight html %}

<div id="demo1">
    <h4>
        Click Me!
    </h4>
</div>

<script>
    $("#demo1").click(function() {
        $(this).addClass("rubberBand animated");

        setTimeout( function(){
            $("#demo1").removeClass("rubberBand animated");
        }, 1000);
    });
</script>

{% endhighlight %}


## Alternative Solutions

If you've got requirements that make this approach not feasible, here are two more options that you can use:
1. **Create a new page**. Create a new page, not post, and define all the HTML in it, including custom JavaScript and CSS references. This makes editing text harder because you'll need to control the layout yourself, but gives you flexibility.
2. **Use external sites** such as [JSFiddle](https://jsfiddle.net/) or [CodePen](https://codepen.io/) to run your JavaScript and CSS code.
