---
title: "Node.js fs vs fs-extra: Differences, Examples & Best Practices"
description: "Learn the difference between Node.js fs and fs-extra with practical examples, use cases, and best practices."
pubDate: 2026-07-07 10:00
updatedDate: 2026-07-07 10:00
category: devops
author: amruth-l-p
purpose: "Learn the difference between Node.js fs and fs-extra with practical examples, use cases, and best practices."
heroImageLight: ./images/node-fs-vs-fs-extra/node-fs-vs-fs-extra-light.jpg
heroImageDark: ./images/node-fs-vs-fs-extra/node-fs-vs-fs-extra-dark.jpg
tags:
  - Node.js
  - JavaScript
  - Backend
  - fs
  - fs-extra
---

# Node.js `fs` vs `fs-extra`

When working with files in Node.js, you'll often come across two options:

- **`fs`** (Built-in Node.js File System module)
- **`fs-extra`** (An enhanced version of `fs`)

Many beginners wonder:

> "If Node.js already provides `fs`, why do we need `fs-extra`?"

Let's understand the difference.

---

# What is `fs`?

`fs` is the **built-in File System module** that comes with Node.js.

No installation is required.

```js
import fs from "node:fs/promises";
```

or

```js
const fs = require("fs");
```

It allows you to:

- Read files
- Write files
- Delete files
- Rename files
- Create directories
- Watch files
- And much more

---

# Example: Reading a File

```js
import fs from "node:fs/promises";

const data = await fs.readFile("notes.txt", "utf8");

console.log(data);
```

---

# Example: Writing a File

```js
import fs from "node:fs/promises";

await fs.writeFile(
    "hello.txt",
    "Hello World!"
);
```

Simple enough.

---

# What is `fs-extra`?

`fs-extra` is an npm package that **includes every feature of the native `fs` module and adds many additional utility methods**. It is designed as a drop-in replacement, so you can use native `fs` methods while also getting extra convenience functions. :contentReference[oaicite:0]{index=0}

Install it:

```bash
npm install fs-extra
```

Then import it:

```js
import fs from "fs-extra";
```

That's it.

---

# Why was `fs-extra` created?

The native `fs` module often requires multiple operations for common tasks.

For example:

- Create a directory
- Check if it exists
- Write a file
- Copy folders
- Delete folders recursively

With native `fs`, you usually write several lines of code.

With `fs-extra`, many of these tasks become a single function call.

---

# Example 1 — Creating Nested Directories

## Using `fs`

```js
import fs from "node:fs/promises";

await fs.mkdir("uploads/images", {
    recursive: true,
});
```

---

## Using `fs-extra`

```js
import fs from "fs-extra";

await fs.ensureDir("uploads/images");
```

Much cleaner.

---

# Example 2 — Writing a File

Suppose the directory doesn't exist.

## Using `fs`

```js
await fs.mkdir("uploads", {
    recursive: true,
});

await fs.writeFile(
    "uploads/test.txt",
    "Hello"
);
```

You must manually create the directory first.

---

## Using `fs-extra`

```js
await fs.outputFile(
    "uploads/test.txt",
    "Hello"
);
```

`outputFile()` automatically creates missing directories before writing the file.

---

# Example 3 — Copying Directories

## Using `fs`

You'll need to write recursive copy logic or use newer Node APIs depending on your Node.js version.

---

## Using `fs-extra`

```js
await fs.copy(
    "assets",
    "public/assets"
);
```

Done.

---

# Example 4 — Reading JSON

## Using `fs`

```js
const data = await fs.readFile(
    "config.json",
    "utf8"
);

const config = JSON.parse(data);
```

---

## Using `fs-extra`

```js
const config = await fs.readJson(
    "config.json"
);
```

Cleaner and easier.

---

# Example 5 — Writing JSON

## Using `fs`

```js
await fs.writeFile(
    "config.json",
    JSON.stringify(data, null, 2)
);
```

---

## Using `fs-extra`

```js
await fs.writeJson(
    "config.json",
    data,
    {
        spaces: 2,
    }
);
```

---

# Example 6 — Removing Files or Directories

## Using `fs`

```js
await fs.rm(
    "uploads",
    {
        recursive: true,
        force: true,
    }
);
```

---

## Using `fs-extra`

```js
await fs.remove("uploads");
```

Works for both files and directories.

---

# Common `fs-extra` Methods

| Method | Purpose |
|---------|----------|
| `copy()` | Copy files or folders |
| `move()` | Move files |
| `remove()` | Delete files or folders |
| `ensureDir()` | Create a directory if it doesn't exist |
| `ensureFile()` | Create a file if missing |
| `outputFile()` | Write a file and create parent directories automatically |
| `readJson()` | Read JSON files |
| `writeJson()` | Write JSON files |
| `pathExists()` | Check whether a path exists |

These utilities reduce boilerplate and make file operations much simpler. :contentReference[oaicite:2]{index=2}

---

# Feature Comparison

| Feature | fs | fs-extra |
|---------|----|----------|
| Built into Node.js | ✅ | ❌ |
| Installation Required | ❌ | ✅ |
| Read File | ✅ | ✅ |
| Write File | ✅ | ✅ |
| Copy Folder | Limited / Version dependent | ✅ |
| Read JSON | Manual | ✅ |
| Write JSON | Manual | ✅ |
| Auto Create Directories | ❌ | ✅ |
| Remove Folder Easily | Basic APIs | ✅ |
| Extra Utility Functions | ❌ | ✅ |

---

# When Should You Use `fs`?

Choose `fs` if:

- You only need basic file operations.
- You want zero external dependencies.
- Your project is small or simple.
- You prefer using only Node.js built-in modules.

---

# When Should You Use `fs-extra`?

Choose `fs-extra` if:

- You're building backend applications.
- You're creating upload systems.
- You're working with JSON configuration files.
- You frequently copy or move files.
- You want cleaner, shorter code.

---

# Which One Do I Recommend?

For **small scripts**:

✅ Use `fs`

For **production applications** like:

- Express.js APIs
- Next.js backends
- File upload services
- CMS systems
- CLI tools

I generally recommend **`fs-extra`** because it reduces boilerplate, keeps your code more readable, and provides useful utilities while remaining compatible with the native `fs` API.

---

# Final Thoughts

`fs` is powerful and built into Node.js, making it a great choice for basic file system tasks.

However, as your application grows, you'll often find yourself writing repetitive code for common operations like creating directories, copying folders, or handling JSON files.

That's where `fs-extra` shines—it extends the native `fs` module with practical helper methods that make everyday file operations simpler and more maintainable.

If you're just getting started, learn **`fs`** first so you understand the fundamentals. Once you're comfortable, adding **`fs-extra`** to your toolkit can significantly improve your developer experience.

Happy Coding! 🚀