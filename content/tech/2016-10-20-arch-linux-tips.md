---
aliases: null
date: 2016-10-20T15:48:38-04:00
description: How to achieve maximum stability in Arch Linux
header:
  caption: null
  caption_url: null
  image: code.jpg
layout: null
seo_description: If you want to run Arch Linux as your daily driver, here are some recommendations on achieving maximum stability and avoiding problems
tag:
- Linux
- Arch Linux
title: Five Tips For Running Arch Linux As Daily Driver
type: post
url: null
youtube_id: null
---

Arch Linux has been my main (and only) operating system for the last six or seven months. Since I have a fairly new device (the late 2015 edition of XPS 13), I need the latest kernels and software packages in order to have a satisfactory experience on the device, and Arch Linux fulfils this requirement nicely.

But the main attraction of Arch linux--being more up-to-date than other distros--is also its liabilities. The newest software packages may not always work as you expected: they break your desktop theme, make the screen flashes randomly, render the system un-bootable, etc. To be sure, most updates don't break anything, and some updates break things even in other supposedly more "stable" Linux distributions, though hiccups do occur somewhat more frequently in Arch Linux than other more "stable" but less up-to-date distros if you don't know what you are doing.

The truth is that Arch Linux is as stable as you want it to be. To achieve stability, you need more care and caution. Below are some tips for how to avoid some of the pitfalls and how to fix problems.

### Avoid software packages from testing and other unstable repositories

The official testing repository contains packages being held in testing before they go into the core repository. Naturally, packages in testing repository are more likely to break things than the core, extra, and community repository, so it is best not to enable testing repository.

Although I don't discourage you from installing packages from AUR, extra caution is recommended, as the qualities of the packages in AUR vary considerably.

### Don't update software packages whenever an update is available

When a software update break something, you need to fix it, and fixing it takes time.

That's why you may want to resist the temptation to update everything whenever an update becomes available, especially when you are working on an important project due in three days. In that case, consider updating after you finish your job and over the weekend.

### Read Arch Linux News before updating

[Arch Linux News](https://www.archlinux.org/news/) sometimes contain important advisory on software update. Make sure you take a look of the page before updating.

### Don't clear the Pacman cache unless you know what you are doing

Pacman, the package manager, stores a cache of packages, including older and not-in-use packages, in ```/var/cache/pacman/pkg```. Unless you tell pacman to remove unused packages, those packages stay on your hard drive, occupying ever bigger portion of your storage space as time goes by.

Clearing the Pacman cache is simple. To remove packages not currently in use, you can simply use the following command:

{{< highlight bash >}}
pacman -Sc
{{< / highlight>}}

However, clearing the cache is *not* a good idea unless you know with absolute certainty that all of the currently in-use packages are working properly. When one of the installed packages happens to not work, you may want to downgrade the package, and that's when the pacman cache comes to your rescue. For example, if you've just upgraded your kernel to 4.8, and soon realised that something is broken. The simplest and quickest solution is to temporarily downgrade the kernel back to the previous version. Inside ```/var/cache/pacman/pkg```, you will find the tarball for kernel 4.7.6 (```linux-4.7.6-1-x86_64.pkg.tar.xz```). To downgrade the kernel back to 4.7.6, simply use the following command:

{{< highlight bash >}}
sudo pacman -U /var/cache/pacman/pkg/linux-4.7.6-1-x86_64.pkg.tar.xz
{{< / highlight>}}

Unless you absolutely need to free up some storage space and are sure that every piece of software is working properly, don't clear everything the Pacman cache.

Alternatively, you may want to use the ```paccache``` command to have a better control over how many packages to keep. For example, ```paccache -rk 3``` keeps 3 most recent versions in the cache, while ```paccache -ruk 0``` removes all uninstalled packages.

### Keep your Arch Linux USB drive handy

Software updates rarely go so badly that you cannot even boot into your machine. But when catastrophe strikes, you need your bootable Arch Linux installation media to save yourself.

The idea is simple: after you boot your machine with the bootable media, mount your hard drive, change root to the root directory of the hard drive using ```arch-chroot```, then fix the problems. For instance, if you are unable to boot into the Desktop Environment and reverse your software updates, you can boot the machine with the USB drive and perform downgrades there.

### Conclusion

Arch Linux is undoubtedly more challenging to use than other more beginner-friendly distros. But with these simple rules, you will soon find Arch Linux no more unstable than other distros.
