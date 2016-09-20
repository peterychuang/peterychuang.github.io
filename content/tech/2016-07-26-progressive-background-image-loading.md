---
aliases: null
date: 2016-07-26T14:33:53-04:00
description: Starting with a blurry image, which then gets clearer and clearer when loading finishes
header:
  caption: null
  caption_url: null
  image: code.jpg
layout: null
seo_description: Improve user experience in loading large image by first serving a blurred image before loading of the full-sized picture is complete
seo_title: 'The "Blur-up" technique of loading background images'
tag:
- Web Development
- Static Site
title: 'How to load images using the "blur-up" technique'
type: post
url: /tech/progressive-background-image-loading/
youtube_id: null
---

Loading large images by first showing the blurred versions is becoming quite common, and it is easy to see why. Instead of showing a empty space of solid colour while loading, visitor can see a blurred image before the full image fades in.

In this post, I will describe how it is achieved in this website. The general idea is to create a tiny version of the image, which is small enough to load very quickly, and stretch it to the original size so that it appears blurry. The loading of the full-sized picture is then deferred.

Let's start with the HTML file:

{{< highlight html >}}
<header class="header-section blur-image" data-src="/path-to-original-image">
  <div class="full-image">
    <!-- More code goes here -->
  </div>
</header>
{{</ highlight >}}

The tiny picture will be set as the background image for the `<header>`, while the full-sized picture will become the background image of `<div class="full-image">`. The `data-src` contains the path to the full-sized image, which will be important later.

You now need to create a tiny version of the image, and preferably encoded in Base64. You also need to set the animation for the fading-in of the original image:

{{< highlight css >}}
.blur-image {
  background-image: url(data:image/jpeg;base64,...);
  filter: none;
  transition: -webkit-filter 0s 0.3s linear, filter 0s 0.3s linear;
}

.image-loaded {
  transition: opacity .25s linear;
}

.header-section, .full-image, .image-loaded {
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
  -webkit-filter: none;
}
{{</ highlight >}}

It is important to set `background-size` to `cover` in order to stretch the tiny image across the entire space.

Finally, the following will add class `image-loaded` and `style="background-image: ..."` to `<div class="full-image">` after ```DOMContentLoaded``` event:

{{< highlight javascript >}}
var a = document.querySelector('.blur-image');

document.addEventListener("DOMContentLoaded", function() {
  if (!a) return !1;
  var b = a.getAttribute("data-src"),
      c = document.querySelector('.full-image'),
      img = new Image;

  img.src = b;
  img.onload = function () {
    c.classList.add('image-loaded'),
    c.style.backgroundImage = 'url(' + b + ')';
  };
});
{{</ highlight >}}
