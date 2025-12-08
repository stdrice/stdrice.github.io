---
title: "iPhone Hardening"
date: '2025-12-07T20:40:30+07:00'
tags: [ "ios", "iphone", "hardening", "privacy", "security" ]
draft: false
cover:
    image: ""
    responsiveImage: true
---

I recently switched to the iPhone. While it’s often marketed as “secure” and “privacy‑friendly” compared to Android, the reality is more nuanced. iOS has strong sandboxing, solid memory protections, and a tightly controlled app ecosystem, but it also contains layers of telemetry, hidden settings, cloud‑centric defaults, and convenience features that quietly expand your attack surface.

This post focuses on turning iOS into a minimal, hardened, privacy‑respecting environment.

# Settings
## Apple Account
### iCloud
- Disable all services you don’t explicitly need
- Prefer offline storage
- Avoid iCloud Keychain if you use external password managers

### Media & Purchases
- Personalized Recommendations: **Off**
- Allow Friends to Find You: **Off**

## Wi-Fi
- Ask to Join Networks: **Off**
- Auto-Join Hotspot: **Never**
- Disable Wi-Fi when not in use
- Avoid public and guest Wi-Fi if possible

## Bluetooth
- Turn off **in Settings**, not **Control Center**
- Turn on only when needed

## Cellular
- If possible, avoid SIM usage for maximum privacy.
### Cellular Data Options
- Limit IP Address Tracking: **On**

## General
### AirDrop
- Choose **Receiving Off**

### AirPlay & Continuity
- Automatically AirPlay: **Never**
- Transfer to HomePod: **Off**
- Keep Audio with Headphones: **Off**
- Handoff: **Off**
- Continuity Camera: **Off**

### Keyboard
Disable all cloud‑assisted or behavioral features
- Character Preview: **Off**
- Haptic Feedback: **Off**
- Sound: **Off**
- Auto-Correction: **Off**
- Show Math Results: **Off**
- Smart Punctuation: **Off**
- Auto-Capitalization: **Off**
- Predictive Text: **Off**
- Check Spelling: **Off**
- Enable Dictation: **Off**

### Background App Refresh
- Background App Refresh: **Off**
- If you use Background App Refresh, disable all apps except apps you need.

## Search
- Show Recent Searches: **Off**
- Show Related Content: **Off**
- Search Engine: **DuckDuckGo** (the only good option)
- Help Apple Improve Search: **Off**
- Turn off **Show Content in Search** for all apps

## Siri
Disable Siri entirely if you do not use it.
- Talk to Siri: **Off**
- Suggest Apps Before Searching: **Off**
- Allow Notifications: **Off**
- Show in App Library: **Off**
- Show When Sharing: **Off**
- Show Listening Suggestions: **Off**

## Wallpaper
- Use Static black wallpaper
- Disable all shortcuts and widgets on Lockscreen

## Notifications
- Display As: **Count**
- Scheduled Summary: **Off**
- Show Previews: **When Unlocked** or **Never**
- Disable notification for all non-critical apps

## Screen Time
- Share Across Device: **Off**
- Choose **Turn Off App & Website Activity** if you don't use (or need) it

## Face ID & Passcode
- Attention Aware Features: **Off**
- Use **Custom Alphanumeric Code** for passcode
- Disable **all** options under **Allow Access When Locked**, and just enable what you need
- Enable **Erase Data** only if you do not store highly important information.

## Privacy & Security
### Location Services
- Disable **Location Services** unless needed
- Share My Location: **Off**
- Go to **System Services**
- Disable all (except **Find My iPhone** if used)
- Status Bar Icon: **On**

### Tracking
- Allow Apps to Request to Track: **Off**

### Research Sensor & Usage Data
- Sensor & Usage Data Collection: **Off**

### Analytics & Improvements
- Disable **everything**

### Apple Advertising
- Personalized Ads: **Off**

### App Privacy Report
- Turn **off**

### Wired Accessories
- Choose **Automatically Allow When Unlocked**

### Stolen Device Protection
- Stolen Device Protection: **On**
- Require Security Delay: **Always**

### Lockdown Mode
- See [Lockdown Mode](#lockdown-mode) section

## Safari
In case you need Safari for PWA apps
### Search
- Search Engine: **DuckDuckGo**
- Search Engine Suggestions: **Off**
- Safari Suggestions: **Off**
- Show Recent Searches: **Off**
- Preload Top Hit: **Off**

### General
#### AutoFill
- Use Contact Info: **Off**
- Credit Cards: **Off**

### Privacy & Security
- Prevent Cross-Site Tracking: **On**
- Require Face ID to Unlock Private Browsing: **On**
- Fraudulent Website Warning: **Off**

### Advanced
- Advanced Tracking and Fingerprinting Protection: **All Browsing**
- Privacy Preserving Ad Measurement: **Off**
- Check for Apple Pay: **Off**

## App Store
- App Downloads: **Off**
- In-App Content: **Off**
- In-App Ratings & Reviews: **Off**

## Message
- iMessage: **Off** (if you don't use it)
- Keep Messages: **30 Days** or **1 Year**

## Phone
- Wi-Fi Calling: **Off**

## Photos
- iCloud Photos: **Off** (if you don't need it)
- Shared Albums: **Off**
- Use Face ID: **On**
- Show Recently Viewed & Shared: **Off**
- Show Holiday Events: **Off**
- Show Featured Content: **Off**
- Enhanced Visual Search: **Off**

# Browser: Brave
I don't use Safari because it lacks too much features I need. Instead, I use Brave even though I don't really like it.
## Shields & Privacy
- Trackers & Ads Blocking: **Aggressive**
- Upgrade Connections to HTTPS: **Strict**
- Block 'Switch to App' Notices: **On**
- Allow Privacy-Preserving Product Analytics (P3A): **Off**
- Automatically send daily usage ping to Brave: **Off**
- Allow Brave surveys: **Off**

## Leo
- Show In Quick Search Engines Bar: **Off**

## Brave Translate
- Translate Enabled: **Off**

## Web3
- Switch all options to **Disabled**

## Search Engines
- Standard Tab & Private Tab: **DuckDuckGo** or **Brave Search**
- Show Search Suggestions: **Off**
- Show Recent Searches: **Off**
- Show Browser Suggestions: **Off**

## New Tab Page
- Background: **Off**
- Media Type: **Default Images**
- Privacy Hub: **Off**

## Hide Brave Rewards Icon
- Turn **Off**

## Private Tabs
- Require Face ID: **Off**

## Logins & Passwords
- Save Logins: **Off**

# Lockdown Mode
## Introduction
Lockdown Mode is Apple’s highest security feature, designed to protect against highly targeted attacks. It restricts many device functions, including message attachments, web technologies, incoming invitations, and configuration profiles. (thanks ChatGPT)

## Why I don’t enable it
Since I already apply the privacy and security measures above, Lockdown Mode isn’t necessary. It also disables file previews and breaks third-party browsers, which affects usability.

# BFU and Why you should restart your phone regularly
BFU (Before First Unlock) is the state your iPhone is in right after a reboot. In BFU, all your sensitive data is still fully encrypted and locked behind your passcode. Once you unlock the phone, it moves to AFU, where some keys stay in memory for convenience.
Restarting brings the device back to BFU, clearing everything in memory. This helps remove temporary data, wipe any non-persistent exploits, and force all encryption keys to lock again. Restarting every few days is an easy way to keep the device in its safest state.
In urgent situations, you can also force-restart your phone to instantly drop it back into BFU. This immediately locks all sensitive data, disables biometric unlock, and kills anything that was running in memory, basically putting the device into its hardest-to-break state.

## How I make the restart progress more convenient
- Open **Shortcuts** app
- Create a shortcut named **"Restart"**
- Add the **"Shut Down"** action
- Set it to **Restart**
- Open **Control Center**
- Add **"Run Shortcut"**
- Select **"Restart"** shortcut
Now whenever you need to reboot, just pull down Control Center and tap **Restart**.

# Recommended apps
Because iOS doesn't have many fully open-source apps like Android, these are some alternatives that I find pretty good to use:
- [Brave](https://brave.com/): Browser. I don't really like Brave, but this is only good option.
- [Bitwarden](https://bitwarden.com/): Password Manager. Also have self-hosted option.
- [Ente Auth](https://ente.io/auth/): 2FA app
- [LocalSend](https://localsend.org/): AirDrop alternative
- [Mullvad VPN](https://mullvad.net): VPN service I use

# OPSEC recommendations
## Daily practices
- Never enter passwords, recovery keys, or seed phrases in public spaces.
- Reboot the device regularly (once every few days) to clear memory-resident exploits.
- Be cautious of phishing and social engineering.  
- Audit app permissions regularly.

## Device handling
- Keep Bluetooth, Wi‑Fi, Cellular, AirDrop, ... disabled when not needed.
- Avoid connecting to unknown Wi-Fi networks or Bluetooth devices.
- Avoid charging your phone on unknown or public USB ports (use USB data blockers).
- Never hand your device to strangers, even briefly.
- Keep iOS updated to latest version.
- **Do not jailbreak**.

## Minimal attack surface 
- Install minimal apps, remove unused apps.
- Prefer offline or open‑source tools when possible.
- Use PWA/Web apps instead of installed apps whenever possible.

# Conclusion
iPhones are already secure (?), but the defaults leave room for tracking and leaks. By doing following things above, you can make your phone as safe as possible.

It’s not just about settings, being careful with networks, connections, and the apps you install matters a lot. With these steps, your iPhone can be a highly private and secure device.
