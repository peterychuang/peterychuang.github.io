---
aliases: null
date: 2016-07-24T15:07:55-04:00
description: This website is now hosted on a VPS
header:
  caption: null
  caption_url: null
  image: code.jpg
layout: null
seo_description: null
tag:
- Github
- Hugo
- Static Site
title: From Github Pages to Firebase, then to a VPS
type: post
url: /tech/switching-from-github-pages-to-firebase/
youtube_id: null
---

Ever since I [went static](/tech/jekyll/), I have been using Github Pages, an *almost* perfect solution for small static sites.

The only real shortcoming of Github Pages is the lack of control over the webserver, and hence the lack of control over caching and server-side redirect. While using Cloudflare does give you back some control, redirect capability remains lacking.

A few weeks ago, I moved the site to Firebase, which was a step up from Github Pages in terms of its flexibility, though I remained somewhat dissatisfied for various minor annoyances. For instance, deployment to Firebase involves pushing all the files to Firebase instead of only new and changed files, which isn't a problem if this isn't 2016. Unlike Github, where you can view the files on Github website, there was no way to view the files on the Firebase Console (except the files count, which is rather pointless). Also, and this is in large part my fault, the change in my workflow has a number of issues that I couldn't resolve.

After searching for more alternatives, I came to the conclusion that the best result could only be had if I host my own website on a VPS.

### Caddy Webserver

Caddy is a lightweight webserver written in Go (same as Hugo), with interesting features such as automatic SSL, HTTP/2 support, experimental QUIC support, and more; and it is easy to set up. It also has an optional git add-on that pulls updates from remote git repositories, a fantastic feature for people who want to deploy their sites with git.

For further information on how this site is set up and deployed, see the post on [Hugo site deployment with Github, Travis CI, and Caddy Webserver](/tech/hugo-site-deployment-workflow/)

~~I stumbled upon Google Firebase on [this blog post](https://www.leowkahman.com/2016/07/14/static-blog-generated-by-hugo-hosted-on-google-firebase/), and I decided to give it a try. Google Firebase offers fast and easy-to-setup static site hosting that solves every last problem with Github Pages. Not only that, it offers free SSL in its free plan (1 GB storage and 10 GB download limit).~~

~~Switching away from Github Pages requires a new workflow, but with some small changes to my [deployment scripts](/tech/hugo-site-deployment-workflow/), I have been able to adapt to the new workflow with relative ease.~~

~~For more detailed instructions, you can visit the [documentation of Google Firebase](/tech/hugo-site-deployment-workflow/).~~
