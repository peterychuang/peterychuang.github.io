---
date: 2016-05-13T13:45:43-04:00
description: Generate pages for categories or tags on any URLs with Hugo
seo_description: How to customise the URLs of taxonomies pages on Hugo
header:
  caption: ""
  image: "code.jpg"
tag:
- Hugo
- Web Development
- Static Site
title: How to customise categories and tags URLs in Hugo
type: post
url: /tech/custom-urls-for-category-pages-in-hugo/
---

***Update: Here is a new [advanced hack for customising categories URLs](/tech/advanced-custom-urls-for-category-pages-in-hugo/)***

Hugo is a [great static site generator](/tech/hugo-vs-jekyll-static-site-generator/). Fast page build time and built-in live reload make Hugo a joy to use. But it isn't without its limitation.

One of the limitations I touched upon is [the lack of completely customisable taxonomies URLs](/tech/hugo-vs-jekyll-static-site-generator/). By default, categories are located in ```/categories/something```, and tags are located in ```/tags/something```. If you want to change the word "categories" or "tags" in the URLs into some other words, there is a simple solution, as I explained on [Github](https://github.com/spf13/hugo/issues/1208#issuecomment-218691671):

> Change the taxonomies part of the configuration file into something like this:
>
> {{< highlight yaml >}}
taxonomies:
tag: "hello" {{</ highlight >}}
> and in the front matter of your page, instead of using "tags", you use "hello":
>
> {{< highlight yaml >}}
hello:
- tag1
- tag2 {{</ highlight >}}
> The path to the tag listing will become http://yoursite/hello/tag1

But if you want to remove the word "categories" altogether, I have figured out a way to do it, which is quite similar to how you create category pages in [Jekyll](https://www.chrisanthropic.com/blog/2014/jekyll-themed-category-pages-without-plugins/).

Let's take the category "[short stories](/short-stories/)" as an example. First, create ```short-stories.md``` inside the ```content``` folder with the following front matter:

{{< highlight yaml >}}
---
layout: cat-list
title: Short Stories
description: My latest short stories
pagecat: short-stories
url: /short-stories/
---
{{</ highlight >}}

Next, in the ```layouts/_default``` folder, create ```cat-list.html``` with the following:

{{< highlight liquid >}}
{{ $pagecat := .Params.pagecat }}
<ul>
{{ range $key, $taxonomy := .Site.Taxonomies.categories }}
  {{ if eq $key $pagecat }}
    {{ range $taxonomy.Pages }}
    <li><a href="{{ .Permalink }}">{{ .Title }}</a></li>
    {{ end }}
  {{ end }}
{{ end }}
</ul>
{{</ highlight >}}

This reads the ```pagecat``` parameter from the front matter and matches with posts categories. Now, you can run ```hugo server``` and see a list of all [short stories](/short-stories/) in ```localhost:1313/short-stories/```. If you need a page for another category, simply create another markdown file with the appropriate front matter.

#### Caveats

This workaround isn't perfect. For a start, categories pages created using this method does **not** have pagination, which means visitors for a category page with a large number of posts will have a long page to scroll through.

Also, having these pages on custom URLs will not stop Hugo from generating taxonomies pages, which means ```/categories/short-stories/``` will still be generated. One workaround, if you publish your site on Github, is to put the ```categories``` directory into ```.gitignore```.

Admittedly, this isn't very pretty, but it does the job. If you have figured out a cleverer way to do this, please let me know in the comment below.
