---
aliases: null
date: 2017-04-26T00:40:45+02:00
description: Texts can still look beautiful without Infinality patches
draft: false
header:
  caption: null
  caption_url: null
  image: code.jpg
layout: null
seo_description: null
tag:
- Linux
- Arch Linux
title: How to make fonts look good on Arch Linux
type: post
url: /tech/improve-font-rendering-arch-linux-no-infinality/
youtube_id: null
---
Let's face it: the plain vanilla font rendering on Linux was horrible. For a long time, I had relied on Infinality patches for ```freetype2``` and ```fontconfig``` to improve how texts looked on Arch Linux, and the result was impressive.

But then, the upstream of Infinality died. For some months now, I had been holding onto the patched ```freetype2``` and ```fontconfig``` as I was unable to find an acceptable alternative, though it was obvious that I had to make do with the plain vanilla ```freetype``` and ```fontconfig``` at some point. Even though parts, if not all, of Infinality patches had been [merged](https://git.savannah.gnu.org/cgit/freetype/freetype2.git/log/?qt=grep&q=infinality) into ```freetype2```, the texts remained quite ugly for some reason; not as ugly as the plain vanilla ```freetype2``` used to look a year ago, perhaps, yet far from how the patched version looked. I was clearly missing something.

It turns out that although those patches have been merged into ```freetype2```, they aren't enabled by default. In order to enable "Infinality mode" in plain vanilla ```freetype2```, edit ```/etc/profile.d/freetype2.sh``` to include the following line:

{{< highlight bash >}}
export FREETYPE_PROPERTIES="truetype:interpreter-version=38"
{{< / highlight >}}

Then create the following symbolic links in ```/etc/fonts/conf.d``` if they aren't already present:

{{< highlight bash >}}
ln -s ../conf.avail/10-hinting-slight.conf
ln -s ../conf.avail/10-sub-pixel-rgb.conf
ln -s ../conf.avail/11-lcdfilter-default.conf
{{< / highlight >}}

With these few tweaks, the [un-patched version](/assets/img/vanilla.jpg) looks identical to the [patched one](/assets/img/infinality.jpg) for truetype Latin script.
