---
title: "Complete Guide to Setting Up Mailpit (Without Docker)"
description: "Learn how to install and run Mailpit, a modern SMTP server for developers, directly on your Linux system without using Docker. This guide covers installation, configuration, and usage for local email testing."
author: nakshara
Purpose: "This guide provides step-by-step instructions for installing, configuring, and running Mailpit on Linux to safely test emails during development."
pubDate: 2026-03-21 14:52
updatedDate: 2026-03-21 14:52
category: dev
tags:
  - mailpit
  - smtp
  - testing
  - linux
  - development
  - backend


heroImageDark: ./images/mailpit_setup/mailpit_dark.jpg
heroImageLight: ./images/mailpit_setup/mailpit_light.jpg

---

If you're building apps that send emails (like OTPs, invoices, or notifications), testing them safely without sending real emails is crucial.

That’s where **Mailpit** comes in — a lightweight SMTP testing tool with a clean web UI.

In this guide, you’ll learn:

- How to install Mailpit (no Docker)
- Run it via terminal
- Change UI & SMTP ports
- Persist emails using a database
- Run it as a background service (systemd)

## 📦 What is Mailpit?

Mailpit is a local SMTP server designed for developers.

👉 **Instead of sending real emails:**

1. Your app sends emails to Mailpit
2. Mailpit captures them
3. You view them in a web UI

**Perfect for:**

- OTP testing
- Email debugging
- Development environments

## 🛠️ Install Mailpit (No Docker)

### Step 1: Download binary
```bash
wget https://github.com/axllent/mailpit/releases/latest/download/mailpit-linux-amd64.tar.gz
```

### Step 2: Extract
```bash
tar -xzf mailpit-linux-amd64.tar.gz
```

### Step 3: Move to system path
```bash
sudo mv mailpit /usr/local/bin/
```

### Step 4: Make executable
```bash
sudo chmod +x /usr/local/bin/mailpit
```

## ▶️ Run Mailpit (Basic)

```bash
mailpit
```

**Default ports:**
- 🌐 **Web UI** → http://localhost:8025
- 📩 **SMTP** → localhost:1025

## 🔧 Run with Custom Ports

Newer versions use:

- `--listen` → Web UI
- `--smtp` → SMTP server

**Example:**
```bash
mailpit --listen 0.0.0.0:8090 --smtp 127.0.0.1:2525
```

**Result:**
- **Web UI** → http://localhost:8090
- **SMTP** → 127.0.0.1:2525

## 🔐 Bind to Specific Interfaces

**Public access:**
```bash
mailpit --listen 0.0.0.0:8090
```

**Local-only (safer):**
```bash
mailpit --listen 127.0.0.1:8090
```

## 💾 Persist Emails (Optional Database)

By default, emails are stored in memory and lost on restart. To persist:

```bash
mailpit --database /var/lib/mailpit.db
```

👉 This creates a SQLite database file, separate from your app database.

## ⚙️ Run Mailpit in Background

```bash
nohup mailpit > mailpit.log 2>&1 &
```

## 🧾 Create a systemd Service (Recommended)

### Step 1: Create service file
```bash
sudo nano /etc/systemd/system/mailpit.service
```

### Step 2: Add config 
```ini
[Unit]
Description=Mailpit Email Testing Server
After=network.target

[Service]
ExecStart=/usr/local/bin/mailpit 
Restart=always
RestartSec=5
User=root

[Install]
WantedBy=multi-user.target
```

### Step 3: Enable & start
```bash
sudo systemctl daemon-reload
sudo systemctl enable mailpit
sudo systemctl start mailpit
```

### Step 4: Check status
```bash
sudo systemctl status mailpit
```

### Now to bind the mailpit to a specific ip and port

```ini
[Unit]
Description=Mailpit Email Testing Server
After=network.target

[Service]
ExecStart=/usr/local/bin/mailpit --listen [IP_ADDRESS] --smtp [IP_ADDRESS] --database /var/lib/mailpit.db
Restart=always
RestartSec=5
User=root

[Install]
WantedBy=multi-user.target
```

## 🔍 Debugging Issues

**Check logs:**
```bash
journalctl -u mailpit -f
```

**Test manually:**
```bash
mailpit --listen 0.0.0.0:8090
```

**Check port usage:**
```bash
sudo lsof -i :8090
```

## 🔥 Firewall Setup (if needed)

```bash
sudo ufw allow 8090
```

## 🧪 Example: Using Mailpit with Node.js

```javascript
{
  host: "127.0.0.1",
  port: 1025,
  secure: false
}
```

👉 Works perfectly with **Nodemailer**.

## 🧠 Key Takeaways

- Mailpit is a **fake SMTP server** for development.
- It **does NOT** use your app database.
- Emails are:
    - **Temporary** (default)
    - **Persistent** (if using `--database`)
- New versions use `--listen` instead of `--ui`.

## 🚀 Final Thoughts

If you're building anything involving emails, Mailpit is a must-have tool in your dev workflow. It’s:

- **Fast** ⚡
- **Lightweight** 🪶
- **Super easy to set up** 🔧
