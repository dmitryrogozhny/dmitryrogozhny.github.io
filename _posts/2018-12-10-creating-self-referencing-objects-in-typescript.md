---
layout: post
title:  Creating Self-Referencing Objects in TypeScript
date:   2018-12-10 12:00

tags: [typescript, javascript]
---

## Problem
Let's consider a quick example: how would you create an object with the __`Node`__ interface?
{% highlight typescript %}
interface Node {
    value: number;
    self: Node;
}

const node = {
    value: 0,
    self: ???,
};
{% endhighlight %}

The problem is that you need a `Node` object reference for the `self` property. And to create the object you need to specify its `self` property. And so on, and so on.

## Solution
The possible solution for this is to use a `Partial` mapped type. Here's the code snippet for the solution:
{% highlight typescript %}
function createNode(): Node {

    const node: Partial<Node> = {
        value: 0,
    };

    node.self = node as Node;

    return node as Node;
}
{% endhighlight %}

```Partial<Node>``` returns a type that has got the same properties as Node, but those properties are optional. This allows to instanciate the object without specifying the `self` property right away. Once the object has been created, we can reference the object for the `self` property.

It's important to cast the object from ```Partial<Node>``` back to `Node` before starting using it.
