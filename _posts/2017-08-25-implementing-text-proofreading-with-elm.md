---
layout: post
title:  "Implementing Simple Text Proofreading with Elm"
date:   2017-08-25 12:00

image: /assets/implementing-text-proofreading-part-1-hero.jpg
tags: [elm, functional programming]
---

I want to show you an example of how development with Elm looks like. This will be a simple text proofreading tool. It will analyze text and provide suggestions on how to make it better.

[Elm](http://elm-lang.org/) is the functional programming language that compiles to JavaScript. It helps you to build web apps.

We will be using [LanguageTool](https://languagetool.org/) as a proofreading service.

As this is a series for beginners in Elm, I'll try to keep it simple. For this reason, we'll stick to simple web elements and won't implement a complex text editor. This will allow us to concentrate on the Elm essentials.

The source code for this post is available in the [`01-hello-world`](https://github.com/dmitryrogozhny/elm-proofreading/tree/master/01-hello-world) folder in the [elm-proofreading](https://github.com/dmitryrogozhny/elm-proofreading) repository.

## What You Need to Know Before We Start
Before you start reading I recommend you to take a look at the [official introduction guide](https://guide.elm-lang.org/) for Elm. This guide will present you with a basic syntax of the language, main data types, and Elm architecture.

## Setting Up Environment
Here are the steps you need to start working with Elm:
1. [Install Elm](https://guide.elm-lang.org/install.html) (the current version is 0.18).
2. Have a code editor of your choice. I prefer [Visual Studio Code](https://code.visualstudio.com/) that has got Elm support with [elm extension](https://marketplace.visualstudio.com/items?itemName=sbrink.elm).

If you want to play with Elm without installing it locally, you can try online editors: [Elm online editor](http://elm-lang.org/try) or [Ellie](https://ellie-app.com/).

## Creating `Hello, World!` App
Good. Now we are ready to start writing code. Let's create a new file [`Main.elm`](https://github.com/dmitryrogozhny/elm-proofreading/blob/master/01-hello-world/Main.elm), and add the following code to it:
{% highlight haskell %}
import Html exposing (div, text)

main =
    div [] [ text "Hello, World!" ]
{% endhighlight %}

Before looking at the code, let's run our program.

## Running Elm Program
In a command line run the `elm-reactor` tool, which builds your project and starts a local server at [http://localhost:8000](http://localhost:8000). If you'll open the link, you'll see the content of the folder:
![elm-reactor interface](/assets/implementing-text-proofreading-with-elm-reactor.png)

Note that `elm-reactor` created a new file for us---`elm-package.json`. It contains information about our program, such as version, description, license, and dependencies. The `elm-reactor` automatically added packages we needed to run our program as well.

Click on the [`01-hello-world`](http://localhost:8000/01-hello-world/) link to view the folder content. Click on the [`Main.elm`](http://localhost:8000/01-hello-world/Main.elm) and you should see our program which is a "Hello, World!" message.

![hello, world!](/assets/implementing-text-proofreading-with-elm-hello-world.png)

## Structure of Main.elm
Let's look at the code in `Main.elm` file.

The `import` statement declares an import from the `Html` package. We will be using `div` and `text` functions.
{% highlight haskell %}
import Html exposing (div, text)
{% endhighlight %}

With the second line, we are calling the `div` function passing it the text we want to show. Note that the `div` function does not return an actual HTML code, but some data. Elm takes care of rendering HTML code for you.
{% highlight haskell %}
main =
    div [] [ text "Hello, World!" ]
{% endhighlight %}


If the description above is not clear, I suggest you check the [Elm architecture overview](https://guide.elm-lang.org/architecture/) that covers all these parts in more details.

In next post, we'll take a look at the Elm architecture. Stay tuned!
