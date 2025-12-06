---
title: "Linux Hardening"
date: '2025-12-06T16:20:59+07:00'
tags: []
draft: false
cover:
    image: ""
    responsiveImage: true
---

This post lists the changes I make to a vanilla Arch Linux installation for privacy and security hardening. Most of the changes will work on any Linux distro that's reasonably up-to-date.

# Choosing distro
I use **Arch Linux** as my main Linux distro because:
- **Minimal**: Arch base is relatively small and minimal compared to "prebuilt" or "OOTB" distros like Fedora, Ubuntu or Linux Mint. This means I add only what I need instead of debloating or disabling what I don't.
- **Latest software**: Arch ships with latest kernel, latest software, upstream security patches. I don't have to wait 6-12 months to be updated like Ubuntu or Mint.
- **Full control**: When using Arch, I can use what software, services, kernel, ... I want, instead of using what shipped by default.

Otherwise, you can use any Linux distros you want.

# Disk configuration
## Partition
This is a minimal disk layout I use:
```
/boot   (unencrypted or GRUB cryptodisk, /dev/sda1 for example)
/       (LUKS2, /dev/sda2 for example)
```
I don't use a `swap` partition. Instead I use **zram-generator**, and I also avoid a `/home` partition so I don’t leave persistent files behind unnecessarily.

## Disk encryption
LUKS2 full-disk encryption:
```bash
# cryptsetup luksFormat --type luks2 /dev/sda2
# cryptsetup open /dev/sda2 cryptroot
```

Add this to `/etc/fstab`:
```
tmpfs /tmp tmpfs defaults,noexec,nosuid,nodev 0 0
```
This mounts `/tmp` as in-memory storage and prevents many classes of attacks.

## (Optional) ZRAM
Install:
```bash
# pacman -Sy zram-generator
```
Example config of `/etc/systemd/zram-generator.conf`:
```
[zram0]
zram-size = ram / 2
compression-algorithm = zstd
```

# Kernel
## Why not `linux-hardened`?
- **Outdated frequently**: Hardened builds usually arrive later than the mainline kernel, meaning you get important security patches slower.
- **Worse performance and compatibility**: Strict hardening options break some software and reduce performance, especially for desktop use, gaming, and virtualization.

## Kernel options 
Instead of hardened kernel, I use kernel options. Add the following to `/etc/default/grub`:
```
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3 apparmor=1 lsm=landlock,lockdown,yama,apparmor init_on_alloc=1 init_on_free=1 page_alloc.shuffle=1 slab_nomerge spec_store_bypass_disable=on spectre_v2=on l1tf=full,force randomize_kstack_offset=1 vsyscall=none"
```
Remember to install **AppArmor** and re-generate Grub config:
```bash
# pacman -Sy apparmor
# systemctl enable --now apparmor
# grub-mkconfig -o /boot/grub/grub.cfg 
```

# Firewall
I use UFW in this guide. UFW is simple, effective, and integrates well with systemd.
## Install and config
```bash
# pacman -Sy ufw
# systemctl enable --now ufw
# ufw default deny incoming
# ufw default allow outgoing
```
If you use SSH:
```bash
# ufw allow ssh
```
# Check status
```bash
# ufw status verbose
```

# DNS hardening
I use **dnscrypt-proxy**. There are other options like DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT), but I prefer DNSCrypt because it doesn't rely on the certificate authority model.
## Install
```bash
# pacman -Sy dnscrypt-proxy
# systemctl enable --now dnscrypt-proxy
```

Add this to `/etc/systemd/resolved.conf`:
```
[Resolve]
DNS=127.0.0.1
FallbackDNS=
DNSSEC=yes
DNSOverTLS=no
```

then:
```bash
# systemctl enable --now systemd-resolved
# systemctl restart systemd-resolved
```
## Config
Read [this page on ArchWiki](https://wiki.archlinux.org/title/Dnscrypt-proxy#Configuration) for more info.

# `hosts` file
`hosts` file is a text file that maps hostnames to IP addresses, and you can use it to block access to certain websites by redirecting them to a non-existent IP address. I use [Dan Pollock/someonewhocares's hosts](https://someonewhocares.org/hosts/) in this guide.
```bash
# cp /etc/hosts /etc/hosts.bak
# curl -o /etc/hosts https://someonewhocares.org/hosts/hosts
```

# Other
## Disable connectivity check
This prevents the system from sending periodic connectivity-check requests to third-party servers, improving both privacy and boot speed.
```bash
# systemctl disable --now NetworkManager-wait-online.service
# systemctl mask NetworkManager-wait-online.service
```

# Recommended software
## Internet
- [Ungoogled Chromium](https://github.com/ungoogled-software/ungoogled-chromium): Browser
- [LibreWolf](https://librewolf.net/): Browser
- [uBlock Origin](https://github.com/gorhill/uBlock): Powerful content blocker for browser
## Password and encryption
- [KeePassXC](https://keepassxc.org/): Password manager
- [pass](https://www.passwordstore.org/): Password manager
- [VeraCrypt](https://veracrypt.io/): Disk encryption
