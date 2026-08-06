---
title: "Dell XPS 9500/9700 Undervolting"
description: ""
date: '2025-06-29T13:37:34+07:00'
tags: [""]
draft: false
cover:
    image: ""
    responsiveImage: true
---

Worked on latest BIOS version (1.36.0 / Jun 18 2025)

# 1. Unlock Undervolting
NOTE: Please disable Secure-boot before follow this guide
## Use grub on Linux
- Boot into grub bootloader
- Press `c` to open command-line

## Make grub Bootable device
- Format USB as FAT32
- Create `EFI/boot` directory
- Download `grubx64.efi`, rename to `bootx64.efi` and put it to EFI/boot

## Type these commands
```
setup_var CpuSetup 0xDA 0x0
setup_var CpuSetup 0x3E 0x0
```

# 2. Undervolt
## Install ThrottleStop
- [Download ThrotteStop here](https://techpowerup.com/download/techpowerup-throttlestop)
- Extract and run `ThrotteStop.exe`

## Settings
### TPL Settings
- PL1: 45-90W
- PL2: 25-45W

### FIVR Settings
- **Unlock Adjustable Voltage for**: CPU Core, CPU Cache, iGPU
    1. FIVR Control window - select CPU core/cache, iGPU
    2. One window below that, click on "unlock adjustable voltage" and apply in bottom right corner. Do that for all three.
    3. Above "Apply" button in bottom right, mark "OK - save voltages immediately" and click apply.
- **Disable and Lock Turbo Power Limits**: Enable
- **Thermal Velocity Boost (TVB)**: Disable
- **CPU core offset**: -80 mV
- **CPU cache offset**: -75 mV
- **Intel iGPU offset**: -60 mV
- **iGPU unslice offset**: -60 mV