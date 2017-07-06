---
layout: post
title:  Structure of My Site
date:   2017-07-06 12:00

published: true

tags: [personal site, jekyll]
---

Each Jekyll project follows the same structure which makes it easy to review and modify. I want to share the structure of the first version of my site.

If you are interested in some feature from this site, the post will help you to locate the right place in the project. This might be useful if you are planning to implement a site with Jekyll.

The version I describe is available as the [v1.0 release](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io/releases/tag/v1.0). The up to date version of the site's code is available in the [repository](https://github.com/dmitryrogozhny/dmitryrogozhny.github.io) on GitHub.

I assume that you already have got some basic understanding of Jekyll's [project structure](https://jekyllrb.com/docs/structure/). 

**_data** folder contains `menu.yml` file that describes the items to show in the top menu.

**_includes** folder contains pages' parts and reusable components:
- `header.html` and `footer.html` contain HTML code for header and footer.
- `menu.html` renders the top menu. It uses `menu.yml` file from the **_data** folder as the data source.
- `posts-list.html` renders the list of recent posts on the home and blog pages.

**_layouts** folder contains the layouts used on the site:
- `default.html` is the base layout used by all pages.
- `home.html` is the layout used by the home page.
- `page.html` layout is used by pages.
- `post.html` is a layout for blog posts.

**_posts** folder contains blog posts.

**_sass** folder contains all the site's styles separated into multiple files. All this files got imported by the `main.css` file from the **css** folder. This way the end up in the final site.
- `animations.scss` provides animations for the site.
- `blog.scss` styles used on the blog pages.
- `breakpoints.scss` defines breakpoints for the site to be used in media queries.
- `layout.scss` defines styles for layouts.
- `menu.scss` styles for the top menu used by `menu.html` include.
- `posts-list.scss` styles for the list of posts used by `posts-list.html` include.
- `typography.scss` defines fonts, colors, and other settings for site text, headers, titles.

**assets** folder contains images used on the site.

**css** folder contains the `main.scss` file that imports all the rest of style files.

In the root folder there is a `_config.yml` config file and files for main pages of the site.

That's is for the structure of the first version. I expect it to grow with time, but for now it's quite compact and easy to read.