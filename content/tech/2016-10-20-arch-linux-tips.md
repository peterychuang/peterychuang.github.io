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
url: /tech/arch-linux-tips/
youtube_id: null
---

Arch Linux has a reputation for being close to bleeding edge, and thus less stable than other distributions. Neither of those points are entirely true, however, as there are other distributions that ship new packages even quicker than Arch, and most updates don't produce catastrophic results. Though because Arch Linux is such that it encourages users to tinker with it, hiccups do occur more frequently in Arch Linux than others, which isn't so much a fault of the distribution itself.

The truth is that Arch Linux can be as stable as you want it to be. To achieve stability, you need more care and caution. Below are some tips for how to avoid problems.

### Avoid software packages from testing and other unstable repositories

The testing repository contains packages being tested, and hence less stable.

Extra caution is also advisable when installing packages from the AUR. If possible, take a look at the ```PKGBUILD``` file for the package before installing it.

### Don't update packages whenever there's an update available

Because being close to bleeding edge is one of the attractions of Arch Linux, users tend to want updates sooner rather than later. If an update breaks something, however, it takes time to fix, which is why you have to resist the temptation to update everything whenever an update becomes available, especially when you are in the middle of some important project. Consider postponing the update to the coming weekend.

### Read Arch Linux News before updating

[Arch Linux News](https://www.archlinux.org/news/) sometimes contains important advisory on software updates. Make sure you take a look of the page before updating.

### DO NOT clear the Pacman cache, ever

Pacman, the package manager, stores all the packages you've installed, including older and not-in-use packages, in ```/var/cache/pacman/pkg```. Unless you tell Pacman to remove unused packages, those packages stay on your hard drive, occupying ever bigger portion of your storage space as time goes by.

But clearing the cache is *not* a good idea unless you know with absolute certainty that you don't need them ever again. When one of the packages breaks something after an update, you may want to rollback the update, and that's when pacman cache comes to your rescue. For example, if you've just upgraded your kernel, and you soon realise it doesn't work, the simplest solution is to downgrade the kernel back to the previous version. Inside ```/var/cache/pacman/pkg```, you will find the tarball for your old kernel (e.g.: ```linux-4.7.6-1-x86_64.pkg.tar.xz```). To downgrade the kernel, simply use the following command:

{{< highlight bash >}}
sudo pacman -U /var/cache/pacman/pkg/linux-4.7.6-1-x86_64.pkg.tar.xz
{{< / highlight>}}

Instead of keeping everything or deleting everything from the cache, consider running ```paccache -rk 3``` to keep three most recent versions of all the packages, and ```paccache -ruk 0``` to remove uninstalled packages from the cache.

### Keep your Arch Linux USB drive handy

Software updates rarely make your machine un-bootable. But when that happens, you need the live USB of Arch Linux to save yourself.

After booting to the live USB, mount your hard drive, ```arch-chroot``` into the root partition of your installation, then fix the problems. For instance, you can boot the machine with the live USB and reverse software updates.

### Conclusion

Arch Linux is undoubtedly more challenging to use than other more beginner-friendly distros. But with these simple rules, and with the skills you've learned from [installing Arch Linux on the command lines](/tech/arch-linux-installation-guide/), you will find Arch Linux no more unstable than other distros.
