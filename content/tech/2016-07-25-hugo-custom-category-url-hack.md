---
aliases: null
date: 2016-07-25T13:06:07-04:00
description: An advanced hack to customise categories URLs in Hugo
header:
  caption: null
  caption_url: null
  image: "code.jpg"
layout: null
seo_description: How to customise the URLs of taxonomies pages on Hugo with an advanced hack and some automation
tag:
- Hugo
- Web
- Web Design
- Static Site
title: Customising categories URLs in Hugo revisited
url: /tech/advanced-custom-urls-for-category-pages-in-hugo/
youtube_id: null
---

A while ago, I wrote a simple workaround for [customising URLs of categories pages in Hugo](/tech/custom-urls-for-category-pages-in-hugo/). The purpose of it is to remove the word "categories" from the URLs of categories pages, a feature missing in Hugo.

That workaround is easy to use, and it replicates the behaviour in my old Jekyll site, though it is not perfect. The biggest issue is that my workaround can only generate one single page for each category *without* pagination, while the "original" categories pages have easily customisable pagination. The lack of pagination proves to be problematic in categories with large number of posts. Since the [feature request](https://github.com/spf13/hugo/issues/1208#issuecomment-218691671) for customisable taxonomies URLs isn't taken up, a new workaround is necessary.

The hack describes below takes advantage of the fact that Hugo, as a static site generator, generates all files locally, and those files can be modified before being pushed to a web host. In my existing workflow, for instance, the HTML files are minified before pushing to the server. To use the new hack, all I need to do is to make some small modifications to the existing gulp tasks runner.

The following gives you a general idea of the hack. The exact codes will vary according to your specific setup and workflow.

### 1. Change the Hugo Template

The purpose of this step is to remove the string `/categories` from all the HTML files.

First, change the template for categories pages, which is located in `layouts/taxonomy/category.html`. Use the [`replace` ](https://gohugo.io/templates/functions#replace) function to remove all instances of `/categories` from the pagination links:

{{< highlight html >}}
<ul class="pager">
  {{ if .Paginator.HasNext }}
    <li class="next">
      <span>
        <a href="{{ replace .Paginator.Next.URL "/categories" "" }}">Older Posts</a>
      </span>
    </li>
  {{ end }}
  {{ if .Paginator.HasPrev }}
    <li class="previous">
      <span>
        <a href="{{ replace .Paginator.Prev.URL "/categories" "" }}">Newer Posts</a>
      </span>
    </li>
  {{ end }}
</ul>
{{< / highlight >}}

We must also remove `/categories` elsewhere. For example, in `partials/head.html`, change

{{< highlight html >}}
<link rel="canonical" href="{{ .Permalink }}" />:
{{< / highlight >}}

to

{{< highlight html >}}
<link rel="canonical" href="{{ replace .Permalink "/categories" "" }}" />
{{< / highlight >}}

At this point, `/categories/category-name/` stops working properly---the pagination links now point to `/category-name/page/2`, for example, which is a dead link for the time being---and `/category-name/` remains dead. To make it work on your live website, you have to move all the files to the correct locations.

### 2. Minify and move the HTML files to the correct locations

Let's assume that the output directory of running the `hugo` command is `/output_unprocessed/`. In my own workflow, those files are [minified](https://www.npmjs.com/package/gulp-htmlmin) and then moved to `/output_final/` for final deployment:

{{< highlight javascript >}}
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
// More declarations here //

gulp.task('minify1' , function() {
  return gulp.src(['./output_unprocessed/**/*.html','!./output_unprocessed/categories/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true, conservativeCollapse: false, minifyCSS: true, minifyJS: true, minifyURLs: true}))
    .pipe(gulp.dest('../output_final'))
});

gulp.task('minify2', ['minify1'], function() {
  return gulp.src(['./output_unprocessed/categories/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true, conservativeCollapse: false, minifyCSS: true, minifyJS: true, minifyURLs: true}))
    .pipe(gulp.dest('../output_final'))
});

// More tasks here //

gulp.task('deploy', ['minify1','minify2','x', 'y', 'z']); // So that it performs all these tasks sequentially
{{< / highlight >}}

Here, the first task minifies all files *except* those located in `/categories`, while the second task minifies all files *inside* `/categories`. Since the output destination is `/output_final` in both tasks, the `/categories` directory will no longer exists in `/output_final`, while the subdirectories and files originally inside `/categories` will now be located in `/output_final`.

The final output is now ready for deployment.

### 3. Write a bash script to automate deployment

The deployment of this website has long relied on a [simple bash script](/tech/hugo-site-deployment-workflow/). After [my move to Firebase], the script has got somewhat simplified:

{{< highlight javascript >}}
#!/bin/bash

cd source             # Enter source directory
hugo

cd ../others          # Enter gulp directory
gulp deploy

cd ..                 # Enter project root
firebase deploy       # Deploy to Firebase
{{< / highlight >}}

### 4. Watch your new site goes live

Your website is now ***live***. Make sure all the pages and links work correctly, and all the canonical links and meta tags no longer contain `/categories`.

Admittedly, this hack is rather dirty and complicated, but with the help of gulp tasks runner and bash script, I've managed to keep the overall workflow more or less unchanged.

I would still like to see customisable categories URLs working in Hugo out of the box. For the time being, however, this hack serves as a better stopgap than my [previous one](/tech/custom-urls-for-category-pages-in-hugo/).
