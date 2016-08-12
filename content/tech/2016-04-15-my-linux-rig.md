---
date: 2016-04-15T00:00:00Z
description: Learn more about Linux and my Linux experience
header:
  image: linux-header.jpg
tag:
- Linux
- Arch Linux
title: My Linux Rig
url: /tech/my-linux-rig/
---

Sometime in 2011 or 2012, I began to [use Linux exclusively as my primary operating system](/linux/my-linux-journey/).


### My Linux Machine

<img src="/assets/img/linux-header.jpg" style="width:100%">

I currently use Dell XPS 13 (9350) with dbrand skin as the computer for writing and other non-demanding stuff. For more demanding tasks such as photo-editing, I use a desktop machine with a quad-core processor with hyperthreading.


#### Specification (XPS 13)

* Intel Core i5-6200
* Full-HD Screen
* 8GB RAM
* 128 GB SSD


### Linux Distro of Choice

I use [Arch Linux](//archlinux.org) on all my Linux machines. I first experimented with Arch Linux on my current XPS 13 because its newest hardware did not go very well with my old Linux distro of choice, Linux Mint, as the packages in Linux Mint was stuck with a relatively old Ubuntu 14.04 LTS. I got used to Arch Linux quite quickly (It's Linux, after all, so most distros are kind of similar), and I enjoyed having the latest software packages and kernels being inside the core repository and [AUR](//aur.archlinux.org) without having to add PPA the old way in Ubuntu-based distro. I soon converted all my machines to Arch, and I have never been this happy about my computing experience.


### Kernel

On the XPS 13, I compiled my own kernel in the traditional way (i.e. downloading the source code from [kernel.org](//kernel.org) and patching it with additional fixes). At present, I am on 4.6.0-rc4 kernel with [patches provided by Frank Shin](//github.com/frank604/Dell-XPS-13-9350/tree/master/linux-dell) (thanks [Frank](//frankshin.com/)).

I use the pre-compiled kernel provided by Arch repository on all my machines except XPS 13.


### Theme

I use Gnome Desktop with [Flat-Plat-Blue theme](/linux/flat-plat-blue-gnome-gtk-theme-release), which I forked from Flat-Plat. The source code for the theme is available on my [Github](//github.com/peterychuang/Flat-Plat-Blue).


### Applications I use to write

Mostly Libreoffice Writer. But now that I get increasingly comfortable writing in markdown, I think I may one day write novels on gedit in markdown.


### This website

This website is powerd by [Jekyll](//jekyllrb.com/), a static site generator, and it's hosted on Github. [The source code and documentation can be accessed here](//github.com/peterychuang/peterychuang.github.io).

Learn more about [why I use Jekyll](/tech/jekyll/);
