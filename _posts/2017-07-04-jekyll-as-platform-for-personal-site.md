---
layout: post
title:  Jekyll as Platform for Personal Site
date:   2017-07-04 12:00

published: true

tags: [personal site, jekyll]
---

I want to explain why I've selected [Jekyll](https://jekyllrb.com/) as the platform for my personal site. I assume that you have a basic understanding of static site generators and Jekyll in particular.

This choice is based on a list of [goals and priorities]({{ site.baseurl }}{% post_url 2017-06-30-my-goals-for-personal-site %}) that I've specified for my personal site. Jekyll and static site generators might not be an optimal solution for you as the choice depends on your own goals. So, you might also find useful a review of [alternative options]({{ site.baseurl }}{% post_url 2017-06-30-options-for-personal-sites-platform %}) of platforms for a personal site.

## Advantages of Jekyll
Jekyll is a static site generator, which means that you create your site pages as HTML or Markdown files. When you run Jekyll locally or with an external provider such as [GitHub Pages](https://pages.github.com/) or [netlify](https://www.netlify.com), the output would be a set of static HTML, CSS, JavaScript, and asset files. After that, you can upload these files to a hosting of your choice and they will become available for site’s visitors. Once you add new pages or modify existing ones, you need to re-run Jekyll generator to get the updated set of static files. Jekyll provides additional features targeting blogging, such as automatic posts naming, posts referencing, tags and categories.

Advantages of the Jekyll for me are:
1.	**Flexibility**---I can modify any aspect of the site in any way. This can be done with built-in functionality. If a new feature would be needed, I can add it with Jekyll's plugins architecture. At the same time, the typical page creation is a straightforward process.
2.	**Great community**---Jekyll is an open source project with a great community support. There's a lot of information in blogs, forums, and in Slack.
3.	**Simple hosting**---final site is a set of static files, so all it needs is a simple hosting. No database, no complex web server configuration.

## Drawbacks of Jekyll
Cons that I keep in mind:
1.	**Small marketplace**---the amount and quality of components and themes available for Jekyll are lower comparing with large platforms, such as Wordpress.
2.	**Requires Ruby**---Jekyll is implemented in Ruby and requires it to run locally. All the customization with plugins is done in Ruby as well.
3.	**No built-in social features**---there are no social features built in, such as comments, likes/shares buttons. That makes it harder for your audience to find your site in the first place. You need to think about visibility in search engines and share links to your site via social networks.

Here's a number of site templates available for different platforms on [ThemeForest.com](https://themeforest.net/category/all). Compare a number of WordPress and Jekyll templates.
![themeforest themes]({{site.baseurl}}\assets\jekyll-themes-on-themeforest.png)

These drawbacks won’t be a huge problem for me, as I plan to start small and implement the site design by myself. I don’t plan any customizations to Jekyll so I won’t need to learn Ruby syntax.

These pros and cons make Jekyll a good choice as a platform for a personal site for software developers, designers, and everyone else comfortable working with HTML, Markdown, and CSS. It won’t be an optimal choice if you’re looking for more UI-friendly approach with less or no coding required.


Next step would be to setup my local environment and configure hosting.