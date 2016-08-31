---
aliases: null
date: 2016-05-16T16:42:30-04:00
description: This is how I deploy this website
seo_description: How to deploy a Hugo website with Github and Travis CI, hosted with Caddy Webserver
seo_title: Hugo site deployment with Github, Travis CI, and Caddy Webserver
header:
  caption: null
  caption_url: null
  image: code.jpg
tag:
- Hugo
- Static Site
- Web Development
- Github
- Caddy
title: How I deploy my Hugo site to my webserver
type: post
url: /tech/hugo-site-deployment-workflow/
---

~~***This post has been updated to reflect my new deployment process after [migrating to Firebase](/tech/switching-from-github-pages-to-firebase/)***~~
***This post has been updated to reflect further important changes***

Static site generators are great---[Jekyll is great](/tech/jekyll/), and [Hugo is even greater](/tech/hugo-vs-jekyll-static-site-generator/)---except when it comes to updating the website. In the old days of my using wordpress, updating a post was a matter of logging in to the Wordpress Admin, making changes to the post, and hitting the "save" button. In a static site, however, one has to build the site and upload it to the webserver. The process varies depending on where and how you host your website, though it's going to involve more than a few mouse clicks without some automation.

Having considered and tried a few hosting and deployment options for my website (including Github Pages, Gitlab Pages, Netlify, and [Firebase](/tech/switching-from-github-pages-to-firebase/), I've settled with (for now, at least) using Github, Travis CI, and Caddy Webserver, hosted on a VPS that has just 128 MB memory. Below, I will describe various components of my deployment workflow.

## A general overview

The deployment involves four steps: first, the source is pushed to the source branch of my Github repository; changes in the source branch will trigger Travis CI to build the website with Hugo and Gulp; the output from Travis CI will then be pushed to the master branch on Github (note: if you host your website on Github Pages, your deployment is done here); changes in the master branch on Github will then trigger Caddy Webserver to pull all the changes from the Github.

The entire chain is invoked with a commit pushed to the remote Github repository, a step that most of us are already familiar with. Here, I am going to discuss the next few steps.

### Travis CI

Travis CI is a continuous integration service that tests codes and builds stuff from codes on Github. When a new commit is pushed, Travis CI spins up a virtual machine that runs the build as instructed by `.travis.yml`, which is located in the root of your repository.

This part of the deployment is an adaption of [Roman Coedo's workflow](http://rcoedo.com/post/hugo-static-site-generator/). You will need to create a key **with no passphrase** following the procedure from [this guide from Github](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/), place the key inside your repository, run `travis encrypt-file <your key>` to encrypt your key, which should produce a file ending with .enc extension and something like this on the terminal:

{{<highlight bash>}}
Please add the following to your build script (before_install stage in your .travis.yml, for instance):

    openssl aes-256-cbc -K $encrypted_fb3a77764d15_key -iv $encrypted_fb3a77764d15_iv -in publish-key.enc -out publish-key -d
{{</highlight>}}

Copy the `openssl aes-256-cbc [...]` bit and paste that into `.travis.yml`, **remove** the unencrypted key from your repository, and leave the encrypted key (.enc) inside.

Next, create `.travis.yml` in the root of your repositry, which will tell Travis CI to run Hugo and other steps required to build (my [`.travis.yml`](https://github.com/peterychuang/peterychuang.github.io/blob/source/.travis.yml) is here). Towards to end of the build process, [`deploy.sh`](https://github.com/peterychuang/peterychuang.github.io/blob/source/deploy.sh) is executed to pushes the build back to Github.

If you publish your website on Github, you are done here. But if you would like to publish your website somewhere else---for example, your own server---then read on.

### Publishing with Caddy Webserver

[Caddy](https://caddyserver.com/) is a new entry into the webservers space (Apache, Nginx, that kind of thing). It is lightweight, fast, and future-proof, with HTTP/2, automatic HTTPS, experimental QUIC support, and others. I choose Caddy for this website mostly because of its simplicity and its optional [git add-on](https://github.com/abiosoft/caddy-git), which allows automatic update by pulling from a remote git repository.

To enable this feature, check the git option when you [download Caddy](https://caddyserver.com/download). Inside your Caddyfile (the configuration file for Caddy), include a git code block that specifies the repository you wish to clone, the location of the hook, the secret token, and the path to the SSH key (optional). For other options, read the [documentation for the git directive](https://caddyserver.com/docs/git)).

{{<highlight javascript>}}
git {
  repo git@github.com:<github username>/<github repository>
  path .
  branch master
  hook /hook <secret>
  key <path to the private key>
}
{{</highlight>}}

Then, go to the Settings of your Github repository, point the webhook to your server, and set the secret token (and the deploy key). For a detailed demonstration, watch [this video](https://www.youtube.com/watch?v=dmat1MUT0fc).

When Caddy Webserver is started for the first time, it clones the master branch of my Github repository. After the initial clone, it will be trigger to pull from Github whenever the webhook is invoked.

## Why do I do this?

Using Travis CI, for me at least, is much cleaner than maintaining two branches in my local machines---one branch for source and one branch for built website---and pushing two branches to the remote repository every time I update the website. Although using bash scripts have, in the past, simplified the process to a great extent, the ease of executing bash scripts made me much less careful when committing changes, thus introducing a lot of noise and mess in my commits history, which wasn't very ideal.

Meanwhile, hosting on a VPS gives me total control over my server with minimal expense. Since this website is small and static, and since Caddy is very lightweight, a virtual machine with just 128 MB memory, which only costs me a little more than US$1 a month, is more than enough to give this website a solid performance.

Deploying my website this way isn't totally without drawbacks, of course, the biggest of which is that the build time is much longer than on [my desktop and my laptop](/tech/my-linux-rig/). An alternative, which I have experimented with, is to run the build on the same machine that runs the webserver. The downside to this is that running the build uses significant amount of CPU and memory, which proved to be too demanding for a 128-MB-memory virtual machine.



#### *My old workflow*

*Below was my old way of deployment this site to Firebase, which involved some bash scripts. I leave it here for your reference.*

##### *Update with a time-stamp*

*For simple updates such as publishing a new post or making changes to an existing one, I prefer using time-stamps as my git commit messages:*

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

*What this script does are:*

*1. Build the pages;*
*2. Push the source to a remote Git repository;*
*3. Run Gulp to generate the final output for deployment, as explained later; and*
*4. Deploy the final output to Firebase.*

##### *Update with a commit message*

*For other updates where a commit message is preferable, I use the following script:*

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

##### *Gulp tasks runner*

*I use a series of Gulp task to minify HTML files, copy static resources to the correct locations, [hack categories URLs](/tech/advanced-custom-urls-for-category-pages-in-hugo/), and embed base64-encoded images by processing `<img>` tags in all the HTML files and replace images files with data URIs. The following is a simplified version of my `gulpfile.js`, which requires [`gulp-htmlmin`](https://www.npmjs.com/package/gulp-htmlmin) and [`gulp-base64`](https://www.npmjs.com/package/gulp-base64):*

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

~~*Finally, to avoid Github from asking for your password every time you update your site, you can cache the Github password for a specific amount of time. For example, the following command will cache your password for an hour: `git config --global credential.helper 'cache --timeout=3600'`*~~*(This bit has been deprecated in favour of [using an SSH key](https://help.github.com/articles/generating-an-ssh-key/) (thanks [Scala WIlliam](https://novelist.xyz/tech/hugo-site-deployment-workflow/#comment-2805196952)).*

~~*In the future, I will be looking to use git hooks to trigger the build and deployment process.*~~
