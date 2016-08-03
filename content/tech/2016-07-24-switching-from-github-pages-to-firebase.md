---
aliases: null
date: 2016-07-24T15:07:55-04:00
description: This website is now hosted on Firebase, and here is the rationale for the switch
header:
  caption: null
  caption_url: null
  image: code.jpg
layout: null
seo_description: null
tag:
- Github
- Firebase
- Hugo
- Static Site
title: From Github Pages to Google Firebase
url: /tech/switching-from-github-pages-to-firebase/
youtube_id: null
---

Ever since I [went static](/tech/jekyll/), I have been using Github Pages, an *almost* perfect solution for small static sites.

The only real shortcoming of Github Pages is the lack of control over response headers, and hence the lack of control over caching and server-side redirect. While using Cloudflare does give you some control over caching, server-side redirect remains missing.

I stumbled upon Google Firebase on [this blog post](https://www.leowkahman.com/2016/07/14/static-blog-generated-by-hugo-hosted-on-google-firebase/), and I decided to give it a try. Google Firebase offers fast and easy-to-setup static site hosting that solves every last problem with Github Pages. Not only that, it offers free SSL in its free plan (1 GB storage and 10 GB download limit).

Switching away from Github Pages requires a new workflow, but with some small changes to my [deployment scripts](/tech/hugo-site-deployment-workflow/), I have been able to adapt to the new workflow with relative ease.

For more detailed instructions, you can visit the [documentation of Google Firebase](/tech/hugo-site-deployment-workflow/).
