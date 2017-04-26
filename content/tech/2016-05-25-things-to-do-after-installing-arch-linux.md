---
aliases: null
date: 2016-05-25T14:17:22-04:00
description: Turning a minimal installation into something enjoyable to use
header:
  caption: null
  caption_url: null
  image: code.jpg
seo_description: Default Arch Linux installation is minimal. Here are a few recommendations on how to make your Arch Linux installation a joy to use.
tag:
- Linux
- Arch Linux
title: Ten things you need to do after installing Arch Linux
type: post
url: /tech/things-to-do-after-installing-arch-linux/
---

[Arch Linux](https://www.archlinux.org/) is famous for its seemingly intimidating installation process that, by default, only gets you to a base system where almost nothing is in it. From that point, you will have the opportunity to build a system that consists only of what you need, such as the display manager and desktop environment of your choosing.

But even after installing and booting into your favourite desktop environment, the road to building daily driver is far from finished. Assuming you have sorted out the display server and desktop environment, you may want to do the following things in order to make your Arch Linux machine a joy to use.


#### Install Yaourt

[Yaourt](https://archlinux.fr/yaourt-en) is a Pacman frontend on command line which supports [AUR](https://wiki.archlinux.org/index.php/AUR), a repository that any Arch Linux will use sooner or later. Without Yaourt, it would be quite a hassle (if not impossible) to install most of the packages below.

#### Install Git

Whether you use Github or not, you will likely be required to have [Git](https://www.archlinux.org/packages/extra/x86_64/git/) at some point, as many of the packages from AUR are built from Git repositories.

To install Git, enter ```pacman -S git``` into your terminal

#### Install Pamac

Although Pacman and Yaourt are convenient, there are moments when you may want a graphical user interface.

[Pamac](https://aur.archlinux.org/packages/pamac-aur/) is a graphical frontend for Pacman and AUR. Originally developed for Manjaro Linux, an Arch-based distribution, Pamac has some nifty features such as a little tray icon to remind you of availability of new updates.

To install Pamac, enter ```yaourt -S pamac-aur``` and follow the instructions.

#### ~~Install Infinality for beautiful font-rendering~~~

~~Unlike Ubuntu-based distributions, font-rendering on Arch Linux is awful on default setting; so awful that it hurts to look at the screen.~~

~~There are multiple solutions to this problem, but the simplest one is to use [Infinality](https://aur.archlinux.org/packages/fontconfig-infinality/).~~

~~To use Infinality, install ```fontconfig-infinality``` and ```freetype2-infinality``` from AUR.~~

~~*Update 31 March 2017*~~

~~Infinality is dead. Fortunately, the default font-rendering is now much better than it was a year ago; unfortunately, the patched ```freetype2``` and ```fontconfig``` still do a better job than the unpatched ```freetype2``` and ```fontconfig```.~~


#### Tweak font-rendering
*Update 26 April 2017*

Font-rendering looks terrible on default. But with [a few tweaks](/tech/improve-font-rendering-arch-linux-no-infinality/), texts will look great.

#### Install Fonts

After fixing font-rendering, we need some pretty fonts.

On my own machines, I've installed [Google fonts](https://aur.archlinux.org/packages/ttf-google-fonts-git/) and [Microsoft fonts](https://aur.archlinux.org/packages/ttf-ms-fonts/). If you need to deal with texts in non-Latin characters, you may need to install [some other fonts](https://wiki.archlinux.org/index.php/fonts).

#### Install GNOME Tweak Tool

For GNOME Desktop user, GNOME Tweak Tool is a must.

#### Install icon theme

[Numix circle](https://aur.archlinux.org/packages/numix-circle-icon-theme-git/) is my favourite icon theme at the moment.

To use Numix circle icon theme, install ```numix-circle-icon-theme-git``` and ```numix-icon-theme-git``` from AUR.

#### Install your favourite theme and wallpaper

There are hundreds of themes available online and on AUR for you to choose from, including [the one I created](/tech/flat-plat-blue-gnome-gtk-theme-release/) for GNOME.

#### ~~Install Lighttable~~

~~[Lighttable](http://lighttable.com/) is a new, open-source code editor. I've been using it to code this website and blog on this website in markdown, and I find Lighttable adequate.~~

~~To use Lighttable, install `lighttable` from AUR.~~

#### Install Atom

[Atom](https://atom.io/) is an editor developed by Github with Git integration built-in. An additional package `git-plus` adds additional Git capabilities to the editor, such as pushing to a remote repository without ever opening the terminal.

To use Atom, install `atom-editor-bin` from AUR.

#### Web browsers, Office, Video, and so on...

You will most probably want to install Google Chrome, Firefox, LibreOffice, VLC, Dropbox, Spotify. All these applications are available either on Arch official repository or AUR.

There may still be a few things missing at this point, depending on your specific need, but now you are 10 steps closer to having your daily driver running on Arch Linux.

#### Bonus: Install TLP for better battery life on laptops

If you use Arch Linux (or any Linux distributions) on a laptop, [TLP](https://www.archlinux.org/packages/community/any/tlp/) is a tool that helps conserve battery life. TLP is one of a few power management tools for Linux on laptops, and I find it the easiest to use and with satisfactory result.
