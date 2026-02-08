# Tiny Raw Node.js 🚀

A lightweight, framework-less API built entirely with **Node.js Core Modules**. This project is a deep dive into the "under-the-hood" mechanics of Node.js, focusing on building a production-grade system without using any third-party frameworks like Express.js.



## 🎯 Project Goals
* Understand the **Asynchronous Nature** of Node.js.
* Master the **Request-Response Lifecycle**.
* Build a custom **File-based Data Storage** system (CRUD).
* Implement security features like **Hashing** and **Authentication Tokens**.
* Handle **Environment Configuration** (Staging vs. Production).

---

## ✨ Key Features
* **No Frameworks:** 100% Vanilla Node.js.
* **Custom Router:** A handwritten router to handle different API endpoints.
* **File Database:** Data persistence using the `fs` and `path` modules.
* **Security:** Password hashing using the `crypto` module.
* **Token-based Auth:** Custom implementation of authentication tokens.
* **Protocol Support:** Handles both `HTTP` and `HTTPS` requests.



---

## 📂 Project Structure
```text
.
├── .data/              # File-based storage (JSON files)
├── helpers/            # Utility functions (hashing, notifications)
├── lib/                # Core library (data handling logic)
├── handlers/           # Route handlers (user, tokens, etc.)
├── config.js           # Environment configurations
├── index.js            # Entry point of the application
└── routes.js           # Routing logic