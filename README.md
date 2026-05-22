# Tesuto

[![VS Code Version](https://img.shields.io/badge/VS%20Code-%5E1.85.0-blue.svg)](https://code.visualstudio.com/updates)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

&gt; **Test APIs without leaving VS Code.**  
&gt; A lightweight, fast, and intuitive API client built directly into your editor sidebar.

---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Commands](#commands)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Release Notes](#release-notes)
- [License](#license)

---

## Features

### Core API Testing
- **Send HTTP requests** — GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
- **Custom headers** — Key-value editor with add/remove
- **JSON body editor** — Syntax-aware with validation feedback
- **Bearer token authentication** — Secure token storage with masking
- **Environment selector** — Switch between Development, Staging, Production

### Collections
- **Organize requests** into named collections
- **Save requests** with metadata (name, method, URL, headers, body)
- **One-click replay** — Load saved requests directly into the workspace
- **Persistent storage** — Collections survive across VS Code sessions

### History
- **Automatic request logging** — Every sent request is tracked
- **Quick replay** — Click any history item to restore and resend
- **Clear history** — One-click cleanup

### Token Management
- **Secure token storage** — JWTs and API keys with visual masking
- **Active token injection** — Automatically adds `Authorization: Bearer` header
- **Per-token activation** — Toggle which token is active per session

### Native VS Code Integration
- **Sidebar webview** — Lives in the Activity Bar, no panel juggling
- **Dark theme native** — Uses VS Code CSS variables for seamless theming
- **Command palette integration** — Open Tesuto from anywhere

---

## Requirements

| Dependency | Version |
|------------|---------|
| VS Code | `^1.85.0` |
| Node.js | `&gt;=18.0.0` |
| npm | `&gt;=9.0.0` |

---

## Installation

### From Source (Development)

```bash
git clone https://github.com/your-name/tesuto.git
cd tesuto
npm install
npm run compile
npm run dev