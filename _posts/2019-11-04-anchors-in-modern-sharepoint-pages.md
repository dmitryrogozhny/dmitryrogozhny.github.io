---
layout: post
title: "Anchors in Modern SharePoint Pages. Much More Than You Wanted to Know"
description: "Anchor links for headings in SharePoint Online pages allow navigating to a specific section in a page. This post describes how SharePoint Online adds anchor links to headings. This information might be useful if you want to work with anchors in your SharePoint Framework solutions."
date: 2019-11-04 12:00

image: "/assets/2019/anchors-in-sharepoint-pages-hero.jpg"

tags: [sharepoint, spfx]
---

Headings in modern SharePoint Online pages have got anchor links. These links got added automatically by SharePoint. You can click and copy that link. This is useful if you've got a page with lots of content and you want to provide a link to a particular section of the page.

This [feature](https://www.microsoft.com/en-us/microsoft-365/roadmap?filters=&filters=&searchterms=53198) has been added for H1-H3 headings that you create in Text web parts.
![Page anchor demo]({{ site.baseurl }}/assets/2019/page-anchor-demo.gif)

In this article, I'll take a look at how anchors got added to headings, some gotchas, and how you can work with anchors in your SharePoint Framework code.

As there's no official description of how this is implemented, the description is the result of my own investigations.

## Overview
You can create H1-H3 headings in Text web parts. When a page is displayed, anchors got automatically generated for these headings. This is done by assigning a unique id for each heading. You can get an Url that reference a heading by applying `#heading-unique-id` at the end of the page Url.

![Applying page anchor]({{ site.baseurl }}/assets/2019/page-anchor-apply.gif)

**Why is this important?**: Anchors got generated only for headings in standard Text web parts (i.e. only such headings will be assigned with ids). If you need an anchor for your custom web part, it is your responsibility to assign an id for your headings.

**Why is this important? 2**: Comments section at the bottom of a modern SharePoint Online page can be referenced with using `sp-comments` id. You can navigate users to a comments section with an Url like `https://page_url#sp-comments`.

## Supported headings
When you work with content in a Text web part, you can specify H1, H2, or H3 heading style. However, in HTML markup you would get H2, H3, and H4 headings (i.e. one size smaller). You don't notice that when working in a text editor, but this may confuse when working in code.

**Why is this important?**: When working in code, you need to search for H2-H4 headings. But you need to show "fixed" H1-H3 titles when showing anything to users.

**Why is this important? 2**: If you create your content in Microsoft Word, make sure to use headings H2-H4, and don't use H1. When copy-pasting into a SharePoint Online page, H1 headings will be copied as a regular text and this may cause wrong formatting.

![Applying page anchor]({{ site.baseurl }}/assets/2019/page-anchor-copy-paste.gif)

## Rules for anchors naming
Anchor for a heading is defined by a unique id that got specified for the heading. The name of the id depends on the heading's text. While rules for generating id is not documented, here are the rules that I've observed:
1. Heading's text is converted to a lower case (e.g. Overview → overview).
2. Whitespaces and ``'"`~@#%^&=;:?{}[]|\/`` symbols are replace with `-` (e.g. Page Overview → page-overview).
3. If there are multiple sequential symbols in step #2, they all replaced with a single `-` (e.g. Page[]Overview → page-overview).
4. Whitespaces and symbols from step #2 at the begining and at the end are trimmed (e.g. [Page] Overview → page-overview).
5. If after all the rules applied, a heading id contains only `-` symbols, it gets `anchor` id.
6. If there is already a heading with the same id, it will receive an incremental counted at the end (e.g. page-overview, page-overview-1, page-overview-2).

**Why is this important?**: Rules for assigning ids are not documented and quite complex. It is not recommended to go and recreate them in your code. These rules may change in the future as well. Approach with applying these rules in your code will work for simple cases (e.g. convert to a lower case and apply `-` instead of whitespaces). While this is a possible approach, it is not a fault-proof one.

## When anchors got added to headings
Anchors got added to headings (i.e. ids got assigned) on a page-scope level. For example, let's assume that you've got two Text web parts on a page, each having an `Overivew` heading. In this case, these two headings will get `overview` and `overview-2` headings.

That means that SharePoint cannot assign headings ids during a web part rendering. All the text web parts on a page should render before anchors can be specified. Until then, ids for headings will NOT be assigned and you won't be able to form a proper anchor for a heading.

**Why is this important?**: If you have got your custom web part on a page and you want to show all the anchors, you won't be able to do that during an initial rendering. Depending on a web part's position and amount of Text web parts on a page, headings may not have ids assigned at the time of your web part rendering.

**Why is this important? 2**: You cannot get anchors for headings by requesting a page via SharePoint API. In this case, headings won't have any ids assigned. You can calculate them manually using the rules specified above, but this approach may lead to errors.

This is all the information I've got for now about anchors in SharePoint Online pages. Using this information you can define the right strategy for working with anchors in your custom code.
