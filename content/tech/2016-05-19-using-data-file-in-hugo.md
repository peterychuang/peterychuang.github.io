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
url: /tech/hugo-data-files/
---

In this article, I am going to demonstrate the use of Data Files in Hugo site generator.

#### The Problem

As an effort to grow this website, I thought it might be a good idea to have a collection of [interesting quotes by great novelists](/novelists-on-everything/). Even if it doesn't help grow the website, it would still be beneficial for me as a writer.

An obvious way to do this is to create a regular page and list all the quotes inside that page. Such a page is easy to create, but as I expect to the page to increase in length, it may become difficult to maintain in the long run.

Instead, I want to organise all the quotes by the names of the novelists, each of who have their own individual data file. Upon page compilation, Hugo should read from all the files and put the data onto one single, static HTML file, ready to be deployed.

#### The Solution

##### *The organisation of Data Files*

In Hugo, [Data Files](https://gohugo.io/extras/datafiles/) are placed inside the ```data``` folder. Inside, you can further organise the files into different levels of sub-folders. For example, I have a folder named ```novelists```, and inside ```novelists``` I have one more level of sub-folders, inside which I store my data in YAML (you can choose to use TOML and JSON).

{{< highlight bash >}}
└── novelists
    └──everything
        ├── Knausgaard_Karl_Ove.yaml
        ├── Kundera_Milan.yaml
        ├── Proust_Marcel.yaml
        └── Tolstoy_Leo.yaml
{{< /highlight >}}

#### *Inside the data files*

Each YAML file is dedicated to one novelist. Inside each YAML file, the data are organised as following:

{{< highlight yaml >}}
name: Leo Tolstoy
bio: "Russian novelist, best known for his novels *War and Peace*, *Anna Karenina* and various essays."

sources:
  "Anna Karenina":
    quotes:
      "Quote 1":
        comment: "Comment on Quote 1."
      "Quote 2":
        comment: "Comment on Quote 2."
  "War and Peace":
    quotes:
      "Quote 3":
        comment: "Comment on Quote 3."
      "Quote 4":
        comment: "Comment on Quote 4."

{{< /highlight >}}


#### *Accessing the data in a page*

The data stored inside ```./data/novelists/everything/*.yaml``` can be accessed via ```.Site.Data.novelists.everything```. The snippet below is a simplified version of the actual code I wrote for this website:

{{< highlight go >}}
{{ range .Site.Data.novelists.everything }}
  <h3>{{ .name }}</h3>
  <p>{{ .bio | markdownify }}</p>
  {{ range $book, $i := .sources }}
    <h4>{{ $book }}</h4>
    {{ range $q, $j := .quotes }}
      <blockquote>{{ $q | markdownify }}</blockquote>
      <p>{{ .comment | markdownify }}</p>
    {{ end }}
  {{ end }}
{{ end }}
{{< /highlight >}}

This block of codes does the following things:

1. Show the name of the novelist
2. Show the brief biography
3. List names of books
4. Under each book, show quotes and comments

The result of it, with actual content, can be seen in [What great novelists say about everything](/novelists-on-everything/) page.

To see the actual codes, which include a table of content and links to anchors, you can visit the [corresponding file on my Github repository](https://github.com/peterychuang/peterychuang.github.io/blob/source/layouts/_default/novelists-on-everything.html).

Read more:
[Official documentation on Data Files](https://gohugo.io/extras/datafiles/)
