---
title: "Arch Linux Post-Installation Setup"
date: '2025-12-22T15:59:39+07:00'
tags: [ 'linux', 'archlinux' ]
draft: false
cover:
    image: ""
    responsiveImage: true
---

This post lists things I do after installing Arch Linux.

# Secure Boot setup
```bash
# pacman -S sbctl
# sbctl create-keys
# sbctl enroll-keys -m
# sbctl verify
# sbctl sign [file listed on "sbctl verify"]
```
Reboot to BIOS and enable Secure Boot

# Install TLP
```bash
# pacman -S tlp tlp-rdw
# systemctl enable tlp
# systemctl mask systemd-rfkill.service systemd-rfkill.socket
```

# Setup Firewall
```bash
# pacman -S ufw
# systemctl enable --now ufw
# ufw default deny incoming
# ufw default allow outgoing
# ufw allow ssh
```

# ZRAM setup
```bash
# pacman -S zram-generator
```

Example config of `/etc/systemd/zram-generator.conf`:
```
[zram0]
zram-size = ram / 2
compression-algorithm = zstd
swap-priority = 100
```

# `hosts` file
```bash
# cp /etc/hosts /etc/hosts.bak
# curl -o /etc/hosts https://someonewhocares.org/hosts/hosts
```

# yay
```bash
$ git clone https://aur.archlinux.org/yay-bin && cd yay-bin && makepkg -si
```

# Wine
```bash
# pacman -S wine winetricks
$ export WINEPREFIX=~/.wine
$ wineboot
$ winetricks -q vcrun2010 vcrun2022 dotnet48 d3dx9 dxvk vkd3d corefonts win10
```

# Other
## Disable connectivity check
```bash
# systemctl disable --now NetworkManager-wait-online.service
# systemctl mask NetworkManager-wait-online.service
```
