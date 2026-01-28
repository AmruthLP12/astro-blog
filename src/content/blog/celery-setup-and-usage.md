---
title: "Celery Setup and Usage Guide for Django: Redis, Tasks, Retries & Monitoring"

description: "A complete, production-ready guide to installing and configuring Celery with Django using Redis as a broker. Covers task creation, retries, scheduling, monitoring with Flower, and best practices for running Celery in real-world deployments."

author: amruth-l-p

Purpose: "This guide provides a step-by-step, production-focused walkthrough for integrating Celery into a Django application. It explains how to offload long-running and background tasks using Redis, implement retries and scheduling, monitor task health, and avoid common pitfalls when deploying Celery in live environments."

pubDate: 2026-01-21 11:51

updatedDate: 2026-01-21 11:51



category: "backend"

tags:
  - django
  - celery
  - redis
  - background-jobs
  - task-queue
  - devops
  - python
  - async
  - flower
  - production


---

# Celery Setup and Usage Guide for Django

This document walks you through **installing, configuring, and using Celery in a Django project from scratch**, including Redis as a broker, task creation, retries, monitoring, and common pitfalls.

---

## 1. What is Celery?

Celery is an **asynchronous task queue** used to run time‑consuming work outside the main Django request/response cycle.

**Common use cases:**

* Sending emails
* Generating reports
* Background data processing
* Scheduled jobs (cron‑like)

---

## 2. Prerequisites

* Python 3.9+
* Django 4+
* Virtual environment (recommended)
* Redis (message broker)

---

## 3. Create & Activate Virtual Environment

```bash
python -m venv venv
source venv/bin/activate
```

---

## 4. Install Required Packages

```bash
pip install django celery redis django-celery-beat django-celery-results
```

***Each package has a specific role in the Django + Celery ecosystem.***

Save dependencies:

```bash
pip freeze > requirements.txt
```

### **4.1. django**

**Purpose:** Django is the **core web framework** used to build the application.

**Role in Celery setup:**

*   Provides project structure and settings
    
*   Allows Celery to integrate with Django apps
    
*   Enables task discovery from installed apps
    
*   Triggers background tasks from views, signals, and commands
    

Without Django, Celery would have no application context to work with.

### **4.2. celery**

**Purpose:** Celery is the **asynchronous task queue engine**.

**Role in the system:**

*   Executes background tasks outside the HTTP request cycle
    
*   Manages worker processes
    
*   Handles retries, delays, countdowns, and task routing
    
*   Communicates with message brokers and result backends
    

Example:

```python
send_email.delay()
```

Celery is responsible for actually **running background jobs**.

### **4.3. redis**

**Purpose:** This is the **Python client library for Redis**.

**Role in the system:**

*   Enables Celery to connect to Redis
    
*   Sends tasks to Redis (broker)
    
*   Reads queued tasks from Redis
    

Redis itself is the **message broker** redis package is the **Python interface** used by Celery

Without this package, Celery cannot communicate with Redis.

### **4.4. django-celery-beat**

**Purpose:** Provides **database-backed scheduling** for Celery.

**Role in the system:**

*   Stores periodic tasks in Django’s database
    
*   Allows task schedules to be managed from Django Admin
    
*   Replaces system cron jobs (crontab)
    
*   Ensures schedules persist across restarts
    

**Common use cases:**

*   Daily email reports
    
*   Weekly cleanup jobs
    
*   Monthly billing or payroll tasks
    

This package is required when you need **scheduled (periodic) tasks**.

### **4.5. django-celery-results**

**Purpose:** Stores **task results and execution status** in the Django database.

**Role in the system:**

*   Saves task states such as:
    
    *   PENDING
        
    *   STARTED
        
    *   SUCCESS
        
    *   FAILURE
        
    *   RETRY
        
*   Enables monitoring and debugging
    
*   Allows result inspection from code or admin panel
    

Example:

```python
task = my_task.delay()

task.status
```

This is especially useful for **auditing, debugging, and visibility** in production.

### **Package Dependency Summary**

| Package               | Required | Description               |
| --------------------- | -------- | ------------------------- |
| django                | Yes      | Core web framework        |
| celery                | Yes      | Background task execution |
| redis                 | Yes      | Broker communication      |
| django-celery-beat    | Optional | Periodic task scheduling  |
| django-celery-results | Optional | Task result tracking      |

---

## 5. Install & Start Redis

### Ubuntu / Debian

```bash
sudo apt install redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

Verify:

```bash
redis-cli ping
# PONG
```

---

## 6. Create Django Project & App

```bash
django-admin startproject core
cd core
python manage.py startapp app
```

---

## 7. Configure Celery in Django

### 7.1 Create `celery.py`

**`core/celery.py`**

```python
import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

app = Celery("core")

app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
```

---

### 7.2 Load Celery on Django Startup

**`core/__init__.py`**

```python
from .celery import app as celery_app
__all__ = ("celery_app",)
```

---

## 8. Django Settings Configuration

### 8.1 Add Apps

```python
INSTALLED_APPS = [
    "django_celery_results",
    "django_celery_beat",
]
```

---

### 8.2 Celery Broker & Backend

```python
CELERY_BROKER_URL = "redis://127.0.0.1:6379/0"
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"

CELERY_RESULT_BACKEND = "django-db"
```

---

### 8.3 Timezone (important)

```python
CELERY_TIMEZONE = TIME_ZONE
```

---

## 9. Run Migrations

```bash
python manage.py migrate
```

---

## 10. Create Your First Celery Task

### 10.1 Task File

**`app/tasks.py`**

```python
from celery import shared_task

@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=5, retry_kwargs={"max_retries": 3})
def add(self, x, y):
    return x + y
```

---

## 11. Calling Celery Tasks

### 11.1 From Django Shell

```bash
python manage.py shell
```

```python
from app.tasks import add
add.delay(2, 3)
```

---

### 11.2 From a View

```python
from app.tasks import add

def my_view(request):
    add.delay(5, 7)
    return HttpResponse("Task queued")
```

---

## 12. Start Celery Worker

```bash
celery -A core worker -l info
```

---

## 13. Scheduled Tasks (Celery Beat)

### 13.1 Migrate

```bash
python manage.py migrate
```

### 13.2 Start Beat

```bash
celery -A core beat -l info
```

Or combined:

```bash
celery -A core worker -B -l info
```

---

## 14. Monitoring with Flower

```bash
pip install flower
celery -A core flower
```

Access: `http://localhost:5555`

---

## 15. Common Celery Commands (Makefile Friendly)

```makefile
celery:
	celery -A core worker -l info

celery-beat:
	celery -A core beat -l info

flower:
	celery -A core flower
```

---

## 16. What Happens if Celery Stops?

* **Queued tasks remain in Redis**
* Tasks resume when worker restarts
* In‑progress tasks may be retried (depends on ACKs)

**Recommended:**

```python
CELERY_ACKS_LATE = True
CELERY_TASK_REJECT_ON_WORKER_LOST = True
```

---

## 17. Production Tips

* Run multiple workers
* Use Supervisor / systemd
* Separate queues for heavy tasks
* Monitor Redis memory

---

## 18. Folder Structure

```
core/
├── core/
│   ├── celery.py
│   ├── settings.py
│   └── __init__.py
├── app/
│   ├── tasks.py
│   └── views.py
```

---

## 19. Summary

You now have:

* Celery + Django configured
* Redis as broker
* Async & scheduled tasks
* Monitoring with Flower

This setup is **production‑ready and scalable**.


