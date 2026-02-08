#⚡ Tiny Raw Node.js: Uptime Monitoring API

<p>
  <img src="https://img.shields.io/badge/Node.js-LTS-green?style=for-the-badge&logo=node.js" alt="Node.js Badge">
  <img src="https://img.shields.io/badge/Status-Ongoing-orange?style=for-the-badge" alt="Status Badge">
  <img src="https://img.shields.io/badge/Framework-None%20(Raw)-red?style=for-the-badge" alt="No Framework Badge">
</p>

---

## 🚀 Overview

**Tiny Raw Node.js** is a high-performance, framework-less Uptime Monitoring API. It’s built to monitor whether your favorite websites are up or down and notify you instantly.

The core philosophy of this project is to master **Node.js Internals** by avoiding high-level frameworks like Express and building everything—from the router to the database—using only Node.js Core Modules.

---

## ✨ Key Features

- **Zero Dependencies:** No `npm install`. Built with 100% pure Node.js.
- **Dual-Core Architecture:** A standalone **Server** to handle API requests and a dedicated **Worker** to handle background pings.
- **Custom File-DB:** A handwritten library for CRUD operations using the `fs` module.
- **Security First:** SHA256 password hashing and secure token-based authentication.
- **Protocol Flexibility:** Support for both HTTP and HTTPS monitoring.

---

## 🛠️ The Tech Stack (Core Modules)

| Module           | Purpose                                        |
| :--------------- | :--------------------------------------------- |
| `http` & `https` | Creating the server and making external pings. |
| `fs`             | Handling the file-based JSON database.         |
| `crypto`         | Hashing passwords for secure storage.          |
| `url`            | Parsing complex request strings.               |
| `string_decoder` | Processing raw buffer streams from requests.   |

---

## 📂 System Architecture

```text
tiny_raw_nodejs/
├── .data/              # JSON-based Storage (Users, Tokens, Checks)
├── lib/                # The Brain (Data CRUD, Workers logic)
├── helpers/            # Utilities (Hashing, Notifications, Environments)
├── handlers/           # Route Logic (User, Token, Check Handlers)
├── index.js            # Entry Point (Spins up Server & Workers)
└── config.js           # Environment Settings (Staging/Production)
```
