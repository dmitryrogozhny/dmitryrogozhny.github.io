---
layout: post
title:  "Using elm-format in Visual Studio Code"
date:   2017-09-06 12:00

image: /assets/elm-format-in-vs-code-hero.png
tags: [elm, functional programming]
---

The [`elm-format`](https://github.com/avh4/elm-format) is a great tool that formats your Elm code. It makes code easier to read by forcing the same formatting rules for all Elm developers. The rules are defined by the official [Elm Style Guide](http://elm-lang.org/docs/style-guide).

In this post, I will show how to integrate the `elm-format` with the Visual Studio Code.

Here's an example of how `elm-format` changes formatting of the code:
![elm-format example](/assets/elm-format.gif)

You can integrate it with your code editor or run it separately. It supports popular [code editors](https://github.com/avh4/elm-format#editor-integration), so go on and check for the editor of your choice.

## Integrating `elm-format` with Visual Studio Code
If you are using the Visual Studio Code as an editor, you need to install [elm extension](https://marketplace.visualstudio.com/items?itemName=sbrink.elm) from the marketplace. It adds Elm syntax support and it supports `elm-format`.

I recommend to automatically format your Elm code on saving, so you'd never need to manually format it.

To automatically format code on each file save, you can add the following line to the settings:
{% highlight json %}
{
    "elm.formatOnSave": true
}
{% endhighlight %}

Settings can be accessed via menu `File`&#8201;`->`&#8201;`Preferences`&#8201;`->`&#8201;`Settings`. You can add this setting globally or to a current workspace.

## Using `elm-format` Separately
You can install `elm-format` as the `npm` package:
{% highlight bash %}
npm install -g elm-format
{% endhighlight %}

Here are examples of running it with various options:
{% highlight bash %}
elm-format Main.elm  # Format a single file
elm-format Main.elm --yes  # Overwrite the file without prompting
elm-format src/  # Format all *.elm files in a directory
elm-format --stdin  # Format input from stdin and write to stdout
elm-format --stdin --output Main.elm  # Format input from stdin and write to file
elm-format --help  # See other command line options
{% endhighlight %}

This might be useful if you've got a team working on an Elm project. You can add `elm-format` to your project building pipeline to ensure a uniform formatting.
