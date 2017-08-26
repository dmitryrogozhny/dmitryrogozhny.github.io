---
layout: post
title:  "Basic Elm App Structure"
date:   2017-08-26 12:00

image: /assets/implementing-text-proofreading-part-2-hero.jpg
series: "Implementing text proofreading with Elm"
tags: [elm, functional programming]
---

This time we will take a look at Elm architecture. We need to understand its parts before moving to an implementation of our logic.

Before moving on, please make sure that you've read the [previous post]({{ site.baseurl }}{% post_url 2017-08-25-implementing-text-proofreading-with-elm %}) and an [introduction to the Elm Architecture](https://guide.elm-lang.org/architecture/) in the Elm guide.

The source code for this post is available in the [`02-beginner-program`](https://github.com/dmitryrogozhny/elm-proofreading/tree/master/02-beginner-program) folder in the [elm-proofreading](https://github.com/dmitryrogozhny/elm-proofreading) repository.

## Elm Beginner Program
Here's the code for today from the [`Main.elm`](https://github.com/dmitryrogozhny/elm-proofreading/blob/master/02-beginner-program/Main.elm) file:
{% highlight haskell %}
import Html exposing (div, text, beginnerProgram)

main = beginnerProgram { model = Model, view = view, update = update }

-- MODEL
type alias Model = {}

-- UPDATE
type Msg = None


update msg model =
    case msg of
        None ->
            model


-- VIEW
view model =
    div [] [ text "Hello, World!" ]
{% endhighlight %}

## Running Elm Program
In a command line run the `elm-reactor`, which builds your project and starts a local server at [http://localhost:8000](http://localhost:8000).

Navigate to the [`02-beginner-program`](http://localhost:8000/02-beginner-program/) and start the [`Main.elm`](http://localhost:8000/02-beginner-program/Main.elm) file.

The output would be the same as with previous version:
![hello, world!](/assets/implementing-text-proofreading-with-elm-hello-world.png)

The important difference is that now our program can interact with users. We will get to this in the next post, and now let's take a look at the new code.

## Structure of Main.elm
First, we define a `Model`. Right now, it does not contain any data and it is an alias for an empty record.
{% highlight haskell %}
-- MODEL
type alias Model = {}
{% endhighlight %}

The `update` function should check incoming messages and update a model according to a message. As we don't have any messages yet, `update` function will not be called. The current implementation just returns the same model.
{% highlight haskell %}
type Msg = None

-- UPDATE
update msg model =
    case msg of
        None ->
            model
{% endhighlight %}

The `view` function returns the `div` with a "Hello, World!" text in it. Note that `div` is not an actual HTML code, but an object with some data. Elm takes care of rendering HTML code for you.
{% highlight haskell %}
-- VIEW
view model =
    div [] [ text "Hello, World!" ]
{% endhighlight %}

The `Html.beginnerProgram` binds all the parts together, and describes how the whole app works. We need to pass it our `Model`, `view`, and `update`.
{% highlight haskell %}
main = Html.beginnerProgram { model = Model, view = view, update = update }
{% endhighlight %}

Now our program is ready to interact with users.

Next time we'll implement text input and showing it back to users.
