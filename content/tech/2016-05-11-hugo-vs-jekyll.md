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
- Web Development
title: 'Hugo vs. Jekyll: a showdown of static site generator'
type: post
seo_title: "Hugo vs. Jekyll: which static site generator should you choose?"
url: /tech/hugo-vs-jekyll-static-site-generator/
---

~~Last week, I mentioned that [this site is built using Jekyll](/tech/jekyll/), a static site generator that, once you get used to it, is [much faster to load](/tech/performant-jekyll-site-with-gulp-cloudflare/) and more convenient than dynamic content management system such as Wordpress.~~

(***Update: this site now runs on Hugo***)

![Jekyll](/assets/img/jekyll.png)

### Jekyll is way too slow

Jekyll is a good alternative to things like Wordpress, but it isn't without its own problem: [the loading speed of the compiled static pages may be very fast](/tech/performant-jekyll-site-with-gulp-cloudflare/) because they are static, but those pages take a long time to build. At present, this website has just about 20 posts and pages, yet the entire website take about 3 seconds on my [XPS 13](/tech/my-linux-rig/) to build, and 2 seconds on my more powerful desktop, which is pretty bad. Worse still, the build time seems to grow exponentially with the size of the site: after experimenting with dummy posts, I found that at about a thousand posts, the build time for my current setup would be counted not in seconds, but in minutes, **many minutes**; in fact, I lost patience and couldn't see it to the end.

This particular problem with Jekyll is quite well known, but there are limited things one can do about it. The slowness is acceptable in the short-run, but as I intend to grow this website, Jekyll isn't good enough for the long-term unless it gets a lot faster in the future.

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

(*Updated on 12 August 2016*)

After using Hugo for quite some time now, many of the problems I initially encountered have either been solved with some workarounds or some functions I didn't realise exist.

One of the biggest problem I had is the lack of flexibility in setting URLs for taxonomies, such as categories and tags. For instance, there are no way to change ```/categories/short-stories/``` to [```/short-stories/```](/short-stories/), although it is possible to change from ```/categories/short-stories/``` to [```/something-else/short-stories/```](/short-stories/). Since then, I've written about two different ways to tackle this problem, the first of which produces [one single index page for each category](/tech/custom-urls-for-category-pages-in-hugo/), while the new one emulates the [default behaviour of Hugo](/tech/advanced-custom-urls-for-category-pages-in-hugo/) with the help of Gulp.

Another missing feature is the ability to [show a fixed number of related posts](/tech/related-posts-in-hugo/) with ease, though I've discovered [a way to achieve](/tech/related-posts-in-hugo/) this without [resorting to using CSS to hide unwanted items](http://justindunham.net/blog-bells-and-whistles-in-hugo/). While not yet perfect, it serves my need well enough now.

With the [incorporation of Travis CI into my workflow](/tech/hugo-site-deployment-workflow/), Hugo is now the perfect program for my need in this website.

### Hugo or Jekyll, which should you choose?

The short answer to this question is, of course: it depends.

Both would be great for small websites, such as one-pager sites or personal blogs with small number of pages and simple hierarchy. In that case, the slow build time of Jekyll isn't going to be too much of a problem or annoyance.

Jekyll, while a lot slower than Hugo, is much easily more extensible by plugins (note that, however, using large number of plugins can slow build time). As one of the oldest static site generator with active development, you can depend on its community for support.

Hugo is a lot faster, making it suitable for people who already have large sites or expect their sites to grow large. While limited in extensibility by way of plugins, Hugo has a lot of built-in features that are likely more than enough for your need. However, if there are features that you need that Hugo doesn't have yet, then you may want to look elsewhere.
