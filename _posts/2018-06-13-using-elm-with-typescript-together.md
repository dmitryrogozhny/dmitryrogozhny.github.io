---
layout: post
title:  Using Elm and TypeScript Together
date:   2018-06-13 12:00

image: "/assets/using-elm-and-typescript-together-hero.png"

tags: [elm, functional programming, typescript, javascript]
---

This post is about using TypeScript and Elm together in a project.

I'll be using the Microsoft Word Add-in from [Glvrd Add-in for Microsoft Word]({{ site.baseurl }}{% post_url 2018-06-06-glvrd-addin-for-word %}) as an example. The code is available in the [glvrd-addin-2](https://github.com/dmitryrogozhny/glvrd-addin-2/) GitHub repository.

The Elm framework provides `ports` that allow to communicate with a JavaScript code. You can use them when you need a functionality that is not available in Elm but is presented in JavaScript. This way you can save your time and use JS libraries instead of writing your own in pure Elm.

I'll concentrate mostly on the TypeScript's side of the project. The Elm part would not differ from the communication with a vanilla JavaScript.

Check [the introduction to ports](https://guide.elm-lang.org/interop/javascript.html) from the official Elm guide if you are new to ports. [Sending Data to JavaScript](http://elmprogramming.com/sending-data-to-javascript.html) and [Receiving Data from JavaScript](http://elmprogramming.com/receiving-data-from-javascript.html) articles are a great source of information about Elm ports as well.

## The TypeScript part

The TypeScript part of the solution serves the following goals:
1. __Bootstrapping the Elm application__.
2. __Working with Elm ports__. The TypeScript part acts as a proxy between the Elm application and external APIs In my case---Microsoft Word and Glvrd, an external proofreading service.
3. __Including Elm files into the bundle__. Referencing the Elm application main file, so it would be included in the single production bundle.

The logic related to Elm is defined in the [ElmApp.ts](https://github.com/dmitryrogozhny/glvrd-addin-2/blob/master/src/ElmApp.ts) file.

### 1. Bootstrapping the Elm application

The [ElmApp.ts](https://github.com/dmitryrogozhny/glvrd-addin-2/blob/master/src/ElmApp.ts) file contains the `startApplication` function that starts the Elm application:

{% highlight typescript %}
export const startApplication: (parameters : IAppParameters) => GlvrdApp = (parameters) => {
    return Elm.Main.fullscreen(parameters);
};
{% endhighlight %}

The function is called once the Office Add-in is initialized.

### 2. Working with Elm ports

For each port and the Elm application itself there is a type declaration which allows controlling the data that goes into or comes out of the Elm application:

{% highlight typescript %}

export interface IAppParameters {
    language: string;
}

export interface IJstoElmPort<T> {
    send: (params: T) => void;
}

export interface IElmToJsPort<T> {
    subscribe: (callback: T) => void;
}

export type GlvrdApp = {
    ports: {
        suggestions: IJstoElmPort<IProofreadResult>;
        externalError: IJstoElmPort<string>;
        check: IElmToJsPort<(text: string) => void>;
        textChanged: IJstoElmPort<string>;
    };
};

{% endhighlight %}

The [Index.ts](https://github.com/dmitryrogozhny/glvrd-addin-2/blob/master/src/Index.ts) file contains the actual calls to ports using `send` and `subscribe` functions of ports.

### 3. Including Elm files into the bundle

The [ElmApp.ts](https://github.com/dmitryrogozhny/glvrd-addin-2/blob/master/src/ElmApp.ts) references the main Elm application file `Main.elm`:

{% highlight typescript %}import * as Elm from "./app/Main.elm";{% endhighlight %}

This allows the webpack to add the Elm code to the final bundle during the build. It is done by the [elm-webpack-loader](https://github.com/elm-community/elm-webpack-loader) loader. The [webpack.common.js](https://github.com/dmitryrogozhny/glvrd-addin-2/blob/master/config/webpack.common.js) contains the configuration for the loader:

{% highlight javascript %}

module.exports = {
    ...

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".elm"]
    },

    ...

    module: {
        rules: [
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                loader: "elm-webpack-loader",
            }
            ...
        ]
    },
    ...
};

{% endhighlight %}

## The Elm part

I've got one outgoing port `check` (asks JavaScript to perform a proofread), and three incoming ports: `suggestions` (receives results of a proofread), `textChanged` (notifies that the selected text has changed and provides the new text), and `externalError` (notifies about errors that happened on the JavaScript side).

All the ports logic is defined in the [Main.elm](https://github.com/dmitryrogozhny/glvrd-addin-2/blob/master/src/app/Main.elm) file.

Here's all the code related to ports:

{% highlight haskell %}
port module Main exposing (..)

...

-- PORTS

port check : String -> Cmd msg

port suggestions : (ProofreadResult -> msg) -> Sub msg

port textChanged : (String -> msg) -> Sub msg

port externalError : (String -> msg) -> Sub msg

...

-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ suggestions Suggest
        , textChanged TextChanged
        , externalError Error
        ]

...

-- UPDATE


type Msg
    = Suggest ProofreadResult
    | TextChanged String
    | Error String
    | SetActiveComment String
    | ResetActiveComment


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        TextChanged newText ->
            case newText of
                "" ->
                    ( { model | selectedText = newText, proofreadResult = RemoteData.NotAsked }, Cmd.none )

                _ ->
                    ( { model | selectedText = newText, proofreadResult = RemoteData.Loading }, check newText )

        Suggest suggestion ->
            ( { model | proofreadResult = RemoteData.Success suggestion }, Cmd.none )

        Error error ->
            ( { model | proofreadResult = RemoteData.Failure error }, Cmd.none )

...

{% endhighlight %}

### Scaling ports in Elm
I've defined ports in the main logic file, and I've got a separate port for each action. This is a simple approach, but it doesn't scale well.

__If you've got a lot of ports__, you might want to move them to a separate file for a better control. Also, you may consider using only two ports---one for all incoming messages and one for all outgoing.

Check [The Importance of Ports](https://www.youtube.com/watch?v=P3pL85n9_5s) talk by Murphy Randle for details.

__If your ports operate with complex data__, you might want to decode the data coming from JavaScript by yourselves. By default, Elm decodes data automatically, and will fail silently if a conversion cannot be performed between JavaScript and Elm types. A manual decoding allows controlling this process.

[Protecting Boundaries between Elm and JavaScript](http://elmprogramming.com/protecting-boundaries.html) describes this approach in details.
