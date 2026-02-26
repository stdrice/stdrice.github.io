---
title: "How I Installed Arch Linux"
description: "A brief guide on how I install Arch Linux on my own systems, with encryption, Secure Boot, and post-install setup."
date: '2026-02-26T15:52:53+07:00'
tags: ["linux", "arch-linux", "guide"]
draft: false
cover:
    image: ""
    responsiveImage: true
---

This is a brief guide describing how I install Arch Linux on my own systems.
It reflects my personal workflow and preferences rather than a universal best practice.

The goal is to keep the system minimal, reproducible, and easy to maintain, with disk encryption and Secure Boot support.

# Preparing the installation
## Create the Bootable USB and Boot into the Live ISO
1. Download the ISO image from [Arch Linux website](https://archlinux.org/download)
2. Create a bootable USB using `dd` or tools such as [Ventoy](https://ventoy.net)
3. Boot the system from the USB drive

## (Optional) Set the console keyboard layout and font
- List keyboard layouts
```
# localectl list-keymaps
```
- Set the keyboard layout. (Example: German)
```
# loadkeys de-latin1
```
- Console fonts are located in `/usr/share/kbd/consolefonts/` and can be set with `setfont`. For example, to use one of the largest fonts suitable for HiDPI screens, run:
```
# setfont ter-132b
```

## Verify the boot mode
```
# ls /sys/firmware/efi
```
- Output such as `config_table`, `efivars`, etc. → **UEFI mode**  
- `No such file or directory` → **Legacy (BIOS) mode**

## Connect to the Internet
### Ethernet (LAN)
If you are using a wired connection, it is usually configured automatically by the live environment.

### Wi-Fi (WLAN)
For wireless connection, use `iwctl` (from iwd):
```
# iwctl
[iwd]# device list                  # list the wireless device, for example I use wlan0
[iwd]# station wlan0 get-networks   # scan and get SSID name
[iwd]# station wlan0 connect <ssid> # connect to wi-fi
[iwd]# exit                         # exit iwctl
```
- Test the connection
```
# ping -c 3 archlinux.org
```
## Update the system clock
```
# timedatectl set-ntp true
```

# Disk partitioning
I use `cfdisk` to partition the disk. Example layouts:

## UEFI with GPT:
| Mount point | Partition | Type | Suggested size |
| :---------- | :-------- | :--- | :------------- |
| `/boot`     | `/dev/efi_system_partition` | EFI filesystem | 512MiB - 1GiB |
| `[swap]`    | `/dev/swap_partition` | Linux swap | RAM / 2 |
| `/`         | `/dev/root_partition` | Linux filesystem | Remainder of your device. At least 8-10GiB |

## Legacy with MBR:
| Mount point | Partition | Type | Suggested size |
| :---------- | :-------- | :--- | :------------- |
| `[swap]`    | `/dev/swap_partition` | Linux swap | RAM / 2 |
| `/`         | `/dev/root_partition` | Linux | Remainder of your device. At least 8-10GiB |
| ` `         | ` `                   | BIOS boot | +1MiB |

# (Optional) Disk encryption
Skip this section if you do not want disk encryption.
```
# cryptsetup luksFormat /dev/root_partition
# cryptsetup open /dev/root_partition root
```

This creates the decrypted device:
```
/dev/mapper/root
```

# Disk formatting
Use `lsblk` to list partitions.
For example, to create an `ext4` filesystem:
```
# mkfs.ext4 /dev/root_partition     # no encryption
# mkfs.ext4 /dev/mapper/root        # encryption
```

(Optional) Initialize `swap`:
```
# mkswap /dev/swap_partition
```

(UEFI) Create EFI filesystem
```
# mkfs.fat -F32 /dev/efi_system_partition
```

# Disk mounting
Mount the root filesystem
```
# mount /dev/root_partition /mnt    # no encryption
# mount /dev/mapper/root /mnt       # encryption
```

(UEFI) Mount EFI partition
```
# mount --mkdir /dev/efi_system_partition /mnt/boot
```

(Optional) Enable `swap`
```
# swapon /dev/swap_partition
```

# Installing the system
Install the base system using `pacstrap`.

The `base` package provides the minimal system required to boot Arch Linux.\
Additional packages can be appended to the command depending on your needs.

For example:
```
# pacstrap /mnt base linux linux-firmware
```

You may replace the kernel and add extra packages:
- `linux`: Standard kernel
- `linux-lts`: Long-term support kernel
- `linux-zen`: Performance-tuned kernel
- `linux-hardened`: Security-focused kernel
- `vim`, `neovim` or `nano`: Text editor
- `networkmanager`: For easier network connection
- `sudo`: Privilege escalation for normal users
- `base-devel`: Required for building AUR packages
- `intel-ucode` or `amd-ucode`: CPU microcode. For hardware bugs and security fixes.
- `broadcom-wl`, `sof-firmware`, ... : Specific firmware not included in `linux-firmware`
- `grub`: Bootloader
- `efibootmgr`, `os-prober`: To make `grub` work correctly
- `sbctl`: Secure-boot

# System Configuration
## Generate Fstab
```
# genfstab -U /mnt >> /mnt/etc/fstab
```

## Chroot
```
# arch-chroot /mnt
```

## Initramfs
Skip this section if you are **not using encryption**.

Edit `/etc/mkinitcpio.conf` (basically add `sd-encrypt` before `filesystems`)
```
HOOKS=(base systemd autodetect microcode modconf kms keyboard keymap sd-vconsole block sd-encrypt filesystems fsck)
```

Regenerate
```
# mkinitcpio -P
```

## Time
```
# ln -sf /usr/share/zoneinfo/Area/Location /etc/localtime
# hwclock --systohc     # set the hardware clock to UTC
```

## Localization
Edit `/etc/locale.gen` and uncomment the UTF-8 locales you will be using. Generate the locales by running
```
# locale-gen
```

Create the `/etc/locale.conf` file
```
# echo "LANG=en_US.UTF-8" > /etc/locale.conf
```

(Optional) If you set the console keyboard layout, make the changes persistent in `/etc/vconsole.conf`
```
KEYMAP=de-latin1
```

## Network configuration
Set hostname
```
# echo "<hostname>" > /etc/hostname
```

Enable NetworkManager (install it before type these command)
```
# systemctl enable NetworkManager
```

## Root password
Set a secure password for the root user to allow performing administrative actions. You can skip this step and use `sudo` instead.
```
passwd
```

## User
Create user and put into `wheel` (sudo) group
```
# useradd -m -G wheel <username>
# passwd <username>
```

Config `/etc/sudoers` using `visudo`
```
# EDITOR=<editor> visudo
```

Uncomment
```
%wheel ALL=(ALL:ALL) ALL
```

## Bootloader
I use `grub` for the bootloader.

### Install grub
UEFI:
```
# grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB --modules="tpm" --disable-shim-lock
```

Legacy:
```
# grub-install /dev/disk
```

### Configure grub
Find your UUID (skip this if you are not using encryption)
```
# blkid /dev/root_partition
```

Edit `/etc/default/grub`
```
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3"
GRUB_CMDLINE_LINUX="rd.luks.name=<UUID>=root root=/dev/mapper/root"     # skip this if you are not using encryption
GRUB_DISABLE_OS_PROBER=false    # if you are multi-boot, and os-prober is installed
```

Generate config
```
# grub-mkconfig -o /boot/grub/grub.cfg
```

## Finalize installation
```
# exit              # exit the chroot
# umount -R /mnt    # un-mount filesystem
# reboot            # reboot to system
```
# Post Installation
## Secure Boot setup
Secure Boot ensures that only trusted, signed bootloaders and kernels can run on your system.\
`sbctl` helps you create your own keys and sign EFI binaries so Arch Linux can boot with Secure Boot enabled.
```
# pacman -S sbctl
# sbctl create-keys
# sbctl enroll-keys -m
# sbctl verify
# sbctl sign <file listed on "sbctl verify">
```

## Desktop
Choose one according to your preference.

Common choices:
- `plasma`, `sddm`, `dolphin konsole ark kate korganizer kcalc kcolourpaint gwenview dragon elisa`: KDE Plasma
- `gnome`, `gdm`: GNOME
- `sway`, `hyprland`, ... : Other

Enable display manager if you use one:
```
# systemctl enable sddm # for KDE and other
# systemctl enable gdm  # for GNOME
```

## Audio (Pipewire)
PipeWire replaces PulseAudio and JACK, providing low-latency audio and better compatibility for modern applications.
```
# pacman -S pipewire pipewire-pulse wireplumber
$ systemctl --user enable pipewire pipewire-pulse wireplumber
```

## Essential fonts
These fonts ensure proper display of Latin, CJK (Chinese/Japanese/Korean), and emoji characters across most applications.
```
# pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra
```

## Power management (for laptop users)
TLP automatically adjusts CPU, disk, and power settings to improve battery life on laptops.
```
# pacman -S tlp tlp-rdw
# systemctl enable tlp
# systemctl mask systemd-rfkill.service systemd-rfkill.socket
# tlp start
```

Edit `/etc/tlp.conf` if you want.

## Firewall
A firewall controls incoming and outgoing network connections to improve system security.\
`ufw` provides a simple interface to manage firewall rules.
```
# pacman -S ufw
# systemctl enable --now ufw
# ufw default deny incoming
# ufw default allow outgoing
# ufw allow ssh                 # if you use ssh
```

## AUR helper (yay)
The AUR (Arch User Repository) contains community-maintained packages not available in official repos.
`yay` simplifies downloading and building these packages.
```
$ git clone https://aur.archlinux.org/yay-bin && cd yay-bin && makepkg -si
```

## Flatpak
Flatpak provides a universal package format with sandboxing, useful for desktop applications that you don’t want to manage via pacman or AUR.

Install
```
# pacman -S flatpak
```
Reboot or relogin after installing Flatpak.

## `hosts` file
The /etc/hosts file maps domain names to IP addresses before DNS is used.
By mapping unwanted domains to 0.0.0.0, connections to them are blocked system-wide.

Install a pre-made hosts file by someonewhocares
```
# cp /etc/hosts /etc/hosts.bak
# curl -o /etc/hosts https://someonewhocares.org/hosts/hosts
```

To restore
```
# cp /etc/hosts.bak /etc/hosts
```

## Ricing
After finishing the base system setup, you can start customizing the look and behavior of your system (commonly referred to as ricing).
Ricing usually includes:
- Window manager / desktop environment configuration
- Status bar and notification daemon
- Terminal, shell, and editor theming
- Fonts and icon themes
- Keybindings and workflow optimizations

Instead of configuring everything manually, you can use my pre-made configuration files (dotfiles).

My personal dotfiles repository contains:
- Window manager configuration
- Terminal and shell setup
- Status bar and launcher configuration
- Theme and font choices
- Useful scripts and keybindings

You can find them here: [stdrice/dotfiles](https://github.com/stdrice/dotfiles)
