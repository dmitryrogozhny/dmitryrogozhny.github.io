---
layout: post
title:  "Adding Elm Support to Rouge"
date:   2018-04-09 12:00

image: /assets/adding-elm-lexer-to-rouge-hero.png

tags: [elm, functional programming, jekyll, personal site]
---

[Rouge](http://rouge.jneen.net/) is a code highlighter. It is used by [Jekyll](https://jekyllrb.com) to highlight code blocks in posts. I found out that there was no support for Elm in Rouge.

Here's how I've added the Elm language support to Rouge.

## Adding Elm Lexer
Code highlighting in Rouge is done using lexers. [Supported languages](https://github.com/jneen/rouge/tree/853e0cdb9e9f3121460565ebcaabe9c0616eb968/lib/rouge/lexers) have got corresponding lexers. A lexer is responsible for parsing the code and assigning its parts some meaning. For example, saying that some part of a code is a comment, some is a function or a variable name, some is a constant, etc.

The process of [adding a new lexer](https://github.com/jneen/rouge/wiki/Adding-a-new-lexer) is described in the git repository of the project. Rouge is written in Ruby, but the knowledge of Ruby language is not required. You need to know regular expressions though. I've followed the guide to produce the [following four files](https://github.com/jneen/rouge/commit/853e0cdb9e9f3121460565ebcaabe9c0616eb968):
1. [`lib/rouge/lexers/elm.rb`](https://github.com/jneen/rouge/blob/853e0cdb9e9f3121460565ebcaabe9c0616eb968/lib/rouge/lexers/elm.rb) is the code for the lexer. This is the logic that Rouge will use for processing the Elm code.

2. [`spec/visual/samples/elm`](https://github.com/jneen/rouge/blob/853e0cdb9e9f3121460565ebcaabe9c0616eb968/spec/visual/samples/elm) is an extended example of the code in Elm. I've used the following sources for this file: description of the [Basics Elm package](http://package.elm-lang.org/packages/elm-lang/core/5.1.1/Basics) for basic operators and syntax, [elm-compiler test cases](https://github.com/elm-lang/elm-compiler/tree/0.17.1/tests/test-files) for some edge-case scenarios, and examples from the [Elm syntax guide](http://elm-lang.org/docs/syntax).

3. [`lib/rouge/demos/elm`](https://github.com/jneen/rouge/blob/853e0cdb9e9f3121460565ebcaabe9c0616eb968/lib/rouge/demos/elm) is a "Hello, world!" version of the Elm program.

4. [`spec/lexers/elm_spec.rb`](https://github.com/jneen/rouge/blob/853e0cdb9e9f3121460565ebcaabe9c0616eb968/spec/lexers/elm_spec.rb) is a short description of the lexer.

After a review, the commit with the Elm support has been merged and is now a part of the Rouge.

Here's how the code highlight works:
#### Without highlight

```
    -- Strings and Lists
    "hello" ++ "world" == "helloworld"
    [1,1,2] ++ [3,5,8] == [1,1,2,3,5,8]

    -- Higher-Order Helpers
    leftAligned <| monospace <| fromString "code"
```

#### With Rouge highlight

<pre class="highlight">
    <code><span class="c1">-- Strings and Lists</span>
    <span class="s">"</span><span class="s2">hello"</span> <span class="o">++</span> <span class="s">"</span><span class="s2">world"</span> <span class="o">==</span> <span class="s">"</span><span class="s2">helloworld"</span>
    <span class="p">[</span><span class="mi">1</span><span class="o">,</span><span class="mi">1</span><span class="o">,</span><span class="mi">2</span><span class="p">]</span> <span class="o">++</span> <span class="p">[</span><span class="mi">3</span><span class="o">,</span><span class="mi">5</span><span class="o">,</span><span class="mi">8</span><span class="p">]</span> <span class="o">==</span> <span class="p">[</span><span class="mi">1</span><span class="o">,</span><span class="mi">1</span><span class="o">,</span><span class="mi">2</span><span class="o">,</span><span class="mi">3</span><span class="o">,</span><span class="mi">5</span><span class="o">,</span><span class="mi">8</span><span class="p">]</span>

    <span class="c1">-- Higher-Order Helpers</span>
    <span class="n">leftAligned</span> <span class="o">&lt;|</span> <span class="n">monospace</span> <span class="o">&lt;|</span> <span class="n">fromString</span> <span class="s">"</span><span class="s2">code"</span>
    </code>
</pre>

## Elm Highlight in GitHub Pages
If you are using [GitHub Pages](https://pages.github.com/) to generate your Jekyll site, elm highlight currently (April 9th, 2018) won't work for you.

Rouge supports Elm starting from version 3.1.0. Jekyll GitHub Pages currently uses Rouge v2.2.1. This will highly likely change in the future. The version of the Rouge used by GitHub Pages is updated with a delay to ensure that there will be no errors related to a code highlighting.

As a workaround, you can use Haskell highlighting instead of Elm. To use Haskell highlight you need to specify `haskell` as a parameter for the `highlight` tag:
```
{% raw %}
{% highlight haskell %}
{% endraw %}
```
```
-- Strings and Lists
"hello" ++ "world" == "helloworld"
[1,1,2] ++ [3,5,8] == [1,1,2,3,5,8]

-- Higher-Order Helpers
leftAligned <| monospace <| fromString "code"
```
```
{% raw %}
{% endhighlight %}
{% endraw %}
```

The syntaxis of Haskell is similar to Elm and the most of the code highlighting will work fine.
