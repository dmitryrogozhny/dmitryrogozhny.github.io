---
layout: post
title:  Adding Social Networks Buttons to Jekyll Site
date:   2017-10-09 12:00

image: "/assets/adding-social-buttons-to-jekyll-hero.png"

series: Adding Anything to Jekyll
tags: [jekyll, personal site]
---

Here's how I've added buttons for social networks to the site. Now there are several buttons at the bottom of each post that allows to share the infromation.

## Buttons Design
Here's how the final result looks like:
![social networks buttons]({{ site.url }}/assets/adding-social-buttons-to-jekyll-final.png)

The buttons follow the color scheme of the site and do not distract from the content. Icons of networks are self-explanatory and do not require additional highlighting. I've added an animation on hover as a hint that you can interact with buttons:
![social networks buttons on hover]({{ site.url }}/assets/adding-social-buttons-to-jekyll-onhover.gif)

All the icons are stored as SVG files in the [`_includes\social-buttons`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/tree/master/_includes/social-buttons) folder.

The CSS styles for buttons are defined in the [_sass\components\social-buttons.scss](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_sass/components/social-buttons.scss) file.

If you want to add social networks sharing buttons to your site, I recommend to look at existing solutions that provide a unified look for all icons. A manual implementation might be a valid choice as well.

I don't recommend using standard buttons provided by social networks, as their unified look is messed up. With the same size of a button, you'll get different font family, font size, color, and even a radius of button corners:
![social networks buttons]({{ site.url }}/assets/adding-social-buttons-to-jekyll-standard.png)

## Configuring Available Buttons
I've created the [`social-buttons.html`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_includes/social-buttons.html) include to render buttons. This include users the [`_data/social-buttons.yml`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_data/social-buttons.yml) file that contains the configuration for each button.

Here's the configuration for the LinkedIn:
{% highlight yml %}
- title: linkedin
  verb: Share
  svg: linkedin.svg
  url: https://www.linkedin.com/shareArticle?mini=true&title=<title>&url=<url>
{% endhighlight %}

The `title` field value is rendered as the class name for the button HTML code. This way it is possible to define custom styling for each button. For example, for the LinkedIn button there will be the following CSS classes defined: `social-button js-social-buttons linkedin`.

The `verb` will be shown as text next to the button icon. The `svg` defines the name of the svg file with the icon. The `url` is a placeholder for a sharing URL. Placeholders `<title>`, `<url>`, and `<twitter>` are replaced with actual values for a post.

## Showing Sharing Screen in New Window
For a button configuration in the [`_data/social-buttons.yml`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/_data/social-buttons.yml) file it is possible to specify whether a sharing screen should be opened in a popup  window or in a new window. This is defined with the `noPopup` parameter for each button (by default it is `false`, and will open in a popup window).

The popup in a dialog is added by the logic in the [`js/main.js`](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/blob/master/js/main.js) file. The javaScript function looks for all elements with the `.js-social-buttons` CSS class and adds a click event handler. This CSS class is added for buttons during a post generation.

Right now, all the sharing screens will open in a popup, except for Reddit. Its sharing screen becomes a mess if opened in a dialog, so it opens in a new window instead.
