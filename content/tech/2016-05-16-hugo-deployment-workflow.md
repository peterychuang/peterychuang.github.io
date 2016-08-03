---
aliases: null
date: 2016-05-16T16:42:30-04:00
description: This is how I post stuff on this website
seo_description: How to automate deployment of a Github-hosted Hugo site through bash script.
header:
  caption: null
  caption_url: null
  image: code.jpg
tag:
- Hugo
- Static Site
- Web
- Web Design
- Github
title: How I deploy my Hugo site to Firebase
type: post
url: /tech/hugo-site-deployment-workflow/
---

***This post has been updated to reflect my new deployment process after [migrating to Firebase](/tech/switching-from-github-pages-to-firebase/)***

Static site generators are great: [Jekyll is great](/tech/jekyll/), and [Hugo is even greater](/tech/hugo-vs-jekyll-static-site-generator/).

But when it comes to the workflow of updating the site---putting up new blog posts, making changes to published blog posts, etc---things get a little more complicated. To automate the deployment process, I use bash scripts and Gulp tasks runner to reduce all the steps in my deployment process down to one Linux terminal command.

### Update with a time-stamp

For simple updates such as publishing a new post or making changes to an existing one, I prefer using time-stamps as my git commit messages:

{{< highlight bash >}}
#!/bin/bash

# Fetch current time
export TZ=":America/New_York"
now=$(date +"%Y-%m-%d %H:%M:%S")

cd path-to-hugo/source

# Push the source to Github (source branch)
git add .
git commit -m "Site update: $now"
git push origin master

# Build the site
hugo

# Run the gulp task
cd path-to-gulp
gulp deploy

# Deploy
cd path-to-firebase
firebase deploy
{{< / highlight >}}

What this script does are:

1. Build the pages;
2. Push the source to a remote Git repository;
3. Run Gulp to generate the final output for deployment, as explained later; and
3. Deploy the final output to Firebase.

### Update with a commit message

For other updates where a commit message is preferable, I use the following script:

{{< highlight bash >}}
#!/bin/bash

# Prompt commit message
read -p "Enter commit message: " message

cd path-to-hugo/source

# Push the source to Github (source branch)
git add .
git commit -m "$message"
git push origin master

# Build the site
hugo

# Run the gulp task
cd path-to-gulp
gulp deploy

# Deploy
cd path-to-firebase
firebase deploy
{{< / highlight >}}

### Gulp tasks runner

I use a series of Gulp task to minify HTML files, copy static resources to the correct locations, [hack categories URLs](/tech/advanced-custom-urls-for-category-pages-in-hugo/), and embed base64-encoded images by processing `<img>` tags in all the HTML files and replace images files with data URIs. The following is a simplified version of my `gulpfile.js`, which requires [`gulp-htmlmin`](https://www.npmjs.com/package/gulp-htmlmin) and [`gulp-base64`](https://www.npmjs.com/package/gulp-base64):

{{< highlight javascript >}}
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var base64 = require('gulp-base64');

gulp.task('minify' , function() {
  return gulp.src(['./output-from-hugo/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true, conservativeCollapse: false, minifyCSS: true, minifyJS: true, sortAttributes: true, sortClassName: true}))
    .pipe(gulp.dest('../public'))
});

gulp.task('copy_static', ['minify'], function() {
  gulp.src(['./output-from-hugo/assets/**/*''])
  .pipe(gulp.dest('../public/assets'))
});

gulp.task('copy_xml', ['copy_static'], function() {
  gulp.src(['./output-from-hugo/**/*.xml'])
  .pipe(gulp.dest('../public/'))
});

gulp.task('base64', ['copy_xml'], function () {
  return gulp.src('../public/**/*.html')
    .pipe(base64({
      baseDir: './output-from-hugo/',
      extensions: ['jpg'],
      maxImageSize: 20 * 1024, // bytes
      debug: true
    }))
  .pipe(gulp.dest('../public/'));
});

gulp.task('deploy', ['minify', 'copy_static', 'copy_xml', 'base64']);
{{< / highlight >}}

~~Finally, to avoid Github from asking for your password every time you update your site, you can cache the Github password for a specific amount of time. For example, the following command will cache your password for an hour: `git config --global credential.helper 'cache --timeout=3600'`~~(*This bit has been deprecated in favour of [using an SSH key](https://help.github.com/articles/generating-an-ssh-key/) (thanks [Scala WIlliam](https://novelist.xyz/tech/hugo-site-deployment-workflow/#comment-2805196952)*).

In the future, I will be looking to use git hooks to trigger the build and deployment process.
