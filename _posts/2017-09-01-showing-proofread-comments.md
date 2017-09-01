---
layout: post
title:  "Showing Proofread Comments"
date:   2017-09-01 12:00

demoUrl: /lab/elm-proofreading/index.html

image: /assets/implementing-text-proofreading-part-7-hero.jpg
series: "Implementing text proofreading with Elm"
tags: [elm, functional programming]
---

This is the final post in the series! Check the [live demo]({{ site.url }}{{ page.demoUrl }}) of the tool.

This time we will display additional information for comments. On mouse hover or a click we will show a description of a selected comment.
![proofreading in action](/assets/implementing-text-proofreading-with-elm-proofreading-final.gif)

The source code for this post is available in the [`07-showing-proofread-comments`](https://github.com/dmitryrogozhny/elm-proofreading/tree/master/07-showing-proofread-comments) folder in the [elm-proofreading](https://github.com/dmitryrogozhny/elm-proofreading) repository.


## Adding `Sample` `Text` Button
To warm up, I will add a button that will insert a sample text on click. It will be useful for testing purposes.

Go on and check the [code](https://github.com/dmitryrogozhny/elm-proofreading/blob/master/07-showing-proofread-comments/Main.elm#L89) for that. Pay attention to the `Msg` type and added `AddSampleText` message. Also, there's a new button in the `view` function and a new case for `AddSampleText` in the `update` function.

## Processing Hovering and Clicking
We'll start with updating the model to contain the id of the currently selected comment. As it may be empty, our `activeCommentId` will be of [`Maybe`](https://guide.elm-lang.org/error_handling/maybe.html) type:
{% highlight haskell %}
type alias Model =
    { text : String
    , comments : List Message
    , activeCommentId : Maybe Int
    }
{% endhighlight %}

Now, let's update our `Msg` type to contain messages for setting the active comment and resetting it (`SetActiveComment String` and `ResetActiveComment`):
{% highlight haskell %}
type Msg
    =
    ...
    | SetActiveComment String
    | ResetActiveComment
{% endhighlight %}

We'll need to modify our `update` function to process these new messages. The function will either set the passed id of the active comment or reset it in the model. Active id is passed as `String`, while our model stores `Maybe Int` so we need to convert from `String` to `Int`:
{% highlight haskell %}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ...
        SetActiveComment activeCommentIdStr ->
            let
                result =
                    String.toInt activeCommentIdStr
            in
            case result of
                Ok activeCommentId ->
                    ( { model | activeCommentId = Just activeCommentId }, Cmd.none )

                Err _ ->
                    ( model, Cmd.none )

        ResetActiveComment ->
            ( { model | activeCommentId = Nothing }, Cmd.none )
{% endhighlight %}

Tracking hovering events is similar to clicking, which we already have seen. Here's the updated `span` element for a comment, that defines attributes for "`mouseenter`", "`mouseleave`", and "`click`" events. Additionally, we add the "`id`" attribute, so we could later find this comment in a list. For simplicity, I'm using a comment's `offset` as an identifier.
{% highlight haskell %}
span
    [ class "comment"
    , attribute "id" (toString comment.offset)
    , handleOnMouseEnter SetActiveComment
    , handleOnMouseLeave ResetActiveComment
    , handleOnClick SetActiveComment
    ]
    [ text commentText ]
{% endhighlight %}

Functions that create attributes for a comment `span` events are the following:
{% highlight haskell %}
handleOnMouseLeave : msg -> Attribute msg
handleOnMouseLeave msg =
    onMouseLeave msg


handleOnMouseEnter : (String -> msg) -> Attribute msg
handleOnMouseEnter tagger =
    on "mouseenter" (Json.Decode.map tagger targetDataId)


handleOnClick : (String -> msg) -> Attribute msg
handleOnClick tagger =
    on "click" (Json.Decode.map tagger targetDataId)


targetDataId : Decoder String
targetDataId =
    at [ "target", "id" ] string
{% endhighlight %}

## Showing Active Comment
To show the active comment we define an additional function `viewActiveCommentPanel` in our `view` function.

This function checks the `activeCommentId` from the model. If its empty (i.e. `Nothing`), no text is rendered. If an active comment is specified, a comment is retrieved from the list using its `offset` as id. Then the `message` of the comment is shown.

Note the usage of an anonymous function passed to the `List.filter` function along with a comments list. It checks whether the `offset` of a comment is equal to the active one. After that, the result of the `List.filter` function is passed to the `List.head` function (using the `<|` operator). `List.head` function returns `Maybe` type with either the first element in a list or `Nothing` if a list is empty.
{% highlight haskell %}
viewActiveCommentPanel : Maybe Int -> List Message -> Html msg
viewActiveCommentPanel activeComment comments =
    case activeComment of
        Nothing ->
            div [] []

        Just activeCommentId ->
            let
                comment =
                    List.head <| List.filter (\comment -> comment.offset == activeCommentId) comments
            in
            case comment of
                Nothing ->
                    div [] []

                Just comment ->
                    div [ class "comment-description" ] [ text comment.message ]
{% endhighlight %}


That's it! We've implemented a simple proofreading tool in Elm. I hope it was a pleasant and useful journey for you.

If you've got any questions, feel free to ask.
