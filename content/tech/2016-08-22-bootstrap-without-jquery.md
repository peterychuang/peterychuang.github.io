---
aliases: null
date: 2016-08-23T15:15:56-04:00
description: You don't need jQuery to bring a Bootstrap Navbar to life
header:
  caption: null
  caption_url: null
  image: code.jpg
layout: null
seo_description: The few functions you will ever use in a Bootstrap Navbar can be achieved with a script 1% the size of jQuery
seo_title: Bootstrap Navbar without jQuery
tag:
- Web Development
title: How to use Bootstrap Navbar without jQuery
type: post
url: /tech/bootstrap-without-jquery/
youtube_id: null
---
This website uses [Bootstrap framework](http://getbootstrap.com/), which is very useful for creating responsive websites. But most of its javascript components aren't use in my case. It also requires jQuery to run, which is 86KB in size before gzipping. For the only two functions I need---expanding and collapsing the Navbar menu---depending on jQuery seems unnecessary. And it is indeed unnecessary, because those functions can be achieved by some plain vanilla javascript 1% the size of jQuery.

Inspired by [Bootstrap without jQuery](https://github.com/tagawa/bootstrap-without-jquery) and [Matthew Petroff](https://mpetroff.net/2015/03/bootstrap-navbar-without-jquery/), I've written the script below that expands the menu when a user taps the ```navbar-toggle``` button, and collapses the menu when the user taps anywhere in the page (similar to using ```$(document).on('click',function(){$('.collapse').collapse('hide')})``` in Bootstrap *with* jQuery).

{{< highlight javascript >}}
/* Bootstrap Replacement

   Inspired by and modified from Bootstrap without Jquery Project
   https://github.com/tagawa/bootstrap-without-jquery
*/

  var e = document.querySelector(".navbar-toggle");
  var t = document.querySelector(".navbar-collapse");
  var a = e.getAttribute("aria-expanded");

  function getMaxHeight(t) {
    // Source: http://n12v.com/css-transition-to-from-auto/
    var prevHeight = t.style.height;
    t.style.height = 'auto';
    var maxHeight = getComputedStyle(t).height;
    t.style.height = prevHeight;
    t.offsetHeight; // force repaint
    return maxHeight;
  }

/* Open the Menu after clicking the menu button
   Only if the menu is current collapsed that is.
*/

  e.onclick = function() {
    if ( a == "false" ) {
      t.classList.remove('collapse');
      t.classList.add('collapsing');
      e.classList.remove('collapsed');
      e.setAttribute('aria-expanded', true);
      t.style.height = getMaxHeight(t);
    }
  }

/* Collapse the menu after clicking anywhere, not just the menu button.
   Only if the menu is already expanded, of course.
*/

  document.onclick = function(){
    if ( a == "true" ) {
      t.classList.remove("collapse");
      t.classList.remove("in");
      t.classList.add("collapsing");
      e.classList.add("collapsed");
      e.setAttribute("aria-expanded", false);
      t.style.height = getComputedStyle(t).height;
      t.offsetHeight,t.style.height="0px"
    };
  };

  // Transition Handling
  t.addEventListener("transitionend", function() {
    t.classList.remove('collapsing');
    t.classList.add('collapse');

    // Check whether the element is unhidden
    if (t.style.height !== '0px') {
      t.classList.add('in');
      t.style.height = 'auto';
    }

    // Get 'aria-expanded' state
    a = e.getAttribute("aria-expanded");
  });
  {{</ highlight >}}

*Visit my [Github repository](https://github.com/peterychuang/peterychuang.github.io) for more information.*
