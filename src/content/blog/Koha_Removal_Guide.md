---
title: "Complete Koha Removal Guide: Clean Uninstall from Debian & Ubuntu Servers"
description: "A production-focused, step-by-step guide to completely removing Koha LMS from Debian and Ubuntu systems. Covers stopping services, purging packages, cleaning databases, removing Apache/Nginx configs, and wiping residual files for a truly clean system reset."
pubDate: 2026-01-18 12:27
updatedDate: 2026-01-18 12:27
author: "Amruth L P"
purpose: "This guide provides a safe, production-ready process for fully uninstalling Koha LMS from Linux servers. It ensures all services, packages, databases, cron jobs, and configuration files are removed to prevent conflicts during reinstallation or system repurposing."
category: lms
tags:
  - koha
  - koha-lms
  - debian
  - ubuntu
  - linux
  - server
  - uninstall
  - system-cleanup
heroImageLight: ./images/koha-uninstall/koha-uninstall-light.jpg
heroImageDark: ./images/koha-uninstall/koha-uninstall-dark.jpg

---

# Koha Complete Removal Guide – Debian/Ubuntu
Last updated: January 2026
⚠️ WARNING: This will PERMANENTLY DELETE all Koha libraries, databases, configurations, logs and files.
Only continue if you are 100% sure you want to completely wipe Koha.

## Manual Step-by-Step Removal

### 1. Stop services

```bash
sudo systemctl stop koha-common    
sudo systemctl stop koha-zebra     
```

### 2. Remove packages
```bash
sudo apt-get remove --purge -y koha-common koha-zebra koha-commons koha-perl
sudo apt-get autoremove --purge -y
sudo apt-get clean
```

### 3. Drop databases (MySQL/MariaDB)
```bash
sudo mysql -u root -p

Then inside mysql:
SHOW DATABASES;   -- look for databases starting with koha_

DROP DATABASE koha_your_instance_name;
DROP DATABASE koha_another_library;   -- repeat for each

DROP USER IF EXISTS 'kohaadmin'@'localhost';
FLUSH PRIVILEGES;
EXIT;

```

### 4. Delete directories

```bash
sudo rm -rf /etc/koha
sudo rm -rf /var/lib/koha
sudo rm -rf /var/log/koha
sudo rm -rf /usr/share/koha
```

### 5. Remove web server config (choose your server)

# Apache
```bash
sudo rm -f /etc/apache2/sites-enabled/koha*   /etc/apache2/sites-available/koha*
sudo systemctl reload apache2 2>/dev/null || true
```

# Nginx (if you use it)
```bash
sudo rm -f /etc/nginx/sites-enabled/koha*   /etc/nginx/sites-available/koha*
sudo systemctl reload nginx 2>/dev/null || true
```

### 6. Remove cron jobs
```bash
sudo rm -f /etc/cron.d/koha-common
```

### 7. Final checks
```bash
systemctl list-units --type=service | grep -i koha
sudo mysql -u root -p -e "SHOW DATABASES;" | grep -i koha
sudo find / -name "*koha*" 2>/dev/null   # should return almost nothing
```

───────────────────────────────────────────────────────────────

## ⚠️ All-in-One Dangerous Cleanup Script

> **WARNING**
>  
> This script **permanently deletes** Koha packages, databases, users, and files.
>  
> - 💀 **Data loss is irreversible**
> - ❌ Do **NOT** run on a production system
> - ✅ Use only on test / dev servers you intend to wipe


```bash

#!/bin/bash

# =============================================================================
#        KOHA TOTAL DESTRUCTION SCRIPT - DEBIAN/UBUNTU
#        Deletes packages • databases • files • configs • everything
# =============================================================================

set -e

echo "Stopping services..."
sudo systemctl stop koha-common koha-zebra 2>/dev/null || true

echo "Removing packages..."
sudo apt-get remove --purge -y koha-common koha-zebra koha-commons koha-perl 2>/dev/null || true
sudo apt-get autoremove --purge -y
sudo apt-get clean

echo -n "MySQL/MariaDB root password: "
read -s MYSQL_PASS
echo

echo "Dropping Koha databases..."
DBS=$(mysql -uroot -p"$MYSQL_PASS" -e "SHOW DATABASES;" 2>/dev/null | grep -i '^koha' || true)

for db in $DBS; do
    echo "→ Dropping $db"
    mysql -uroot -p"$MYSQL_PASS" -e "DROP DATABASE \`$db\`;" 2>/dev/null
done

mysql -uroot -p"$MYSQL_PASS" -e "DROP USER IF EXISTS 'kohaadmin'@'localhost'; FLUSH PRIVILEGES;" 2>/dev/null

echo "Deleting directories..."
sudo rm -rf /etc/koha /var/lib/koha /var/log/koha /usr/share/koha

echo "Cleaning web server configs..."
sudo rm -f /etc/apache2/sites-enabled/koha*   /etc/apache2/sites-available/koha* 2>/dev/null
sudo systemctl reload apache2 2>/dev/null || true
sudo rm -f /etc/nginx/sites-enabled/koha*   /etc/nginx/sites-available/koha* 2>/dev/null
sudo systemctl reload nginx 2>/dev/null || true

echo "Removing cron jobs..."
sudo rm -f /etc/cron.d/koha-common

echo
echo "========================================"
echo "         Koha has been completely wiped"
echo "========================================"
```

---

## How to use

> ⚠️ **Danger Zone**
>  
> Make sure this is **not a production server**. This script will permanently remove Koha and its data.

### 1. Save the script

Create a new file:

```bash
nano remove_koha.sh
```

Paste the script into the file, then save and exit:

* Ctrl + O → Enter (save)

* Ctrl + X (exit)

### 2. Make it executable

```bash
chmod +x remove_koha.sh
```

### 3. Run the script

```
sudo ./remove_koha.sh
```

### 4.Enter MySQL root password

When prompted, enter your MySQL/MariaDB root password.
(The input is hidden for security.)

### 5.Verify removal (optional)

You can confirm Koha is gone by checking:

```bash
dpkg -l | grep koha
ls /etc/koha /var/lib/koha
```

If nothing is returned, Koha has been fully removed.

---