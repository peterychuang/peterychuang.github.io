---
date: 2016-05-06T14:23:16Z
description: Supercharge a Github-hosted Jekyll site with Gulp tasks and Cloudflare
header:
  caption: ""
  image: code.jpg
tag:
- Jekyll
- Github
- Web Development
- Static Site
title: How to create a super-fast Jekyll site
type: post
url: /tech/performant-jekyll-site-with-gulp-cloudflare/
---
(***Update: this site now runs on [Hugo](/tech/hugo-vs-jekyll-static-site-generator/)***)

Earlier, I wrote a brief note explaining [why I use Jekyll](https://novelist.xyz//tech/jekyll/), which came down to two major factors: cost and performance. Hosting a Jekyll site on Github is free, eliminating all the costs (save the domain name) associated with running a self-hosted Wordpress site; and Github Pages is very fast.

But there are still some room for improvments. The steps outlined below are what I've done to optimise my website, partly inspired by [David Ensinger's post](http://davidensinger.com/2015/01/performant-websites-with-jekyll-grunt-github-pages-and-cloudflare/) on the same topic. Instead of using Grunt, I use Gulp for this website.

### Minifying HTML

The easiest way to compress HTML is to use [Compress HTML in Jekyll](http://jch.penibelst.de/) (Unfortunately, this method also slows down the build time quite considerably).

### Minifying CSS

By Minifying CSS, I don't just mean removing all the tabs and spaces within a CSS file.

This site uses [Bootstrap framework](http://getbootstrap.com/), which comes with a set of less files in which you tweak the variables to make the website look what you want it to be. It requires a Less compiler to compile all the .less files into one single stylesheet.

There is one problem when using such framwork: a lot of the stuff inside the compiled stylesheet is useless. For example, your site may have no breadcrumbs or carousels, but the stylesheet has those classes. Of course, you can manually remove those classes by commenting out things you don't need, such as:

{{< highlight css >}}
@import "breadcrumbs.less";
@import "carousel.less";
{{< /highlight >}}


But I find it easier to use a few Gulp tasks to automate the whole process of compiling the CSS file, sorting it, removing unused classes, minifying it, and extracting the critical path CSS.

First, install [gulp](https://www.npmjs.com/package/gulp), [gulp-less](https://www.npmjs.com/package/gulp-less), [gulp-csscomb](https://www.npmjs.com/package/gulp-csscomb), [gulp-uncss](https://www.npmjs.com/package/gulp-uncss), [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) and [critical](https://www.npmjs.com/package/critical). Then create a gulpfile.js in the directory of your site with something like this:


{{< highlight javascript >}}
var gulp = require('gulp');
var less = require('gulp-less');
var csscomb = require('gulp-csscomb');
var uncss = require('gulp-uncss');
var cleanCSS = require('gulp-clean-css');
var critical = require('critical');

// Compiling the CSS from less
gulp.task('less', function () {
  return gulp.src('./_less/style.less')
	.pipe(less())
	.pipe(gulp.dest('./assets/css/big'));
});

// Sorting the CSS
gulp.task('styles', ['less'], function() {
  return gulp.src('./assets/css/big/style.css')
  .pipe(csscomb())
  .pipe(gulp.dest('./assets/css/combed'));
});

// Removing unused classes in CSS
gulp.task('uncss', ['styles'], function() {
  return gulp.src('./assets/css/combed/style.css')
    .pipe(uncss({
    html: ['./_site/**/*.html'],
    ignore: [/fp/],
    timeout: 1000
  }))
  .pipe(gulp.dest('./assets/css/uncss/'));
});

// Removing tabs and spaces in CSS
gulp.task('minify-css', ['uncss'], function() {
  return gulp.src('assets/css/uncss/style.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('assets/css/'));
});

// Extracting the critical path CSS
gulp.task('critical', ['minify-css'], function() {
  critical.generate({
    base: '_site/',
    src: 'index.html',  // Extract critical path CSS for index.html
    css: ['assets/css/style.css'],
    dest: './_includes/critical.css',
    minify: true,
    include: [/cc_/],
    ignore: ['@font-face']
  });
});


// Run all the tasks above in the following fixed sequence
gulp.task('css', ['less','styles', 'uncss', 'minify-css', 'critical']);
{{< /highlight >}}

To perform all the tasks in that sequence, which is advisable whenever you make changes to the style, go to the terminal, get into the path of the source, and enter:

{{< highlight bash >}}
gulp css
{{< /highlight >}}

In my case, the CSS file shrinks from about 184KB in my case to just about 36KB.

It will also create a critical path CSS inside the _includes directory. Critical path CSS is the style used in above-the-fold part of the website. Having critical path CSS inlined inside the page will speed up rendering. Instead of having to wait for the CSS file to load, the above-the-fold content can be rendered within the same HTTP request.

{{< highlight liquid >}}
{% include head.html %}
{% include critical.css %}
{% include navigation.html %}
{% include header.html %}
... something something ...
{% include footer.html %}
{{< /highlight >}}

The caveat: I have found no easy way to remove the content of the critical path CSS from the CSS file, thus creating duplication. The same stuff inlined within the HTML files is present in the CSS file as well.

### Load CSS asynchronously

I use [loadCSS](https://github.com/filamentgroup/loadCSS) to load CSS asynchronously.


### Optimising images

I use [gulp-image-optimization](https://www.npmjs.com/package/gulp-image-optimization) and [imagemin-jpegtran](https://www.npmjs.com/package/imagemin-jpegtran) to compress and optimise images. Include the following into your gulpfile.js:

{{< highlight javascript >}}
var imageop = require('gulp-image-optimization');
var imageminJpegtran = require('imagemin-jpegtran');

gulp.task('jpgs', function(cb) {
  gulp.src('assets/img-input/*.jpg')
  .pipe(imageop({
    optimizationLevel: 7,
    progressive: true,
    interlaced: true,
    use: [imageminJpegtran()]
  }))
  .pipe(gulp.dest('assets/img')).on('end', cb).on('error', cb);
});
{{< /highlight >}}

Then run:

{{< highlight bash >}}
gulp jpgs
{{< /highlight >}}

### Using Cloudflare

[Cloudflare](https://www.cloudflare.com/) is a CDN service with various security features. It compresses and caches static resources, sets expires header, and more. I also use Cloudflare to enable SSL (note that the traffic between Github and Cloudflare is not encrypted; enabling SSL with Cloudflare only encrypts traffic between Cloudflare and visitors).

To use Cloudflare, simply point the nameservers to ones provided by Cloudflare when you register.


### Result

This is the result on [webpagetest.org](http://www.webpagetest.org)

<img src="/assets/img/webpagetest.jpg" style="width:100%">

If you want to view the source code for my website, please visit my [Github repository](https://github.com/peterychuang/peterychuang.github.io/tree/source)
