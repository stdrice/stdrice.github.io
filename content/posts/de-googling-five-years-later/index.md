---
title: "De-Googling, Five years later"
description: "A five-year reflection on de-Googling, privacy tools, and why replacing big tech with privacy startups did not solve the real problem."
date: '2026-03-11T22:36:16+07:00'
tags: ["privacy"]
draft: false
cover: 
    image: "cover.jpg"
    responsiveImage: true
---

Around 2021 I started reading more about how large technology companies collect and process user data.  
The deeper I went, the more uncomfortable I became with how much of my digital life depended on Google.

So I decided to try something many people in the privacy community were talking about at the time:

**De-Google**

Five years later, the result looks very different from what I originally expected.

# Phase 1: Idealism
Like many people, my first attempt at de-Googling was straightforward.
Replace Google services with “privacy-friendly alternatives”.
- Gmail: Proton/Tutanota
- Chrome: Firefox/Brave
- Google search: DuckDuckGo/Startpage
- Remove Google services from my devices and my life

At the time it felt like the obvious answer. If Google and big tech was the problem, then removing and replacing them should solve it. And for a while I believed it did.

But over time I started noticing something uncomfortable.

# Phase 2: Realization
Many of the alternatives I switched to slowly started drifting in directions that felt... familiar. Not identical to big tech companies, but similar enough that the pattern became hard to ignore.
## Browsers
At first the logic seemed simple.

If Chrome was tracking users, then switching to more privacy-focused browsers like [Firefox](https://firefox.com) or [Brave](https://brave.com) should solve the problem.

Over time, however, these browsers started accumulating more and more unrelated features, telemetry, and questionable product decisions.

Some examples and controversies:
- Firefox telemetry and data collection
- Firefox sponsored content on the new tab page
- [Firefox is becoming an AI browser](https://pcgamer.com/hardware/firefox-is-becoming-an-ai-browser-and-the-internet-is-not-at-all-happy-about-it)
- [Firefox's New Term of Use and Privacy Policy](https://omgubuntu.co.uk/2025/02/mozilla-introducing-terms-of-use-to-firefox)
- [Brave’s built-in advertising system](https://brave.com/brave-rewards)
- [The Brave affiliate link controversy](https://x.com/cryptonator1337/status/1269201480105578496)

## Private Mail
The same thing happened with privacy-focused email services.
Many of them expanded into full SaaS ecosystems:
- storage
- password managers
- calendars
- VPNs
- subscription tiers

What started as simple privacy-focused tools gradually turned into platform products.
And more importantly, the **trust model never really changed**. You still had to trust a centralized provider, just a different one.

Another thing I realized over time was how email encryption actually works in practice.

Most “private email” systems primarily encrypt messages **inside their own ecosystem**. Once messages leave that ecosystem, they behave like normal email again. 

This is very different from protocol-level encryption systems like GPG, where encryption is independent of the provider. That distinction matters more than marketing pages suggest.

Some examples and controversies:
- [Proton Mail logging a climate activist’s IP address after a Swiss court order (2021)](https://techcrunch.com/2021/09/06/protonmail-logged-ip-address-of-french-activist-after-order-by-swiss-authorities)
- [Proton Mail payment metadata being used to identify a “Stop Cop City” protester via Swiss authorities and the FBI (2026)](https://404media.co/proton-mail-helped-fbi-unmask-anonymous-stop-cop-city-protestor)
- Proton’s expansion into a full SaaS ecosystem (VPN, Drive, Pass, Calendar)

## Search engines
Search engines were supposed to be one of the easiest parts of de-Googling. Several services positioned themselves as privacy-focused alternatives.

DuckDuckGo is one of the most commonly recommended privacy search engines.

In 2022 it was revealed that [the DuckDuckGo browser allowed certain Microsoft tracking scripts to run due to a search syndication agreement with Microsoft.](https://techcrunch.com/2022/05/24/ddg-microsoft-tracking-blocking-limit)

Another structural limitation is that DuckDuckGo does not operate a fully independent search index. [A significant portion of its results are sourced from Microsoft Bing.](https://help.duckduckgo.com/duckduckgo-help-pages/results/sources)

Startpage faced a different controversy.

In 2019 it was revealed that [the company had been acquired by Privacy One Group, which is owned by the advertising technology company System1.](https://reddit.com/r/privacy/comments/di5rn3/startpage_is_now_owned_by_an_advertising_company/)

This raised concerns because a service marketed as a privacy-focused search engine was now owned by a company whose core business revolves around advertising technology.

Over time it became clear that many “privacy search engines” fall into one of two categories:
- Metasearch engines relying on Google or Bing indexes  
- Privacy layers built on top of existing search infrastructure

In other words, the underlying search ecosystem is still largely controlled by the same large companies.

# Phase 3: Infrastructure
At some point I stopped looking for better replacements. Switching from one company to another never really changed the underlying problem. It just moved the trust somewhere else.

So my approach slowly shifted. Instead of looking for "privacy-friendly services", I started paying more attention to the infrastructure I depended on.

Over time my setup became much simpler:
- A small community-run mail server instead of large email providers
- GPG for end-to-end email encryption
- Linux as my primary operating system
- Open protocols instead of platform ecosystems
- Self-hosted or community infrastructure where it makes sense

None of this is perfect. It takes more effort and requires a bit more technical knowledge. But the trust model is different.

Instead of relying on a single company to do everything correctly, the system is made of smaller pieces that can be replaced or moved if necessary.

At that point I realized something.

The goal was never really *de-Googling*. The real goal was **depending less on large platforms in general.**


*Five years later, I still avoid most Google services. But the real change wasn’t the tools I switched to. It was reducing how much I depend on platforms at all.*
