---
layout: post
title: "Applying Multiple CSS Classes in SharePoint Framework"
description: "If you need to apply multiple CSS classes in your SharePoint Framework code, you can do that with css utility function from the Office UI Fabric. Here's an example of how to use the css function and two alternative approaches."
date: 2019-10-22 18:00

image: "/assets/2019/applying-multiple-css-classes-in-spfx-hero.jpg"

tags: [sharepoint, spfx]
---

If you need to apply multiple CSS classes in your SPFx code, you can do that with [`css`](#approach-2-optimal-using-css-function) utility function from the Office UI Fabric. Here's an example of how to use the [`css`](#approach-2-optimal-using-css-function) function and two alternative approaches.

For a demo scenario we'll apply `.container`, `.fullWidth`, and `.hidden` CSS classes to a `<div>`. The last class, `.hidden`, should be applied if a web part property `isVisible` equals to `false`.

While [`css`](#approach-2-optimal-using-css-function) function is a recommended approach, I encourage you to review all the approaches to be aware of them and their applicability.

## Overview

Styles for SharePoint Framework web parts are defined in `scss` files. You can access these styles in your code with the `styles` variable:
{% highlight js %}
import styles from './{YOUR_WEB_PART}.module.scss';

...
// later in code
public render(): void {
  this.domElement.innerHTML = `
    <div class="${ styles.container }">
      ...
    </div>`;
}
{% endhighlight %}

In the example above `styles.container` will return a string with a corresponding CSS class (like `container_6e6e1386`, where suffix will be different with every CSS change).

For our demo scenario mentioned above classes would be available as `styles.container`, `styles.fullWidth`, and `styles.hidden`.


## Approach 1 (easy but cumbersome): Using strings concatenation

The easiest way to combine multiple CSS classes is by using strings concatenation. This can be done as the following:

{% highlight js %}
import styles from './{YOUR_WEB_PART}.module.scss';

...
// later in code
public render(): void {
  // build string with css classes
  const cssClasses = styles.container + ' ' + styles.fullWidth + ' ' + (this.properties.isVisible ? '' : styles.hidden);

  this.domElement.innerHTML = `
    <div class="${cssClasses}">
      ...
    </div>`;
}
{% endhighlight %}

This approach works fine if you've got a small amount of classes and simple conditions. With more classes and more complex conditions, it's getting harder to read.

Here is a slightly more complex version that is harder to read:
{% highlight js %}
import styles from './{YOUR_WEB_PART}.module.scss';

...
// later in code
public render(): void {
  // build string with css classes
  const cssClasses = styles.container
    + ' '
    + styles.fullWidth
    + ' '
    + (this.properties.isVisible && this.displayMode === DisplayMode.Read ? '' : styles.hidden)
    + ' '
    + (this.displayMode === DisplayMode.Edit ? styles.editing : '')
    + ' '
    + styles.themeOrange;

  this.domElement.innerHTML = `
    <div class="${cssClasses}">
      ...
    </div>`;
}
{% endhighlight %}

**Note**: you can use `Array.join()` function to concatenate strings:
{% highlight js %}
const cssClasses = [styles.container, styles.fullWidth, this.properties.isVisible ? '' : styles.hidden].join(' ');
{% endhighlight %}

It is easier to read comparing to strings concatenation, but `css` utility function provides better functionality (more types of arguments supported).

## Approach 2 (optimal): Using `css` function

[Office UI Fabric](https://developer.microsoft.com/en-us/fabric#/) provides a utility `css` function that combines multiple CSS classes together.

Here's an example (note the import of `css` function at the top and usage of the funtion to build a string with CSS classes):
{% highlight js %}
import styles from './{YOUR_WEB_PART}.module.scss';
import { css } from 'office-ui-fabric-react';

...
// later in code
public render(): void {
  // build string with css classes
  const cssClasses = css(styles.container, styles.fullWidth, this.properties.isVisible ? '' : styles.hidden);

  this.domElement.innerHTML = `
    <div class="${cssClasses}">
      ...
    </div>`;
}
{% endhighlight %}

In addition to string parameters, `css` function also accepts objects that implement `toString()` function and dictionaries.

Here are some additional examples:
{% highlight js %}
css('a', null, undefined, false, 'b', 'c')  // 'a b c'
css('a', { toString: () => 'b' }, 'c')      // 'a b c'
css('a', { b: true, z: false }, 'c')        // 'a b c'
{% endhighlight %}

With ES6 syntax you can build complex assignmets by creating an object with conditional styles and passing it to `css` function as an argument:
{% highlight js %}
const additionalStyles = {
  [styles.hidden]: !this.properties.isVisible,
  [styles.noFramework]: true,
};

const cssClasses = css(styles.container, styles.fullWidth, additionalStyles);
{% endhighlight %}

**Note**: If you've worked with React, chances are that you are familiar with [`classnames`](https://github.com/JedWatson/classnames) npm package that works in a very similar way to `css` function. You can use your experience and apply the same approaches to `css` funtion as with `classnames`.

## Approach 3 (advanced): Using Styleable Components from Office UI Fabric

The last approach is applicable if you want to implement reusable components with dynamic styling. This is useful if you want to allow parent components to provide styles for your component or allow other developers to do that in code. Thus it is mostly applicable to separate React components, rather than whole web parts.

This approach is used by Office UI Fabric components and is described in the [Component Styling](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling) guide. It uses CSS-in-JS approach, where you define your component's styles not in `.scss` file but as a TypeScript object. This allows to create an object that defines multiple CSS styles that can be later applied to a component during rendering. This object can be passed to a component by a parent that improves styling flexibility.

Here's an example:
{% highlight js %}
import styles from './{YOUR_WEB_PART}.module.scss';
import { css, classNamesFunction, IStyle } from 'office-ui-fabric-react';

type IButtonBasicExampleStyleProps = {};

interface IButtonBasicExampleStyles {
  root: IStyle;
}

...
// later in code
public render(): void {

const containerStyles: IButtonBasicExampleStyles = {
  root: [
    styles.container,
    styles.fullWidth,
    {
      display: 'flex',
      selectors: {
        '& > *': {
          flexGrow: 1
        },
        '.ms-Label': {
          marginBottom: '10px'
        }
      }
    }
  ]
};

const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
const classNames = getClassNames(containerStyles, {});
const cssClasses = css(classNames.root);

  this.domElement.innerHTML = `
    <div class="${cssClasses}">
      ...
    </div>`;
}
{% endhighlight %}

In the example above I define styles that should be applied to a `<div>` with a `containerStyles` variable. It contains both CSS class names and dynamic styles.

I would like you to be aware of this approach, but we're not going into details in this post. Check [Office UI Fabric documentation](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling) if you're interested in learning more.
