---
layout: post
title: "Hugo vs. Jekyll: a showdown of static site generator"
description: "A newcomer of static site generator taking on the big brother"
header:
    image_fullwidth: "code.jpg"
    caption: ""
category: tech
tags:
- jekyll
- hugo
- static-site
- web
- web-design
permalink: /tech/hugo-vs-jekyll-static-site-generator/
date:   2016-05-11 06:12:12 -0400
comments: true
draft: true
---
Last week, I mentioned that [this site is built using Jekyll](/tech/jekyll/), a static site generator that, once you get used to it, is [much faster to load](/tech/performant-jekyll-site-with-gulp-cloudflare/) and more convenient than dynamic content management system such as Wordpress.

<img src="/assets/img/jekyll.png" style="width:100%" alt="Jekyll" />

There is just one problem: the resulting pages may be fast, but Jekyll builds pages very slowly. At present, this website has just about 20 posts and pages. The entire website can be build in about 3 seconds on my [XPS 13](/tech/my-linux-rig/), or about 2 seconds on my more powerful desktop. But the build time will grow exponentially as the site becomes larger: after some experimenting with dummy posts, I found that at about a thousand posts, the build time for my current setup would be counted not in seconds, but in minutes, **many minutes**; in fact, I lost patience in my test and couldn't see it through to the end.

This particular problem with Jekyll is well-documented, but there are limited things I can do to improve it other than stripping the functionalities of the website to a bare minimal, which I won't. The slowness of page building is acceptable in the short-run, but as I intend to grow this website, the current set-up isn't good for the long-term unless Jekyll gets a lot faster in the future. Just imagine fixing one typo in one file in a thousand-page website, and you have to wait for minutes to see the change goes live. Ok, it will take a long time to get to 1000 posts, but I'd like to think big.

(Note: I don't find incremental build feature a useful solution)

So I dug around over the weekend, and I discovered one alternative: Hugo.

### Hugo is SUPER FAST

<img src="/assets/img/hugo.png" style="width:100%" alt="Hugo" />

This website, after converting to Hugo, can be built in about 80-100 milliseconds when saved to disk (1 millisecond = 1/1000 of a second), a massive reduction of more than 90% from Jekyll. That is a much better starting point than a 2-second build time if you expect your website to grow to include a thousand posts and hundreds of tags.

{% youtube CdiDYZ51a2o %}

Converting from Jekyll to Hugo is not painless, but it's possible. The ```hugo import jekyll [jekyll_path] [hugo_path]``` command handles the conversion of posts and creation of the configuration file. If you decide to make the move, most of your time will be spent on convert your theme into Hugo-compatible form. For simple websites, this process should be quite straightforward. When this website is tested on Hugo ([the source of the Hugo version of this website can be found here](https://github.com/peterychuang/peterychuang.github.io/tree/hugo)), it looks and behaves more or less the same, exception in areas where it doesn't, which I will explain below.

For basic blogging, Hugo is packed with all the essential features, including those that would require plugins in Jekyll. For example, paginations work right out of the box (even for categories and tags pages!), and redirection is available using [aliases](https://gohugo.io/extras/aliases/). No more ```gem install jekyll-paginate``` or ```gem install jekyll-redirect-from```.

The organisation of content is intuitive. All posts and pages are located inside the content folder, and it can be organised in different subfolders:

```javascript
├── content
│   ├── blog
│   │   ├── essays
│   │   │   ├── 2015-09-28-under-the-umbrella.md
│   │   │   ├── 2016-04-22-random-thoughts-on-marcel-proust-1.md
│   │   │   ├── 2016-05-09-on-music-art-and-fiction.md
│   │   │   └── 2016-05-11-on-happy-endings.md
│   │   ├── misc
│   │   │   └── 2014-05-04-my-dead-neighbour.md
│   │   ├── music
│   │   ├── on-writing
│   │   │   └── 2015-08-23-how-to-write-novels.md
│   │   ├── poetry
│   │   │   ├── 2016-04-14-lone-passenger.md
│   │   │   └── 2016-04-15-you-antidote-pain-love.md
│   │   ├── short-stories
│   │   │   ├── 2015-08-22-a-swimmer-from-the-desert.md
│   │   │   ├── 2015-08-27-face-without-glasses.md
│   │   │   ├── 2015-08-28-memory-eraser.md
│   │   │   ├── 2015-09-30-forgotten-music.md
│   │   │   ├── 2016-03-25-the-last-living-soul.md
│   │   │   ├── 2016-04-25-the-gang-leader.md
│   │   │   ├── 2016-05-04-wrong-affair.md
│   │   │   └── 2016-05-07-how-to-take-revenge-on-the-world.md
│   │   └── tech
│   │       ├── 2016-03-31-my-linux-journey.md
│   │       ├── 2016-04-11-flat-plat-blue-gnome-gtk-theme-release.md
│   │       ├── 2016-04-15-my-linux-rig.md
│   │       ├── 2016-05-06-jekyll-static-site-generator.md
│   │       └── 2016-05-06-super-fast-jekyll-sites.md

```

I also like how Hugo handles drafts: instead of having to place unfinished posts inside the _draft folder, you can put ```draft: true``` in the front matter of the post, which is much more practical in preventing publication of unfinished post.

### Some problems I have with Hugo

But there are a few minor issues that prevent me from migrating at this moment.

For me, most important of all, there seems to be no way to change the URLs of category pages to mimic the behaviour on Jekyll. My [short stories](/short-stories/), for instance, would be filed under ```https://novelist.xyz/categories/short-stories/``` on Hugo instead of [```https://novelist.xyz/short-stories/```](/short-stories/). It is possible to change the ```/categories/``` bit into another word, but it is [not possible to remove it altogether](https://github.com/spf13/hugo/issues/1208). Since I want to keep the URLs as they are right now, until there is a clean way of doing this, I still stay with Jekyll.

There also seems to be [no straight-forward way to implement for loop in Hugo](https://halfelf.org/2015/looping-hugo/). As someone who's primarily a writer of words, not writer of codes, I confess that this has been a problem for me. For instance, when I tried to limit the number of posts to be displayed in the related posts section, I couldn't figure out how (there are some [dirty way of doing this](http://justindunham.net/blog-bells-and-whistles-in-hugo/), but I thought this should have been much simpler).

### Which one should you choose?

The short answer to this question is, of course: it depends.

Both would be great for small websites, such as one-pager sites or personal blogs with small number of pages and simple hierarchy. In that case, the poor build performance in Jekyll isn't going to be a huge detriment to your workflow.

Jekyll, while a lot slower than Hugo, is much more easily extensible in its functionalities by large number of plugins. As one of the oldest static site generator with active development, you can depend on its sizeable community for support and bugfixes, something you should always take into consideration when choosing open source software. The downside of the amount of plugins you can choose from is that they will put a toll on build time if you choose to use many of them, especially on larger sites.

Hugo is a lot faster, making it suitable for people who already have large sites or expect their sites to grow large. The way Hugo works, however, limit the extensibilty of its functions, so you will have to rely on the developers to incorporate features inside Hugo. Despite its relative young age, Hugo has a lot of features already built-in, but if the features it lacks happen to be the ones you need most, you may want to wait, or contribute.

For now, I am staying on Jekyll. But my problems may not be problems for you, and you should definitely check it out yourself.

If you happen to have some good solutions for the problems I have with Hugo, I'd be grateful if you could drop me a comment below and point me to the right place.
