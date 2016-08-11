---
date: 2016-05-06T11:27:27Z
description: Why I moved from Wordpress to Jekyll
seo_description: Going static with Jekyll is a good alternative to Wordpress, MySQL, and all the rest of it.
header:
  caption: ""
  image: code.jpg
tag:
- Jekyll
- Github
- Web Development
- Static Site
title: 'Jekyll: a static site generator'
type: post
url: /tech/jekyll/
---
(***Update: this site now runs on [Hugo](/tech/hugo-vs-jekyll-static-site-generator/)***)

For a long time, [Wordpress](https://wordpress.org) was my go-to software to create website. It is free, has a huge community, massive collection of plugins, is not too difficult to set up for basic use, and is capable of running big and complex website. I used Wordpress to run a fairly large and complicated site for quite a while, and it did the job.

But when it came to this particular website, I had one problem. Before migrating to [novelist.xyz](https://novelist.xyz), I used Wordpress on [peteryuchuang.com](http://peteryuchuang.com), which was very small and didn't have enough traffic to justify running a LEMP stack on [Linode](https://linode.com), as I did for my bigger website. Hosting a site on shared hosting, however, meant that the performance of the site was very poor. I needed an alternative.

### My problem with Wordpress

Wordpress has long evolved into a content management system that allows multiple users to create content with a WYSIWYG editor. Wordpress is so powerful that it can power huge websites such as newspapers and magazines (take a look at the [list of organisations using Wordpress](https://wordpress.com/notable-users/)).

But as the sole creator of all contents of a small website, Wordpress is now an overkill in terms of functions. Also, the use of database makes Wordpress expensive and slow to run. Wordpress is dynamic: all the contents of the posts and the pages are stored in the database, and those pages, in HTML, are generated on the fly when a visitor request that page. While caching plugins can eliminate the need to regenerate a page every time someone request it, your site will remain slow, cached or not, so long as you are using a cheap host.

After researching for a while, I came to the conclusion that in order to cut cost and improve performance, I had to abandon Wordpress.

### Jekyll: going static

Once upon a time, before CSS even existed, I coded personal websites in HTML. I would edit HTML files in Notepad and upload them to an FTP server. Doing that would be ridiculous now, of course, but the pages will load much faster than Wordpress.

I still need a host though.

Then I stumbled upon [Jekyll](https://jekyllrb.com/), a static site generator that can create blogs without database. It generates compiled, static HTML files for every page of the website, which can be hosted the website on Github for free. All you need to do is to code the template, create the content, and Jekyll and Github will take care of the rest.

### Some caveats

It all seems too good to be true: static pages, no database, on the uber-fast Github. What can possibly go wrong?

To me, there were at least a few problems when I started out building the earliest version of this website. The most important of them was the learning curve. Wordpress may be slow and expensive to run, but unless you get your hands dirty to tweak your theme, which requires php and database knowledge, using Wordpress isn't too difficult for the most part: you can write or edit a post on its WYSIWYG editor, then hit the "Publish" button when you are done. The post will appear on your site a few seconds later.

Using Jekyll on Github, on the other hand, requires posts and pages written in markdown. Also, it requires knowledge in using Git. A further complication will arise if you use custom plugins not supported by Github: you have to compile the site locally into HTML files first, which takes some extra waiting time, before pushing those HTML files to Github.

Another drawback of hosting on Github is the lack of server-side redirect. There is a built-in plugin for Github pages called [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from), but it uses the meta refresh tag instead of 301 redirect.

The first problem can be solved by using bash script to automate the process, and now I no longer find that a hindrance to my workflow. The second problem can be solved by hosting your website on Amazon AWS S3.

### But I use Jekyll on Github anyway

… because the lack of 301 redirect isn't, for now, too much of a problem for a website with so few pages and non-existent presence on search engine. Also, having tried AWS S3 for a while before, I have to say that it is too complicated to make a move worthwhile at the moment.

In any case, I think Jekyll is easier to use than Wordpress, and it serves my need very well that I don't see myself switching back to Wordpress any time soon.

Read more about the [optimisations I've made for this website](/tech/performant-jekyll-site-with-gulp-cloudflare/).
