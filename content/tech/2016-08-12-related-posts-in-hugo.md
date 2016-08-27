---
aliases: null
date: 2016-08-12T15:29:12-04:00
description: This is how to show a fixed number of related posts in Hugo
header:
  caption: null
  caption_url: null
  image: code.jpg
layout: null
seo_description: How to show a fixed number of related posts in Hugo with intersect and scratch
tag:
- Hugo
- Static Site
- Web Development
title: How to show related posts in Hugo
type: post
url: /tech/related-posts-in-hugo/
youtube_id: null
---

The ability to show related posts is not yet a feature in Hugo. At present, one way to achieve this is by showing posts that have common tags or categories with the `intersect` function, as [described in Hugo's documentation](https://gohugo.io/templates/functions/#intersect).

This, however, will list all the posts with at least one common tag for any given post, which isn't what most people want. For a while, I have been using CSS to hide the list of related posts and only show the first three, a workaround [suggested by Justin Dunham](http://justindunham.net/blog-bells-and-whistles-in-hugo/), a workaround that I don't particularly like.

Today, I stumbled upon a solution, courtesy of [Hugo's disucssion forum](https://discuss.gohugo.io/t/show-a-list-of-related-content/1488/5). the [`scratch`](https://gohugo.io/extras/scratch) function can add a number to a counter, and once the counter reach a fixed number, Hugo will stop printing the list.

Combining these, below is the code for displaying *three* related posts:

{{< highlight go >}}
<ul>
  {{ $page_link := .Permalink }}
  {{ $tags := .Params.tags }}
  {{ range .Site.Pages.ByDate.Reverse }}
    {{ $page := . }}
    {{ $has_common_tags := intersect $tags .Params.tags | len | lt 0 }}
    {{ if and $has_common_tags (ne $page_link $page.Permalink) (lt ($.Scratch.Get "$i") 3)}}
      {{ $.Scratch.Add "$i" 1 }}
      <li class="relatedPost">
        <a href="{{ $page.RelPermalink }}">{{ $page.Title | markdownify }}</a>
      </li>
    {{ end }}
  {{ end }}
</ul>
{{< / highlight >}}

Now I wonder what took me so long to find this.

**Update (27 Aug 2016)**

It turns out this can be done with ```{{ range }}``` loop alone, which not only greatly simplifies the codes, but also improves the site build time dramatically. Hugo is fast, so you won't feel the difference, though shaving off 100ms from 500ms build time is significant regardless.

{{< highlight go >}}
<ul>
  {{ range first 3 ( where ( where .Site.Pages.ByDate.Reverse ".Params.tags" "intersect" .Params.tags ) "Permalink" "!=" .Permalink ) }}
    <li class="relatedPost">
      <a href="{{ .RelPermalink }}">{{ .Title | markdownify }}</a><br />
      {{ .Description | markdownify }}
    </li>
  {{ end }}
</ul>
{{</ highlight >}}
