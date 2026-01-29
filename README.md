# Astro Blog Project

This repository contains a modern, fast, and fully content-driven blog built with **Astro 5**, **MD content collections**, and **Tailwind CSS**. It supports authors, tags, categories, RSS feeds, SEO, and a reusable component system (Starwind).

---

# Astro Blog

A modern, fast, and SEO-friendly blog built with **Astro 5**, **STARWIND UI components**, **MD**, and **Tailwind CSS**.

- ✍️ Author-based blogging system
- 🏷️ Tags and categories
- 📡 RSS feed generation
- 🌗 Dark / light mode
- 🖼️ Optimized images with `astro:assets`
- 🧩 Reusable UI components (Starwind)
- ⚡ Fast static generation

---

## 🚀 Tech Stack

- **Framework:** Astro 5
- **Styling:** Tailwind CSS
- **Content:** Astro Content Collections (Markdown)
- **RSS:** @astrojs/rss
- **Image Optimization:** Sharp

---

## 📁 Project Structure

```bash
src/
├─ assets/           # Static assets (SVGs, backgrounds)
├─ components/      # UI and layout components
│  ├─ icons/        # SVG-based icon components
│  ├─ starwind/    # Reusable UI system (Button, Card, etc.)
│  └─ BlogCard.astro
├─ config/          # Site configuration (social links)
├─ content/         # Markdown collections
│  ├─ authors/     # Author profiles
│  └─ blog/        # Blog posts and images
├─ layouts/         # Page layouts
├─ pages/           # Routes (blog, authors, RSS, etc.)
├─ scripts/         # Utility scripts
└─ styles/          # Global styles
```

---

## 🛠️ Installation

```bash

pnpm install
```

---

## ▶️ Development

```bash
pnpm dev
```

Runs the site at: `http://localhost:4321`

---

## 🏗️ Build

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

---

## ✍️ Writing a Blog Post

Create a new markdown file inside:

```bash
src/content/blog/
```

Example:

```md
---
title: My First Blog Post
description: This is my first post using Astro
publishedAt: 2025-01-01
author: amruth-l-p
tags: [astro, tailwind]
category: web
heroImageDark: ./images/astro-logo-dark.png
heroImageLight: ./images/astro-logo-light.png
---

Your content goes here...
```

---

## 👤 Adding an Author

Create a file in:

```bash
src/content/authors/
```

Example:

```md
---
name: Amruth L P
title: Full Stack Developer
bio: Building tools with Astro and modern web technologies.
avatar: /assets/avatar.png
socials:
  github: https://github.com/yourname
  linkedin: https://linkedin.com/in/yourname
---
```

---

## 📡 RSS Feed

RSS is generated at:

```bash
/rss.xml
```

Powered by `@astrojs/rss`.

---

## 🌐 SEO & Sitemap

* Sitemap: `/sitemap-index.xml`
* Robots file: `/robots.txt`

---

## 📦 Scripts

| Command        | Description          |
| -------------- | -------------------- |
| `pnpm dev`     | Start dev server     |
| `pnpm build`   | Build for production |
| `pnpm preview` | Preview production   |




---


## 🧱 Architecture Overview

This project is based on **Astro Content Collections** and **file-based routing**.

### Content Flow

```text
Markdown
   ↓
Astro Content Collections
   ↓
Pages (routes)
   ↓
Layouts
   ↓
UI Components
```

---

## 📂 Content Collections

Defined in:

```ts
src/content/config.ts
```

### Blog Collection

Each blog post supports:

* `title`
* `description`
* `publishedAt`
* `author` (reference to authors collection)
* `tags`
* `category`
* `heroImage`

### Authors Collection

Each author supports:

* `name`
* `title`
* `bio`
* `avatar`
* `socials`

---

## 🧩 UI System (Starwind)

Reusable components live in:

```bash
src/components/starwind/
```

### Available Components

* `Button`
* `Card`
* `CardHeader`
* `CardContent`
* `CardFooter`
* `CardTitle`
* `CardDescription`

These components use **Tailwind Variants** for styling consistency.

---

## 🛣️ Routing

| Path                        | Description     |
| --------------------------- | --------------- |
| `/`                         | Homepage        |
| `/blog`                     | Blog listing    |
| `/blog/[slug]`              | Blog post page  |
| `/blog/tag/[tag]`           | Tag filter      |
| `/blog/category/[category]` | Category filter |
| `/authors`                  | Authors listing |
| `/authors/[slug]`           | Author profile  |
| `/rss.xml`                  | RSS feed        |

---

## 🖼️ Image Handling

Images inside blog posts use:

```astro
import { Image } from "astro:assets";
```

This provides:

* Automatic resizing
* Format optimization
* Lazy loading

---

## 🌗 Theme System

Theme logic is handled by:

```bash
src/components/theme-init.astro
src/components/theme-toggle.astro
```

Supports:

* Light mode
* Dark mode
* System preference

---

## 📜 RSS Configuration

Located at:

```bash
src/pages/rss.xml.ts
```

It pulls from the blog collection and generates a valid XML feed.

---

## 🔍 SEO

SEO is handled in:

```bash
src/layouts/BaseLayout.astro
```

Includes:

* Meta tags
* OpenGraph
* Twitter cards
* Canonical URLs

---

## 🧪 Development Tips

* Use `pnpm dev` for hot reload
* Validate frontmatter fields carefully
* Always optimize images in `/content/blog/images`

---

## 🚀 Deployment

This project can be deployed on:

* Vercel
* Netlify
* Cloudflare Pages

Recommended build command:

```bash
pnpm build
```

Output directory:

```bash
dist/
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📜 License

MIT License


