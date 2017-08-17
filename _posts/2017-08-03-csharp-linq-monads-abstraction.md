---
layout: post
title:  C# LINQ, Monads, and Abstraction
date:   2017-08-03 12:00

tags: [c#, functional programming]
---

I want to show you a little trick. If you are a C# developer looking to learn some functional programming, this post might be interesting for you.

![Here's some abstraction](/assets/csharp-linq-monads-abstraction-geek-and-poke.jpg)
<span class="tertiary-info" style="text-align: right; width: 100%; display: block;">
    [geek and poke comic strip](http://geekandpoke.typepad.com/geekandpoke/2012/06/abstraction.html)
</span>

## LINQ SelectMany
Here's the definition of the [`SelectMany`](https://msdn.microsoft.com/en-us/library/bb534336%28v=vs.110%29.aspx) method in C# LINQ:
{% highlight csharp %}
public static IEnumerable<TResult> SelectMany<TSource, TResult>(
	this IEnumerable<TSource> source,
	Func<TSource, IEnumerable<TResult>> selector
)
{% endhighlight %}

This method gets two parameters:
- `source`---which is a sequence of values;
- `selector`---which is a function that should be applied to each value in the `source`.

The method returns a sequence of values, each element is the result of invoking the `selector` function to an item in the `source`.

Type parameters allows to specify a type of the source elements as `TSource` and a type of returned elements as `TResult`.

You may check [examples of using `SelectMany`](https://msdn.microsoft.com/en-us/library/bb534336(v=vs.110).aspx#Anchor_3) method.

## Moving from C# to Haskell

Now let's do some simple changes.

First, let's change types `TSouce` and `TResult` to a shorter versions of `a` and `b`. We'll get:
{% highlight csharp %}
public static IEnumerable<b> SelectMany<a, b>(
	this IEnumerable<a> source,
	Func<a, IEnumerable<b>> selector
)
{% endhighlight %}

Now, let's change the name of the interface from `IEnumerable` to `M`:
{% highlight csharp %}
public static M<b> SelectMany<a, b>(
	this M<a> source,
	Func<a, M<b>> selector
)
{% endhighlight %}

And now for the interesting part.

Let's switch this method definition from C# language to Haskell. Without changing any types the signature of `SelectMany` will look like the following:

{% highlight haskell %}
SelectMany :: M a -> (a -> M b) -> M b
{% endhighlight %}

This definition describes the same signature as the original `SelectMany` definition.

## Monads

If we'll look at the [Monad definition](https://wiki.haskell.org/Monad) in Haskell, we'll find that each Monad should have an implementation of the `bind` operator that has the following signature:

{% highlight haskell %}
(>>=) :: M a -> (a -> M b) -> M b
{% endhighlight %}

As you can see, the signature is the same as in LINQ `SelectMany` method. And it is not a coincidence.

If you are a C# developer interested in functional programming, I recommend you to watch this video with Brian Beckman. It won't make you a functional programming expert, but it is a good starting point in learning it.

<br/>
<iframe
    width="100%"
    height="415"
    src="https://www.youtube.com/embed/ZhuHCtR3xq8?rel=0"
    frameborder="0"
    allowfullscreen>
</iframe>

Have fun! And don't fear the Monad!
