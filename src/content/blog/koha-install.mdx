---
title: "Koha LMS Installation Guide on Linux (Debian/Ubuntu)"
description: "This document provides a **clear, step-by-step, production-oriented guide** to install **Koha Integrated Library Management System (LMS)** on a Linux server, specifically **Debian or Ubuntu**. Koha officially recommends Debian-based systems and this guide follows best practices used in real-world library deployments."
category: lms
pubDate: 2026-01-04 20:10
updatedDate: 2026-01-04 20:10
heroImageDark: ./images/Koha_install.jpg
heroImageLight: ./images/Koha_install.jpg
tags: [
  "koha",
  "library-management-system",
  "ils",
  "opac",
  "circulation",
  "cataloging",
  "perl",
  "mariadb",
  "apache",
  "debian",
  "ubuntu",
  "installation",
  "troubleshooting",
]
---

# Koha LMS Installation Guide on Linux (Debian/Ubuntu)

This document provides a **clear, step-by-step, production-oriented guide** to install **Koha Integrated Library Management System (LMS)** on a Linux server, specifically **Debian or Ubuntu**. Koha officially recommends Debian-based systems and this guide follows best practices used in real-world library deployments.

---

## 1. System Requirements

### Hardware (Minimum Recommended)

* CPU: 2 cores
* RAM: 4 GB (8 GB recommended for production)
* Disk: 50 GB+

### Software

* Debian 11 / 12 **or** Ubuntu 20.04 / 22.04
* Root or sudo access
* Static IP address (option but recommended)
* MariaDB installed and set up 

---

## 2. Update the System

```bash
sudo apt update && sudo apt upgrade -y
sudo reboot
```

---

## 3. Notes Before Installation

* Server hostname configuration is **not covered here** as it can be handled directly via DNS.
* Ensure your server IP resolves correctly to the domain/subdomain you plan to use for Koha.
* Run all commands as a user with **sudo privileges**.

---

## 4. Install Required Dependencies

```bash
sudo apt install -y gnupg curl ca-certificates wget
```

---

## 5. Add Koha Repository

### Import Koha GPG Key

```bash
wget -qO- https://debian.koha-community.org/koha/gpg.asc \
| sudo gpg --dearmor -o /usr/share/keyrings/koha.gpg

```

### Add Repository

### Debian

#### Debian 11 / 12 and Ubuntu (20.04 / 22.04)

```bash
echo "deb [signed-by=/usr/share/keyrings/koha.gpg] https://debian.koha-community.org/koha stable main" \

```





```bash
| sudo tee /etc/apt/sources.list.d/koha.list
```

Update package list:

```bash
sudo apt update
```


---

## 6. Install Koha

```bash
sudo apt install -y koha-common
```

---

## 7. Configure Apache

Enable required Apache modules:

```bash
sudo a2enmod rewrite cgi headers proxy_http
sudo systemctl restart apache2
```

Edit Koha configuration:

```bash
sudo nano /etc/koha/koha-sites.conf
```

Update:

```
INTRAPORT="80"
INTRAPORT="8080"
INTRAPREFIX=""
```

Restart Apache:

```bash
sudo systemctl restart apache2
```

---

## 8. Create a Koha Library Instance

```bash
sudo koha-create --create-db library
```

Check status:

```bash
sudo koha-list
```

## 9  Why koha-list is “command not found”

This is normal on newer Debian / Koha packages.

Reason:

Koha admin commands are not in your default PATH.

They live in:

```bash
/usr/sbin/
```

Fix (temporary):
```bash
sudo /usr/sbin/koha-list
```
Fix (permanent – recommended):
```bash 
echo 'export PATH=$PATH:/usr/sbin' >> ~/.bashrc
source ~/.bashrc
```

Now:
```bash 
koha-list
```
You should see:

```
library
```


---

## 10. Get Admin Password

```bash
sudo koha-passwd library
```

Output (should get something like) :
```bash 

Username for library: koha_library
Password for library: Z+=hW2PY9oN{l-yB
Press enter to clear the screen...
```

---

## 11. Access Koha Web Interfaces



### Staff Interface

```
http://your-server-ip:8080
```

### OPAC (Public Interface) - `` Dont do this util until u set up the staff interface``

```
http://your-server-ip
```

Login:

* Username: (from previous step)
* Password: (from previous step)

---

## 12. Post-Installation (Very Important)

After logging in to the Staff Interface for the first time:

1. Complete the **Koha Web Installer**
2. Choose your bibliographic framework:

   * **MARC21** (most common)
   * **UNIMARC** (mainly Europe)
3. Install:

   * Default system preferences
   * Sample libraries (optional)
   * Authorized values
4. Configure:

   * Circulation rules
   * Patron categories
   * Item types
5. Set up **SMTP email** for notices and passwords

Do **not skip this section**, as Koha will not function correctly without proper configuration.

---

## 13. Useful Koha Commands

```bash
sudo koha-list
sudo koha-start library
sudo koha-stop library
sudo koha-restart library
sudo koha-remove library
```

---

## 14. Logs and Troubleshooting (First Place to Check)

### Apache Logs

```bash
/var/log/apache2/
```

### Koha Logs

```bash
/var/log/koha/library/
```

### Common Issues

* Missing Apache modules
* Plack not running
* Database permission errors

---

## 15. Backup (Recommended)

```bash
sudo koha-dump library
```

Backups stored in:

```
/var/spool/koha/library/
```

---

## 16. Security Best Practices

* Enable firewall (UFW)
* Use HTTPS (Let's Encrypt)
* Regular backups
* Keep system updated

---

## 17. Official Resources

* [https://koha-community.org](https://koha-community.org)
* [https://wiki.koha-community.org](https://wiki.koha-community.org)

---

**Author:** Amruth L P
**Purpose:** Production-ready Koha LMS deployment on Linux

