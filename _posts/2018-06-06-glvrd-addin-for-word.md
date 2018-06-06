---
layout: post
title:  Glvrd Add-in for Microsoft Word
date:   2018-06-06 12:00

image: /assets/glvrd-addin-for-word-hero.png

tags: [office 365, typescript, functional programming, elm]
---

[Glvrd---Russian-language Text Style Checker](https://appsource.microsoft.com/en-us/product/office/WA104380420) is the Microsoft Word add-in that helps to make your texts better. It analyzes a style of a Russian-language text, underlines potential problems, and recommends how to fix them.

The add-in works in both desktop and online versions of Word. It uses [API](https://glvrd.ru/api/) provided by the [Glvrd](https://glvrd.ru/) service, which performs the analysis of a text and provides recommendations.

Here's a demo of the add-in at work:
<video autoplay="autoplay" loop="loop" width="100%" >
    <source src="{{ site.baseurl }}/assets/glvrd-demo.mp4" type="video/mp4" />
    <img src="{{ site.baseurl }}/assets/glvrd-demo.gif" width="100%" />
</video>

## Implementation Details

The source code for the add-in is available in the [glvrd-addin-2](https://github.com/dmitryrogozhny/glvrd-addin-2/) GitHub repository.

The add-in is a web application implemented using [Elm](http://elm-lang.org) and [TypeScript](https://www.typescriptlang.org/).

Thanks to the add-ins model in Microsoft Office, the add-in works in the same way in any version of Word.
