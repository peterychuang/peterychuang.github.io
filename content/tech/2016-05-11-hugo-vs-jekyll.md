---
date: 2016-05-11T06:12:12Z
description: A newcomer of static site generator taking on the big brother
seo_description: Hugo is a much newer static site generator than Jekyll, but it is much faster and packed with all features to suit your blogging need.
header:
  caption: ""
  image: code.jpg
tag:
- Jekyll
- Hugo
- Static Site
- Web
- Web Design
title: 'Hugo vs. Jekyll: a showdown of static site generator'
type: post
seo_title: "Hugo vs. Jekyll: which static site generator should you choose?"
url: /tech/hugo-vs-jekyll-static-site-generator/
---

~~Last week, I mentioned that [this site is built using Jekyll](/tech/jekyll/), a static site generator that, once you get used to it, is [much faster to load](/tech/performant-jekyll-site-with-gulp-cloudflare/) and more convenient than dynamic content management system such as Wordpress.~~

(***Update: this site now runs on Hugo***)

![Jekyll](/assets/img/jekyll.png)

### Jekyll is way too slow

Jekyll is a good alternative to things like Wordpress, but it isn't without its own problem: [the loading speed of the compiled pages may be very fast](/tech/performant-jekyll-site-with-gulp-cloudflare/), but those pages take a long time to be built. At present, this website has just about 20 posts and pages, yet the entire website take about 3 seconds on my [XPS 13](/tech/my-linux-rig/) to build, and 2 seconds on my more powerful desktop, which is pretty bad. Worse still, the build time will grow exponentially with the size of the site: after some experimenting with dummy posts, I found that at about a thousand posts, the build time for my current setup would be counted not in seconds, but in minutes, **many minutes**; in fact, I lost patience and couldn't see it to the end.

This particular problem with Jekyll is well reported, but there are limited things I can do to improve it. Jekyll is written in Ruby, which is not known for being fast, and the use of plugins worsens the situation. The slowness is acceptable in the short-run, but as I intend to grow this website, Jekyll isn't good for the long-term unless it gets a lot faster in the future. Imagine you are fixing one typo in a thousand-page Jekyll website, and you are going to wait for minutes to see the change goes live.

In other words, for large site, the slow build time of Jekyll is a bottleneck in your workflow.

(Note: I don't find incremental build feature a useful solution as some pages that are supposed to be re-built aren't re-built consistently)

So I dug around over the weekend, and I discovered one alternative: Hugo.

### Hugo is SUPER FAST

![Hugo](/assets/img/hugo.png)

After converting to Hugo, this entire website can be built in about 100 milliseconds when saved to disk (1 millisecond = 1/1000 of a second), a massive reduction of more than 90% from Jekyll.

{{< highlight javascript >}}
0 of 2 drafts rendered
0 of 1 future rendered
31 pages created
8 paginator pages created
40 tag created
6 categories created
in 84 ms
Watching for changes in /path-to-my-source/{data,content,layouts,static}
Serving pages from memory
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
{{< / highlight >}}

On average, each page (pagination, tags and categories pages included) takes about 1ms to build with Hugo, a massive improvement from the slowness of Jekyll

{{< youtube CdiDYZ51a2o 0 >}}

Converting from Jekyll to Hugo is not painless, but it's possible. The ```hugo import jekyll [jekyll_path] [hugo_path]``` command handles the conversion of posts and creation of the configuration file. Most of your time will be spent on convert your theme into [Go Template](https://gohugo.io/templates/go-templates/), the templating language for Hugo. For simple websites, the process of converting to Hugo should be relatively simple and straightforward. The Hugo-powered version of this website, [the source of which can be found here](https://github.com/peterychuang/peterychuang.github.io/tree/hugo), looks and behaves more or less the same as in the Jekyll-powered version~~, exception in areas where it doesn't, which I will explain below~~.

#### Nice features in Hugo

Hugo is packed with all the essential features for your basic blogging need, including those that would require additional plugins in Jekyll. For example, paginations work right out of the box (even for categories and tags pages!), and redirection is available using [aliases](https://gohugo.io/extras/aliases/). No more ```gem install jekyll-paginate``` or ```gem install jekyll-redirect-from```.

The organisation of content is intuitive. All posts and pages are located inside the content folder, and it can be organised in different subfolders:

{{< highlight javascript >}}
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
{{< /highlight >}}

I also like how Hugo handles drafts: instead of having to place unfinished posts inside the _draft folder, you can put "draft: true" in the front matter of the post, which is much more practical in preventing publication of unfinished post.

Another very useful feature of Hugo is the built-in livereload, which automatically refresh your browser once a change is detected on your site. This is very helpful, as I can tile my browser and text editor vertically, save my changes on the editor, and see the changes on the website immediately. Yes, you may enable this function on Jekyll with plugins, but having it built-in is much more convenient.

#### Issues with Hugo

~~But there are a few minor issues that prevent me from migrating at this moment~~.

For me, the biggest issue is that there is no straightforward way to change the URLs of category pages. My [short stories](/short-stories/), for instance, would be filed under ```/categories/short-stories/``` on Hugo instead of [```/short-stories/```](/short-stories/). It should be possible to change the ```/categories/``` bit into another word, but it is [not possible to remove it altogether](https://github.com/spf13/hugo/issues/1208). ~~Since I want to keep the URLs unchanged after switching, until I can find a clean way of doing this, switching to Hugo isn't feasible.~~ I've managed to find a dirty and clumsy way to [create category pages on any URLS of my choosing](/tech/custom-urls-for-category-pages-in-hugo/)), but this solution may not be ideal for everyone.

There also seems to be [no straight-forward way to implement for loop in Hugo](https://halfelf.org/2015/looping-hugo/). As someone who's primarily a writer of words, not writer of codes, I confess that this has been a problem for me when I tried to limit the number of related posts to be displayed (there are some [dirty way of doing this](http://justindunham.net/blog-bells-and-whistles-in-hugo/), but I thought this should have been much simpler).

### Hugo or Jekyll, which should you choose?

The short answer to this question is, of course: it depends.

Both would be great for small websites, such as one-pager sites or personal blogs with small number of pages and simple hierarchy. In that case, the slow build time of Jekyll isn't going to be a bottleneck in your workflow.

Jekyll, while a lot slower than Hugo, is much more extensible by large number of plugins. As one of the oldest static site generator with active development, you can depend on its sizeable community for support. Note that using large number of plugins will put slow down build time even more.

Hugo is a lot faster, making it suitable for people who already have large sites or expect their sites to grow large. The way Hugo works, however, limit the extensibilty, so you will have to rely on the developers to incorporate features inside Hugo. Despite its relative young age, Hugo has a lot of features already built-in, but if the features it lacks happen to be the ones you need most, you may want to wait, or contribute.

~~For now, I am staying on Jekyll. But my problems may not be problems for you, and you should definitely check it out yourself.~~

If you happen to have some good solutions for the problems I have with Hugo, I'd be grateful if you could drop me a comment below and point me to the right place.
