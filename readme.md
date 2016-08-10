## [Peter Y. Chuang - Novelist, Short Story Writer](https://novelist.xyz).

[![Build Status](https://travis-ci.org/peterychuang/peterychuang.github.io.svg?branch=source)](https://travis-ci.org/peterychuang/peterychuang.github.io) [![CircleCI](https://circleci.com/gh/peterychuang/peterychuang.github.io/tree/source.svg?style=svg)](https://circleci.com/gh/peterychuang/peterychuang.github.io/tree/source)

This is the Hugo source code for [Peter Y. Chuang - Novelist](https://novelist.xyz) website. The source code for the Jekyll version of the website can be found [here](https://github.com/peterychuang/peterychuang.github.io/tree/source-jekyll).

Originally, this was a fork of [{ Personal } Jekyll Theme by PanosSakkos](https://github.com/PanosSakkos/personal-jekyll-theme), which was a fork of [Timeline](https://github.com/kirbyt/timeline-jekyll-theme), and I borrowed some elements from [Grayscale](https://github.com/jeromelachaud/grayscale-theme) and [Feeling Responsive](https://github.com/Phlow/feeling-responsive).

Over time, however, I've made numerous changes to the site, and some time in 2015 a hard-disk failure made part of the source that was not synced to GitHub unrecoverable. As a result, a large part of the site, mainly the CSS, has been rebuilt and re-compiled from ground up using [Bootstrap Framework](https://github.com/twbs/bootstrap), the original framework that powered whichever site that the site I forked was based on, and it's probably not possible to see the trace of the original themes I forked to create this website.

### Stuff used in this site

* [Bootstrap Framework](https://github.com/twbs/bootstrap) to re-build the website using Less compiler for CSS (I might have been using SASS before for this particular site, but I can't really remember);
* [FullPage.js](https://github.com/alvarotrigo/fullPage.js) allows full-screen scrolling;
* [loadCSS](https://github.com/filamentgroup/loadCSS) is used to load CSS asynchronously;
* [The usual suspect](https://github.com/jquery/jquery); and
* Slightly changed version of this bit from [here](https://github.com/BlackrockDigital/startbootstrap-scrolling-nav/blob/gh-pages/js/scrolling-nav.js):
```
//jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
});
```

### Copyright and License

The following directories and their contents are Copyright Peter Y. Chuang. You may not reuse anything therein without my permission:

content/  

Some images in the following directory are taken from unsplash and other sources as specified inside the relevant blog posts. Otherwise, the contents are Copyright Peter Y. Chuang.

static/assets/img  

All other directories and files are MIT Licensed. Feel free to use the HTML and CSS as you please. If you do use them, a link back to https://novelist.xyz would be appreciated, but is not required.

[MIT License](https://github.com/peterychuang/peterychuang.github.io/blob/master/LICENSE)
