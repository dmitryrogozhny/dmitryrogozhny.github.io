---
layout: post
title:  How to Parse Html Pages with Node and cheerio
date:   2018-05-16 12:00

image: "/assets/how-to-parse-html-pages-with-nodejs-and-cheerio-hero.png"

tags: [node, javascript, cheerio, superagent]
---

In this post I'll show a quick example of how to parse the HTML content using Node and [cheerio](https://cheerio.js.org/). Cheerio is the jQuery implementation for the server. So if you know jQuery (and I assume that you do), you will find cheerio easy to use.

To get the HTML content of the page I'll use the [superagent](https://github.com/visionmedia/superagent), which is a simple HTTP request module.

For the demo I'll get the home page of the [cheerio site](https://cheerio.js.org/), and then will find all the `h2` headers.

Here's the complete code for the demo:

{% highlight javascript %}

import cheerio from "cheerio";
import superagent from "superagent";

superagent.get("https://cheerio.js.org/").then(page => page.text).then(getHeaders).then(console.log);

function getHeaders(text) {
    const headers = [];
    const html = cheerio.load(text);

    html("h2").each((index, element) => {
        headers.push(element.firstChild.nodeValue);
    });

    return headers;
}

{% endhighlight %}

The third line binds everything together. First, we request the page using the superagent, then get the HTML content of the page from the response, then we extract `h2` headers, and then print them to the console.

The `getHeaders` function returns all `h2` headers from the HTML passed to it.

### Parsing a content of a page

The parsing logic that uses cheerio is in the `getHeaders` function. First, we need to init the cheerio with the HTML we'd like to parse. This is done using the `load` function. After that we can use the returned object in the same way as we use `$` in jQuery. We can apply selectors and navigate our HTML model.

For the demo sake I'm getting all the `h2` headers.

[Cheerio site](https://cheerio.js.org/) provides a great overview of available features and provides more examples.
