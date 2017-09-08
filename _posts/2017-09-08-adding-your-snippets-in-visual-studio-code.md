---
layout: post
title:  "Adding Your Snippets to Visual Studio Code"
date:   2017-09-08 12:00

image: /assets/adding-your-snippets-in-vs-code-hero.png
tags: [vs code]
---

Here is a quick example of how to add your own snippet in Visual Studio Code. This can be useful to automate your work and save some time.

As an example, I'll use a markup for a new HTML document:
![bootstrapping html code]({{ site.url }}/assets/adding-your-snippets-to-vs-code-bootstrap-html.gif)

I want to be able to quickly scaffold the document. Here is the code for an HTML document that I want to use:
{% highlight html %}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>title</title>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
    <h1>title</h1>

</body>

</html>
{% endhighlight %}

## Creating Custom Snippet
The process of creating your own snippets is described at the [Visual Studio Code site](https://code.visualstudio.com/docs/editor/userdefinedsnippets).

Custom snippets can be accessed via menu `File`&#8201;`->`&#8201;`Preferences`&#8201;`->`&#8201;`User Snippets`. After that, you need to select a snippet language. In my case, this will be `HTML`.
![opening user snippets]({{ site.url }}/assets/adding-your-snippets-to-vs-code-user-snippets.gif)

To add new HTML snippet we need to add a new record in the opened `html.json` file.

For the `Bootstrap HTML` snippet I am specifying the following fields:
- `prefix`---this name will be used by the IntelliSense and autocomplete;
- `description`---description of the snippet;
- `body`---content of the snippet.

{% highlight json %}
{% raw %}
{
  "Bootstrap HTML": {
    "prefix": "bootstrapHtml",
    "description": "Add default HTML document markup",
    "body": [
      "<!DOCTYPE html>",
      "<html lang=\"en\">",
      "",
      "<head>",
        "\t<meta charset=\"utf-8\">",
        "\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">",
        "\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
        "",
        "\t<title>${1:title}</title>",
        "",
        "\t<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->",
        "\t<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->",
        "\t<!--[if lt IE 9]>",
          "\t\t<script src=\"https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js\"></script>",
          "\t\t<script src=\"https://oss.maxcdn.com/respond/1.4.2/respond.min.js\"></script>",
        "\t<![endif]-->",
      "</head>",
      "",
      "<body>",
      "\t<h1>${1:title}</h1>",
      "</body>",
      "",
      "</html>"
    ]
  }
}
{% endraw %}
{% endhighlight %}

## Additional Functionality for Snippets
Keep in that you can use [various placeholders](https://code.visualstudio.com/docs/editor/userdefinedsnippets) in your snippet's `body`. For example, I'm usng `{$1:title}` to specify that cursor should stop at this location when I'll use the snippet. You can specify choices, tabstops, default values, and variables in your snippets.
