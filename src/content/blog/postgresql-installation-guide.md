---
title: "PostgreSQL 18 Installation & Setup Guide for Debian and Ubuntu"
description: "A production-ready, step-by-step guide to installing PostgreSQL 18 on Debian and Ubuntu using the official PostgreSQL APT repository. Covers secure installation, user and database setup, authentication configuration, and best practices for modern web applications."
pubDate: 2026-02-08 08:00
updatedDate: 2026-02-08 08:00
author: techno-drishti
purpose: "This guide provides a reliable and reproducible method to install and configure PostgreSQL 18 on Debian and Ubuntu systems. It is designed to help developers and system administrators avoid version mismatches, ensure predictable deployments, and prepare PostgreSQL for use with modern application stacks."
category: database
tags:
  - postgresql
  - postgresql-18
  - database
  - debian
  - ubuntu
  - linux
  - backend
  - devops
  - server
  - installation
heroImageLight: ./images/postgresql-18/postgresql-install-light.jpeg
heroImageDark: ./images/postgresql-18/postgresql-install-dark.jpeg
---

# PostgreSQL 18 Installation & Setup Guide

**Target OS:** Ubuntu / Debian
**PostgreSQL Version:** 18 (latest stable)
**Audience:** Developers (Next.js, Django, Laravel, NestJS, etc.)

---

## Overview

This document describes how to install **PostgreSQL 18** on Debian or Ubuntu using the **official PostgreSQL APT repository**, followed by basic configuration suitable for application development and production use.

Ubuntu/Debian default repositories may ship older PostgreSQL versions. Using the official PostgreSQL repository ensures access to the latest supported release and timely security updates.

---

## Step 0: Add the Official PostgreSQL APT Repository

> **Required** to install PostgreSQL 18

```bash
sudo apt install curl ca-certificates gnupg -y

curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc \
  | sudo gpg --dearmor -o /usr/share/keyrings/postgresql.gpg

echo "deb [signed-by=/usr/share/keyrings/postgresql.gpg] \
http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" \
  | sudo tee /etc/apt/sources.list.d/pgdg.list

sudo apt update
```

---

## Step 1: Update System Packages

```bash
sudo apt update
sudo apt upgrade -y
```

---

## Step 2: Install PostgreSQL 18

Installs:

- PostgreSQL server
- PostgreSQL client
- Common extensions

```bash
sudo apt install postgresql-18 postgresql-client-18 postgresql-contrib -y
```

---

## Step 3: Verify PostgreSQL Service

Check service status:

```bash
sudo systemctl status postgresql
```

If not running:

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

---

## Step 4: Switch to the `postgres` System User

PostgreSQL creates a system user named `postgres`.

```bash
sudo -i -u postgres
```

---

## Step 5: Access PostgreSQL Shell (psql)

```bash
psql
```

Expected prompt:

```text
postgres=#
```

Exit:

```sql
\q
```

---

## Step 6: Set Password for `postgres` User

```sql
ALTER USER postgres PASSWORD 'strongpassword';
```

---

## Step 7: Create a Database

```sql
CREATE DATABASE mydb;
```

---

## Step 8: Create an Application User (Recommended)

> Do **not** use the `postgres` user in applications.

```sql
CREATE USER myuser WITH PASSWORD 'mypassword';
```

Grant privileges:

```sql
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
```

---

## Step 9: Enable Password Authentication

Edit authentication configuration:

```bash
sudo nano /etc/postgresql/18/main/pg_hba.conf
```

Change:

```text
local   all   all   peer
```

To:

```text
local   all   all   md5
```

Restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

---

## Step 10: Test Login

```bash
psql -U myuser -d mydb
```

Successful login confirms correct setup.

---

## Version Verification

```bash
psql --version
```

Expected output:

```text
psql (PostgreSQL) 18.x
```

---

## Connection String Example

```text
postgresql://myuser:mypassword@localhost:5432/mydb
```

---

## Notes & Best Practices

- PostgreSQL **18** is the latest stable and actively supported release
- PostgreSQL **17, 16, 15, 14** are still supported
- PostgreSQL **13 and below** are end-of-life and should not be used
- Always use a **dedicated database user** for applications
- For production, consider:
  - SSL connections
  - Automated backups
  - Role-based permissions

---
