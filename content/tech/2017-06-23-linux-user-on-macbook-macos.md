---
date: 2017-06-23T15:47:22-04:00
description: MacBook Pro isn't a professional machine, and macOS isn't impressive
seo_description: MacBook Pro (2017) is hardly a professional machine, and macOS is not impressive at all from the perspective of a long-time Linux user
header:
    caption:
    caption_url:
    image: code.jpg
tag:
- Linux
- Apple
title: A Linux user's thoughts on MacBook Pro and macOS
type: post
url: /tech/linux-user-on-macbook-macos/
draft:
layout:
aliases:
youtube_id:
---
As a full-time Linux user, I have never cared much about Apple products. All of my previous computers were PCs that came with Microsoft Windows, which I invariably removed before putting Linux on it. Apple products are overpriced, and installing Linux on MacBooks is, in general, trickier than on an average PC, so I have looked away from MacBooks for years.

Then my Dell XPS 13 died, and I discovered that Dell had terrible service in my part of the world, so I couldn't get it repaired. In need of a working laptop, I was prepared to get a new one. It turns out that the choice of laptops is somewhat limited in my part of the world compared to the United States: I'd have chosen the LG Gram 13 if it were available, or HP Spectre if it weren't sold at higher price than in the US. Out of the options I had, the cheapest model of the 2017 MacBook Pro turned out to be the best option in terms of specifications and pricing.

That was most unfortunate, as I had never been an Apple fan; and when even [Apple fans were disappointed by recent Apple launches](https://char.gd/blog/2017/why-i-left-mac-for-windows-apple-has-given-up), I felt this might not be the best time to buy a MacBook Pro. After much trepidation, I pulled the trigger and ordered the new MacBook Pro anyway. My eventual goal is to put Linux on it, but I am also interested to use macOS for a while to see how it stacked up against Linux.

### The Hardware

There is no denying that Apple has great hardware design and build quality, and for a long time, I have been wondering why other PC manufacturers haven't been able to catch up.

The new MacBook Pro is nicely crafted, as always. The overall construction seems solid, the screen looks great, it has good battery life, and it can be opened with one hand. However, it is no longer as outstanding as it used to be, as other manufacturers have caught up a lot in the past few years.

### macOS: is this all you've got?

As I turned on the machine for the first time, I discovered the first annoyance: straight out of the box, almost 20GB of storage has been used. Coming from Linux, where fresh installs usually take just a few gigabytes, I find the size of macOS, along with everything that comes with it, outrageously large. For now, I am fine with it, as most of my work are text-based. But the fact that I almost can't perform tasks like photo and video editing because the SSD is too small (never mind the lack of SD card slot and proper USB ports) begs the question of whether MacBook Pro is really a "Pro" machine (answer: NO).

As I continued navigating the system, googling every problem I found, and learning new keyboard shortcuts and trackpad gestures, I found macOS very similar to GNOME desktop.

{{< img src="/assets/img/gnome-epiphany.jpg" alt="GNOME Desktop with Epiphany, the default web browser" caption="GNOME Desktop with Epiphany, the default web browser" >}}

{{< img src="/assets/img/macos-safari.jpg" alt="macOS with Safari" caption="macOS with Safari" >}}


And there are almost nothing I can do on macOS that I can't on GNOME: Mission Control, Launchpad, Dock, Spotlight Search, and so on have their counterparts in GNOME. Even the massive trackpad with fancy gestures isn't all that fancy, as the [GNOME/Wayland/libinput stack](https://wiki.gnome.org/Design/OS/Gestures) has similar capabilities, if only somewhat less reliable. You may say that GNOME and macOS look and feel similar because GNOME desktop environment has taken inspiration from, or mimicked the design and functionalities of macOS, and you may very well be correct, but that doesn't change the fact that GNOME, a free and open-sourced desktop environment for a free and open-sourced operating system, is just as capable, if not more. Also, with some nice looking GNOME Shell/GTK+ theme, icon theme, wallpaper, and proper font-rendering, Linux can be as beautiful and polished as you want it to be.

***

Getting used to the basic operation of macOS is easy enough, but setting up macOS for Linux-ish stuff is not as straightforward. Just like on Windows, there is nothing like a proper package-manager. To get software, one either goes to the App Store, which requires logging in using Apple ID and is almost as pathetic as the one in Windows, or download individual applications from different websites, which seems like an ancient practice in the eyes of Linux users. Thanks to [Homebrew](https://brew.sh/), the self-proclaimed "missing package manager for macOS," I am able to get packages I need, but I don't like the fact that I have to install something that every Linux distribution has just to install packages, never mind the packages availability in Homebrew is nowhere near a normal Linux distribution. That makes me wonder if using the Linux subsystem on Windows is a more pleasant experience (if one can ignore the privacy issue and Microsoft's trickery to get your Windows machine to do weird things, like installing Candy Crush for no reason).

***

The possibility of customising macOS, needless to say, is much more limited than Linux. Even setting custom keyboard shortcut to open the Terminal turns out to be [rather complicated](https://apple.stackexchange.com/questions/20010/can-i-create-a-shortcut-to-open-a-specific-application-on-os-x). Compared that to GNOME:

{{< img src="/assets/img/gnome-keyboard.jpg" alt="Setting custom keyboard shortcuts in GNOME" caption="Setting custom keyboard shortcuts in GNOME" >}}

### The Verdict

Long story short: I'm not impressed, and there's no way I can use macOS in the long run.

I don't think MacBook Pro is a bad machine, though the "Pro" label is clearly a lie, and unless you are living in a place where HP Spectre is more expensive than MacBook Pro, you may as well just get an HP Spectre. macOS isn't a particularly terrible operating system either, though it fails to impress me in terms of its capabilities, while minor annoyances here and there are getting in the way of my workflows.

The superiority of Linux over macOS is a testament to the power of free and open-source software development. "The Year of Linux Desktop" is already upon us, even if the world fails to take notice.
