---
aliases: null
date: 2016-05-19T07:49:12-04:00
description: "A demonstration of using Data Files in a Hugo-powered site"
seo_description: Here is a demonstration of how I use Hugo's Data Files to manage a certain pages on this website easily.
header:
  caption: null
  caption_url: null
  image: code.jpg
tag:
- Hugo
- Static Site
- Web Development
title: "How to use Data Files in Hugo: an example"
type: post
url: /tech/hugo-data-files/
---

In this article, I am going to demonstrate how to use Data Files in Hugo site generator.

#### The Problem

As an effort to grow this website, I thought it might be a good idea to have a collection of [interesting quotes by great novelists and writers](/novelists-on-everything/). Even if it doesn't help traffic, it would still be beneficial for me as a writer.

An easy and obvious way to achieve this is to create a regular page and list all the quotes inside that page. But as the page grows longer and longer, maintaining such a page will sooner or later become difficult. A better solution would be to organise the list by novelist, each of them would have their own individual data file. Inside the data file, the quotes are further organised by book.

#### The Solution

##### *The organisation of Data Files*

In Hugo, [Data Files](https://gohugo.io/extras/datafiles/) are placed inside the ```data``` folder. Inside, you can further organise the files into different levels of sub-folders. For example, I have a folder named ```novelists```, and inside ```novelists``` I have one more level of sub-folders, in which I store my data in YAML (you can choose to use TOML and JSON).

{{< highlight bash >}}
└── novelists
    └──everything
        ├── Knausgaard_Karl_Ove.yaml
        ├── Kundera_Milan.yaml
        ├── Proust_Marcel.yaml
        └── Tolstoy_Leo.yaml
{{< /highlight >}}

#### *The data files*

Each YAML file is dedicated to one novelist. Inside each YAML file, the data are organised as follow:

{{< highlight yaml >}}
name: Leo Tolstoy
bio: "Russian novelist, best known for his novels *War and Peace*, *Anna Karenina* and various essays."

sources:
- title: "Anna Karenina"
  quotes:
  - entry: "quote no. 1"
    comment: "comment no. 1"
    credits: "credit no. 1"
  - entry: "quote no. 2"
    comment: "comment no. 2"
    credits: "credit no. 2"

- title: "War and Peace"
  quotes:
  - entry: "quote no. 3"
    comment: "comment no. 3"
    credits: "credit no. 3"
{{< /highlight >}}

#### *Accessing the data*

The data stored inside ```./data/novelists/everything/*.yml``` can be accessed via ```.Site.Data.novelists.everything```. The snippet below is a simplified version of the actual code used in this website:

{{< highlight go >}}
{{ range .Site.Data.novelists.everything }}
  <h3>{{ .name }}</h3>
  <p>{{ .bio }}</p>
  {{ range .sources }}
    <h4>{{ .title }}</h4>
    {{ range .quotes }}
      <blockquote>
        <p>{{ .entry }}</p>
        {{ if .credits }}<p><small><em>{{ .credits }}</em></small></p>{{ end }}
      </blockquote>
      {{ if .comment }}<p>{{ .comment }}</p>{{ end }}
      <p><br /></p>
    {{ end }}
{{ end }}
{{< /highlight >}}

This block of codes does the following things:

1. Shows the name of the novelist
2. Shows the brief biography
3. Lists the books
4. Under each book, shows quotes, comments, and credits.

The result of it, with actual content, can be seen in "[What great novelists say about everything](/novelists-on-everything/)". The actual codes are on my [Github repository](https://github.com/peterychuang/peterychuang.github.io/blob/source/layouts/_default/novelists-on-everything.html).


*Read more:*
[Official documentation on Data Files](https://gohugo.io/extras/datafiles/)
