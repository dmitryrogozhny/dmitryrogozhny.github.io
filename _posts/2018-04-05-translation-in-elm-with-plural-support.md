---
layout: post
title:  Localization in Elm with Plurals Support
date:   2018-04-05 12:00

custom-javascript-list:
    - "../../lab/elm-i18n-with-plurals/main.js"

image: "/assets/translation-in-elm-with-plural-support-hero.png"

tags: [elm, functional programming]
---

Here's the example of how you can localize your Elm application including plurals support.

The code is available in [`elm-samples`](https://github.com/dmitryrogozhny/elm-samples/tree/master/i18n-with-plurals) repository. It is based on the [Elm i18n and Type Safety](https://www.gizra.com/content/elm-i18n-type-safety/) article by Amitai Burstein. Their solution provides the localization functionality with type safety.


The difference of my code is that I've added support for plurals.

**Live demo**:
<div id="app"></div>

<script>
    var element = document.getElementById("app");
    Elm.Main.embed(element);
</script>

## Plurals Support

The logic for a pluralization is implemented in the [`PluralRules.elm`](https://github.com/dmitryrogozhny/elm-samples/blob/master/i18n-with-plurals/PluralRules.elm) file.

The `PluralRules` module exports functions that can be used for pluralized translation for a particular language.


As an example, there are functions for `english`, `french`, `russian`, and `german` languages.

Plural rules for a language can be found at the [Unicode site](http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html). Different languages vary in how they support plurals, thus the amount of translations for a particular language will vary. This means that every translation function will take different amount of parameters.

For example, `english` function takes two translations (one and other), and a number of items to provide the right plural form:
{% highlight haskell %}
english : String -> String -> Int -> String
english "Apple" "Apples" 10 -- will evaluate to "Apples"
{% endhighlight %}

The `russian` function requires four translations (one, few, many, and other):
{% highlight haskell %}
russian : String -> String -> String -> String -> Int -> String
-- example:
russian "Яблоко" "Яблока" "Яблок" "Яблока" 10 -- will evaluate to "Яблок"
{% endhighlight %}


## How to Add Pluralization for New Language

Let's add a support for a [German](http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html#de) language. Here's the rules table from the Unicode site:
![german plural rules](/assets/elm-with-plural-support-german.jpg)


German language requires two translations for cardinal numbers: one, and other. The `Rules` column contains the rules for pluralization, where:
- `i` is the integer digits of n.
- `v` is the number of visible fraction digits in n, with trailing zeros.


The implementation for this logic in Elm:
{% highlight haskell %}
german : String -> String -> Int -> String
german one other number =
    let
        v =
            visibleFractionDigits number

        i =
            integerDigits number
    in
    if v == 0 && i == 1 then
        one
    else
        other
{% endhighlight %}

Support for other languages can be added in a similar manner:
1. Find the plural rules for a language in the [Unicode table](http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html).
2. Implement the rules in Elm as a separate function.
3. Use the function in your code.
