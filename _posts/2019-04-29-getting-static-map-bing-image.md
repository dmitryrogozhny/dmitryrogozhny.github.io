---
layout: post
title:  "How to Get the Staic Bing Maps Image"
date:   2019-04-29 12:00

tags: [bing maps]
---

A quick note about getting the static image for Bing Maps.

Here are the steps that you would need to follow:
1. Get the Bing Maps API key.
2. Get the Url for a static image from Bing Maps.
3. [Optional] Get the Url for a dynamic Bing Maps page.

I'll provide examples using the TypeScript language.

## 1. Get the Bing Maps API Key

First, you would need to get the valid Bing Maps API key. The key is required for requests to Bing Maps.

You can create a key at the [Bing Maps Dev Center](https://www.bingmapsportal.com/). You would need a valid Microsoft account to sign in.

To get a key, create a new application and specify its details:
![Bing Maps Dev Center keys]({{site.baseurl}}/assets/bing-maps-keys.png)

## 2. Get the Url for a static image from Bing Maps

To get the static image for a map you would need to form a proper Url for Bing Maps. You can learn the correct base Url in [Bing Maps documentation](https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-a-static-map). Additional parameters for Url specify the details for a static image.

Example of the Url to get a static map that displays a route:
```
https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0=Seattle,WA;64;1&wp.1=Redmond,WA;66;2&key={BingMapsAPIKey}
```
> where `{BingMapsAPIKey}` is a valid Bing Maps API key from the first step.

This request would return the following image:
![Bing Maps static image]({{site.baseurl}}/assets/bing-maps-route.png)

## 3. Get the Url for a dynamic Bing Maps page

You can also get a Url, that will open the Bing Maps page with a predifined location and view. You don't need the Bing Maps API key to form such Urls.

You can learn more about the parameters at [Create a Custom Map URL](https://docs.microsoft.com/en-us/bingmaps/articles/create-a-custom-map-url) page.
