---
layout: post
title:  "Getting and Showing Text in Elm"
date:   2017-08-28 12:00

image: /assets/implementing-text-proofreading-part-3-hero.jpg
series: "Implementing text proofreading with Elm"
tags: [elm, functional programming]
---

In this post, we'll implement text input. Users will enter a text and we'll show the same text back to them in a separate pane. Later, this pane will be used to show proofread suggestions.

The source code for this post is available in the [`03-entering-and-showing-text`](https://github.com/dmitryrogozhny/elm-proofreading/tree/master/03-entering-and-showing-text) folder in the [elm-proofreading](https://github.com/dmitryrogozhny/elm-proofreading/) repository.

## Entering Text
We'll start by updating the model. I added `text` of type `String`, that will store the input text.
{% highlight haskell %}
-- MODEL
type alias Model =
    { text : String
    }
{% endhighlight %}

Also let's add a message that will occur when a user hits a keyboard.
{% highlight haskell %}
type Msg
    = SetText String
{% endhighlight %}

Now for the view part. Instead of `"Hello, World!"` text, I'll add [`textarea`](http://package.elm-lang.org/packages/elm-lang/html/2.0.0/Html#textarea) control. The signature of this function is the same with other basic HTML controls. This is a function that gets two parameters: a list of attributes and a list of children controls.

For `textarea` I specify two attributes:
- `onInput` attribute specifies which message should occur when user types in a text;
- `value` attribute gets the value to show in the control.

The `view` function now looks like this:
{% highlight haskell %}
view : Model -> Html.Html Msg
view model =
    div []
        [ textarea [ onInput SetText, value model.text ] []
        ]
{% endhighlight %}

The last step is to process the message in the `update` function. The function will be called when a user types in text. We need to process the message and return a new model. We've got only one message and it will contain the new text value, which we use to update the `text` field in our model. Here's the new `update` function:

{% highlight haskell %}
update : Msg -> Model -> Model
update msg model =
    case msg of
        SetText text ->
            { model | text = text }
{% endhighlight %}

Now if we'll run `elm-reactor` and navigate to our page, we'll see the input area where we can type in text.
![textarea](/assets/implementing-text-proofreading-with-elm-textarea.png)

Nothing fancy, but we're making progress!

## Showing Text

The last thing for today is to show typed in text in a separate pane. Let's update our `view` function for that. I'll add a `div`    which will have text as a child:
{% highlight haskell %}
view : Model -> Html.Html Msg
view model =
    div []
        [ textarea [ onInput SetText, value model.text ] []
        , div
            []
            [ text model.text ]
        ]
{% endhighlight %}

It works, but there's one problem---lines won't break in the div by default:
![textarea and div](/assets/implementing-text-proofreading-with-elm-textarea-and-div.png)


Fear not, as CSS is to the rescue in the next post.
