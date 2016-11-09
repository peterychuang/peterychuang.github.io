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

But the main attraction of Arch Linux--being more up-to-date than other distros--is also its biggest liability. The newest software packages may break your desktop theme, make the screen flickers, render the system un-bootable, etc. To be sure, most updates don't break anything, and some updates break things even in other supposedly "stable" Linux distributions, though hiccups do occur more frequently in Arch Linux than others if you don't know what you are doing.

The truth is that Arch Linux is as stable as you want it to be. To achieve stability, you need more care and caution. Below are some tips for how to avoid problems.

### Avoid software packages from testing and other unstable repositories

The testing repository contains packages being tested, and hence less stable.

Extra caution is also advisable when installing packages from the AUR.

### Don't update software packages whenever an update is available

When a software update break something, it takes time to fix.

That's why you may want to resist the temptation to update everything whenever an update becomes available, especially when you are working on an important project due in three days. In that case, consider updating over the weekend when you have more time in your hands.

### Read Arch Linux News before updating

[Arch Linux News](https://www.archlinux.org/news/) sometimes contains important advisory on software update. Make sure you take a look of the page before updating.

### Don't clear the Pacman cache unless you know what you are doing

Pacman, the package manager, stores a cache of packages, including older and not-in-use packages, in ```/var/cache/pacman/pkg```. Unless you tell Pacman to remove unused packages, those packages stay on your hard drive, occupying ever bigger portion of your storage space as time goes by.

Clearing the Pacman cache is simple. To remove packages not currently in use, you can simply use the following command:

{{< highlight bash >}}
pacman -Sc
{{< / highlight>}}

But clearing the cache is *not* a good idea unless you know with absolute certainty that you don't need them ever again. When one of the packages happens to not work, you may want to downgrade the package, and that's when pacman cache comes to your rescue. For example, if you've just upgraded your kernel, and soon realised it doesn't work. The simplest solution is to temporarily downgrade the kernel back to the previous version. Inside ```/var/cache/pacman/pkg```, you will find the tarball for your old kernel (e.g.: ```linux-4.7.6-1-x86_64.pkg.tar.xz```). To downgrade the kernel, simply use the following command:

{{< highlight bash >}}
sudo pacman -U /var/cache/pacman/pkg/linux-4.7.6-1-x86_64.pkg.tar.xz
{{< / highlight>}}

You may also want to use the ```paccache``` command to control over how many packages to keep. For example, ```paccache -rk 3``` keeps 3 most recent versions in the cache, while ```paccache -ruk 0``` removes all uninstalled packages.

### Keep your Arch Linux USB drive handy

Software updates rarely make your machine un-bootable. But when that happens, you need the live USB of Arch Linux to save yourself.

After you booting to the live USB, mount your hard drive, change root to the root directory of the hard drive using ```arch-chroot```, then fix the problems. For instance, you can boot the machine with the live USB and reverse software updates.

### Conclusion

Arch Linux is undoubtedly more challenging to use than other more beginner-friendly distros. But with these simple rules, you will find Arch Linux no more unstable than other distros.
