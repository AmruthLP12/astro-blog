---
title: "Install Latest Docker Engine on Ubuntu"
description: "A complete step-by-step guide to installing the latest Docker Engine on Ubuntu using Docker’s official repository. Includes Docker Compose v2 and Buildx."

author: amruth-l-p

Purpose: "This guide provides a production-ready method to install Docker Engine on Ubuntu using Docker’s official repository. It ensures access to the latest stable version, including Docker Compose v2 and Buildx, while following best practices for development and server environments."

pubDate: 2026-02-11 19:50
updatedDate: 2026-02-11 19:50

heroImageLight: ./images/docker-install/docker-install-light.jpeg
heroImageDark: ./images/docker-install/docker-install-dark.jpeg

category: devops

tags:
  - docker
  - docker-engine
  - docker-compose
  - buildx
  - ubuntu
  - linux
  - containers
  - devops
  - server-setup
  - installation
---

## Overview

This document explains how to install the **latest stable version of Docker Engine** on Ubuntu using **Docker’s official repository**.

Using the official repository ensures:

- Up‑to‑date packages
- Verified and secure installations
- Full support for Docker Engine, Compose v2, and Buildx

### Supported Ubuntu Versions

- Ubuntu **20.04 LTS**
- Ubuntu **22.04 LTS**
- Ubuntu **24.04 LTS**

---

## Prerequisites

- Ubuntu system with **sudo** access
- Active internet connection
- Clean system (recommended for production)

---

## Step 1: Update the System

Before installing Docker, update your system packages to avoid dependency conflicts.

```bash
sudo apt update
sudo apt upgrade -y
```

---

## Step 2: Install Required Dependencies

These packages are required to securely add Docker’s repository and verify packages.

```bash
sudo apt install -y ca-certificates curl gnupg lsb-release
```

---

## Step 3: Add Docker’s Official GPG Key

Docker uses GPG signing to verify the integrity of its packages.

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

Set proper permissions:

```bash
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

---

## Step 4: Add Docker Repository (Stable)

Add Docker’s official stable repository for your Ubuntu release.

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Update the package index:

```bash
sudo apt update
```

---

## Step 5: Install Docker Engine and Tools

Install Docker Engine along with essential tools such as Docker Compose v2 and Buildx.

```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Installed Components

- Docker Engine (latest stable)
- Docker CLI
- Containerd
- Docker Compose v2
- Docker Buildx

---

## Step 6: Start and Enable Docker

Enable Docker to start automatically on system boot and start the service immediately.

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Check service status:

```bash
sudo systemctl status docker
```

---

## Step 7: Verify Installation

Check Docker and Docker Compose versions:

```bash
docker --version
docker compose version
```

Run a test container:

```bash
sudo docker run hello-world
```

If you see:

> **"Hello from Docker!"**

Docker is installed correctly.

---

## Step 8: Run Docker Without sudo (Recommended)

Add your user to the Docker group:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verify:

```bash
docker run hello-world
```

Docker should now work **without sudo**.

---

## Useful Paths and Debugging Tips

### Docker Data Directory

```text
/var/lib/docker
```

### Docker Configuration File

```text
/etc/docker/daemon.json
```

### Docker Logs

```bash
journalctl -u docker
```

---

## Conclusion

You have successfully installed the **latest Docker Engine on Ubuntu** using Docker’s official and recommended method.

This setup is suitable for:

- Development
- Testing
- Production workloads

You now have Docker Engine, Docker Compose v2, and Buildx ready to use.
