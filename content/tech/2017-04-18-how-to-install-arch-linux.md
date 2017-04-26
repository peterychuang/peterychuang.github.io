---
aliases: null
date: 2017-04-16T23:03:58+02:00
description: An Arch Linux setup with LVM, LUKS, systemd-boot, and GNOME
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
title: How to install Arch Linux
type: post
url: /tech/arch-linux-installation-guide/
youtube_id: null
---
Arch Linux is known for, among many other things~~, such as being at the bleeding edge to a point of unstable~~ (*~~ask anyone trying to get GNOME 3.24 on time~~*), having no graphical installer, thus demanding command line knowledge, which is perhaps intimidating for some. However, **Arch Linux allows me to setup a system into my desired state in the shortest amount of time with the least hassles**, which is why I keep returning to Arch Linux despite its various annoyances.

The following setup guide is written primarily for myself, because even someone who has installed Arch Linux multiple times can't remember every step perfectly. Most of these steps, however, should be applicable to other setups. After the process, you should get a basic installation with GNOME on an encrypted logical volume.


### 1. Enable network connection

The first thing to do after booting from the installation USB drive is to enable network connection. The exact setup may vary, but for my setup with Intel Wifi card, which is supported by the Linux Kernel out-of-the-box, the first step is to run--

{{< highlight bash >}}
wifi-menu
{{< / highlight >}}

--to connect to a wifi network. After that, test your connection by pinging a random website, such as:

{{< highlight bash >}}
ping google.com
{{< / highlight >}}


### 2. Prepare your hard drive

My preferred setup is to have one partition as the EFI partition, and a LVM partition for the rest of the hard drive. There are various tools for partitioning hard drive, though I tend to use ```fdisk```. To set up the partitions for ```/dev/sda```, issue the following command:

{{< highlight bash >}}
fdisk /dev/sda
{{< / highlight >}}

If there are existing partitions that you wish to remove, press ```d``` and ```Enter```, then select the partitions you would like to remove one by one. Afterwards, press ```n``` and ```Enter``` to create new partitions.

The first partition to create is the EFI paritition. After pressing ```n``` and ```Enter```, ```fdisk``` will ask you a number of questions, such as the beginning and end of the parition you want to create. Other than the end of the first partition, which I will put ```+500M``` in, you can press ```Enter``` to use defaults.

By default, ```fdisk``` creates Linux filesystem for all the partitions. To create the correction partition types, press ```t``` and ```Enter```. First, change the partition 1 to EFI partition putting ```1``` as the HEX code. Repeat the process for partition 2, but put ```31```, which stands for Linux LVM.

When you have finished it, press ```w``` and ```Enter``` to write the change to the disk.

Next, we have to format the EFI partition with FAT32.

{{< highlight bash >}}
mkfs.vfat -F32 /dev/sda1
{{< / highlight >}}


### 3. Setup encryption and create partitions within the LVM

Encrypt the entire LVM partition by running--

{{< highlight bash >}}
cryptsetup --cipher aes-xts-plain64 --key-size 512 --hash sha512 luksFormat /dev/sda2
{{< / highlight >}}

You will be prompted to enter a passphrase twice. This passphrase will be used to unlock the partition in the future, as you are about to do now:

{{< highlight bash >}}
cryptsetup luksOpen /dev/sda2 arch
{{< / highlight >}}

You are about to create a swap partition as well as a root partition within the LVM partition. To create an 8GB swap partition and use all the rest of the space as the root partition, issue the following commands:

{{< highlight bash >}}
pvcreate /dev/mapper/arch
vgcreate vol /dev/mapper/arch
lvcreate --size 8G vol --name swap
lvcreate -l +100%FREE vol --name root
mkfs.ext4 /dev/mapper/vol-root
mkswap /dev/mapper/vol-swap
{{< / highlight >}}


### 4. Mount Partitions

{{< highlight bash >}}
mount /dev/mapper/vol-root /mnt
mkdir /mnt/boot
mount /dev/sda1 /mnt/boot
swapon /dev/mapper/vol-swap
{{< / highlight >}}


### 5. Install the system

To install the base system and GNOME desktop, issue the following command:

{{< highlight bash >}}
pacstrap /mnt base base-devel gnome
{{< / highlight >}}

This will give you the base system, GNOME, and all the dependencies, but without any other software. You can install more (or less) packages at this stage if you wish. If you want to use KDE instead, go ahead.


### 6. Generate ```/etc/fstab```

The ```/etc/fstab``` file stores the information about the filesystem, and this information will be used at startup to mount partitions. To generate the file, run:

{{< highlight bash >}}
genfstab -U /mnt >> /mnt/etc/fstab
{{< / highlight >}}

Open the generated ```/etc/fstab``` file to ensure all the necessary partitions are included and set up correctly.


### 7. Chroot into the system

In this step, we go into the root of the installation, which is mounted at ```/mnt``` for the moment, and pretend it is root:

{{< highlight bash >}}
arch-chroot /mnt
{{< / highlight >}}


### 8. Setup time zone, locale, and hostname

Now we set the timezone by creating symbolic link to the correct timezone file:

{{< highlight bash >}}
ln -s /usr/share/zoneinfo/Europe/Berlin /etc/localtime
hwclock --systohc --utc
{{< / highlight >}}

Browse the ```/usr/share/zoneinfo``` directory to find the right file to link to.

To setup the locale for the system, open ```/etc/locale.gen``` file--

{{< highlight bash >}}
nano /etc/locale.gen
{{< / highlight >}}

--and uncomment the language you wish to use for your system. In my case, it is ```en_GB.UTF-8 UTF-8```. After saving the changes, run:

{{< highlight bash >}}
locale-gen
{{< / highlight >}}


### 9. Create user account

Create your user account:

{{< highlight bash >}}
useradd -m -G wheel -s /bin/bash your-user-name
{{< / highlight >}}

This will put your user account into ```wheel``` group, which is necessary for using ```sudo``` (step 10).

Then setup your password:

{{< highlight bash >}}
passwd your-user-name
{{< / highlight >}}


### 10. Enable ```sudo```

This allows you to perform tasks with root privilege without using the actual root login. First, open ```/etc/sudoers```--

{{< highlight bash >}}
nano /etc/sudoers
{{< / highlight >}}

--and uncomment the following line to enable root privilege for users inside ```wheel``` group:

{{< highlight bash >}}
# %wheel ALL=(ALL) ALL
{{< / highlight >}}


### 11. Disable root login

Since your account can now perform tasks with root privilege, the actual root user is unnecessary, so it is safe to disable root account:

{{< highlight bash >}}
passwd -l root
{{< / highlight >}}

### 12. Configure ```mkinitcpio.conf```

To configure the generation of the initial ramdisk, you have to configure ```/etc/mkinitcpio.conf``` correctly. The most important part of the file is the ```HOOKS``` section. The following are the hooks I have for my use case:

{{< highlight bash >}}
HOOKS="systemd autodetect modconf keyboard block sd-encrypt sd-lvm2 filesystems"
{{< / highlight >}}

If there are other modules and hooks necessary for your use case, this is the time to configure them.

*Note: By default, ```base``` and ```udev``` hooks are used instead of ```systemd```. If you opt for the default setup instead, ```sd-encrypt``` and ```sd-lvm2``` should be replaced with ```encrypt``` and ```lvm2```. The setup for the bootloader entry will be different if you opt for the default setup.*


### 13. Generate initial ramdisk

After editing ```/etc/mkinitcpio.conf```, generate the image:

{{< highlight bash >}}
mkinitcpio -p linux
{{< / highlight >}}

### 14. Install bootloader

To install ```systemd-boot```, run:

{{< highlight bash >}}
bootctl --path=/boot install
{{< / highlight >}}

As ```systemd-boot``` doesn't generate boot entries automatically (strangely enough, ```systemd-boot``` can detect Windows installation and add an entry for Windows automatically), you have to create the entry yourself. Create ```/boot/loader/entries/arch.conf```. The exact content of this file will vary according to your specific setup, but it will look like this:

{{< highlight bash >}}
title   Arch Linux
linux   /vmlinuz-linux
initrd  /initramfs-linux.img
options rd.luks.uuid=[UUID of the encrypted logical volume] rd.lvm.lv=arch/root rd.lvm.lv=arch/swap rd.luks.options=discard resume=UUID=[UUID of Swap Partition] root=[UUID of Root Parition] ro quiet
{{< / highlight >}}

### 15. Enable GDM

GDM is a display manager. It must be enable to allow you to login to your desktop environment. To enable it on startup, run:

{{< highlight bash >}}
systemctl enable gdm
{{< / highlight >}}

### 16. Reboot and hope for the best

At this point, the installation should be completed. Exit ```chroot```, restart the computer, and remove the installation USB drive. If you can't boot into the system at this point, boot from the installation media again and attempt to fix it.

If you can boot into GNOME desktop, congratulations! You have completed the first step towards building your own system.

If you want more tips, head over to my tips on [what to do after a fresh Arch Linux install](/tech/things-to-do-after-installing-arch-linux/), and [how to keep your Arch Linux system stable](/tech/arch-linux-tips/)
