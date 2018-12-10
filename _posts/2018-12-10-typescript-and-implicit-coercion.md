---
layout: post
title:  TypeScript and Implicit Coercion
date:   2018-12-10 12:05

tags: [typescript, javascript]
---

Coercion, i.e. implicitly converting a value from one type to another is considered a complex topic in JavaScript.

The reason is that there is a set of conversion rules you need to know about to predict the result of a comparision. Otherwise, some results may surprise you.

This post is about how TypeScript makes coercion easier for developers.

Here's a set of examples from the [You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md#false-y-comparisons) book. Try to guess the result for each operation in JavaScript (__spoiler__: not all of them would be `false`):

{% highlight javascript %}
"0" == null;
"0" == undefined;
"0" == false;
"0" == NaN;
"0" == 0;
"0" == "";

false == null;
false == undefined;
false == NaN;
false == 0;
false == "";
false == [];
false == {};

"" == null;
"" == undefined;
"" == NaN;
"" == 0;
"" == [];
"" == {};

0 == null;
0 == undefined;
0 == NaN;
0 == [];
0 == {};
{%endhighlight%}

Now you can check yourself with the results:
{% highlight javascript %}
"0" == null;			// false
"0" == undefined;		// false
"0" == false;			// true -- UH OH!
"0" == NaN;			// false
"0" == 0;			// true
"0" == "";			// false

false == null;			// false
false == undefined;		// false
false == NaN;			// false
false == 0;			// true -- UH OH!
false == "";			// true -- UH OH!
false == [];			// true -- UH OH!
false == {};			// false

"" == null;			// false
"" == undefined;		// false
"" == NaN;			// false
"" == 0;			// true -- UH OH!
"" == [];			// true -- UH OH!
"" == {};			// false

0 == null;			// false
0 == undefined;		        // false
0 == NaN;			// false
0 == [];			// true -- UH OH!
0 == {};			// false
{%endhighlight%}

## TypeScript and Coercion

A good thing about TypeScript is that it makes such comparissions easier to predict. Here's what would be a result for the same code in TypeScript:
{% highlight typescript %}
"0" == null;		// false
"0" == undefined;	// false
"0" == false;		// compile-time error
"0" == NaN;		// compile-time error
"0" == 0;		// compile-time error
"0" == "";		// compile-time error

false == null;		// false
false == undefined;	// false
false == NaN;		// compile-time error
false == 0;		// compile-time error
false == "";		// compile-time error
false == [];		// compile-time error
false == {};		// compile-time error

"" == null;		// false
"" == undefined;	// false
"" == NaN;		// compile-time error
"" == 0;		// compile-time error
"" == [];		// compile-time error
"" == {};		// compile-time error

0 == null;		// false
0 == undefined;		// false
0 == NaN;		// compile-time error
0 == [];		// compile-time error
0 == {};		// compile-time error
{%endhighlight%}

Some of expressions will still evaluate to `false` as expected, but for most "tricky" expressions one would get the error message during the compilation (or directly in a code editor if you're using the VS Code).

For example for the `"0" == false` expression you would get: `This condition will always return 'false' since the types '"0"' and 'false' have no overlap`. Other expressions would have similar error messages.

On the one hand, this limits the possibilities available for developers. On the other hand, it makes things easier to write, read, and maintain. I personally prefer the TypeScript way of supporting coercion.

Knowing coercion is still a very useful skill for any TypeScript developer. I encourage you to check the [Coercion chapter](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md) of the [You don't know JS](https://github.com/getify/You-Dont-Know-JS) book series to refresh your knowledge on this topic.
