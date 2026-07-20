---
title: "How to Hold a Package in Debian/Ubuntu with apt-mark hold (Prevent Unwanted Upgrades)"
description: "Learn how to use apt-mark hold to prevent specific packages like VS Code from upgrading automatically on Debian, Ubuntu, and other APT-based distributions. Perfect when a new version is causing crashes or instability."
pubDate: 2026-07-20 12:00
updatedDate: 2026-07-20 12:00
category: linux
author: nakshara
purpose: "Learn how to hold packages with apt-mark hold to avoid problematic updates while still keeping the rest of your system updated."
heroImageLight: ./images/apt-hold-package/apt-hold-package-light.jpg
heroImageDark: ./images/apt-hold-package/apt-hold-package-dark.jpg
tags:
  - Linux
  - Debian
  - Ubuntu
  - apt
  - Package Management
  - VS Code
  - apt-mark
  - System Stability
  - Hold Package
  - Trixie
---

# How to Hold a Package in Debian/Ubuntu with `apt-mark hold`

Sometimes a software update breaks things. You finally have a working version of an application (like VS Code 1.128.0), but `apt upgrade` wants to pull in a newer buggy version.

This is exactly when you should **hold** the package.

---

## What Does "Holding a Package" Mean?

Holding a package tells APT (the package manager used by Debian, Ubuntu, Linux Mint, Pop!\_OS, etc.) to **ignore newer versions** of that specific package during upgrades.

The package stays at its current version until you manually remove the hold.

### Why Should You Use `apt-mark hold`?:

- Prevents automatic upgrades that break your workflow (very common with VS Code, NVIDIA drivers, browsers, etc.)
- Lets you keep the rest of your system fully updated and secure
- Gives you control and time to test newer versions safely
- Reversible — you can unhold anytime
- Very lightweight and built into APT

### When Should You Hold a Package?:

- A recent update is causing crashes (like VS Code 1.129.0 on Debian Trixie)
- You need stability for development tools or critical software
- You're waiting for a fix from the developers
- You prefer a specific version that works well with your setup

---

## Step 1: Hold the Package

To hold a package (example: `code` for VS Code):

```bash
sudo apt-mark hold code
```

### Verify the Hold

```bash
apt-mark showhold
```

You should see `code` in the output.

---

## Step 2: Upgrade Other Packages Safely

Now you can update your entire system without touching the held package:

```bash
sudo apt update
sudo apt upgrade
```

APT will skip the held package and show it as "kept back".

---

## Step 3: Remove the Hold (When Ready)

When a stable version is released and you want to update:

```bash
sudo apt-mark unhold code
sudo apt upgrade
```

---

## Useful Related Commands

| Command                     | Purpose                          |
| :-------------------------- | :------------------------------- |
| `apt-mark hold <package>`   | Hold a package                   |
| `apt-mark unhold <package>` | Remove hold                      |
| `apt-mark showhold`         | List all held packages           |
| `apt-mark showmanual`       | Show manually installed packages |

---

### Example: Holding VS Code

```bash
# Hold VS Code
sudo apt-mark hold code

# Check status
apt-mark showhold

# Safely update everything else
sudo apt update
sudo apt upgrade
```

---

## Conclusion

Using `apt-mark hold` is a smart and simple way to maintain system stability without sacrificing security updates for other packages.

It’s especially useful for tools like **VS Code**, **Google Chrome**, **NVIDIA drivers**, or any software where updates sometimes introduce regressions.

**Pro Tip**: After holding a package, keep an eye on the project’s release notes so you know when it’s safe to unhold and upgrade.

---

**Happy Linuxing!**
