# 🧠 Aizoku — Your Offline AI Companion

**Aizoku** is a local-first AI assistant built for **everyone**.  
It’s privacy-friendly, offline-ready, and model-flexible — powered by [Ollama](https://ollama.com/).

> _"Aizoku" comes from the fusion of "AI" and "Zoku" (族), meaning "clan" or "tribe" in Japanese — because you're never
alone when Aizoku is with you._

---

## ✅ Features Implemented

- 🔐 Login & Signup (with secret question & answer for future password reset)
- 🧠 New chat creation with AI-generated titles
- 🔁 Streaming chat
- 📜 Chat history listing
- 🚪 Logout functionality

## 🛠️ Upcoming Features

- 🗑️ Delete a chat
- ⚙️ User settings
- 📘 Installation guides
- 🧠 Model selection (for now it is set `qwen2.5-coder:3b` by default)
- 📋 Message copy/paste
- 🎙️ Voice communication
- ➕ Plugins, file upload, image generation, etc.

## 🧰 Prerequisites

- **Node.js** (v18+ recommended)
- **pnpm** (or npm/yarn)
- **Ollama** installed locally
    - [https://ollama.com/download](https://ollama.com/download)
- **PostgreSQL** database

## 🚀 Getting Started (Local Installation)

1. **Clone the repo:**
   ```bash
   git clone https://github.com/toukoms/aizoku.git
   cd aizoku
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the app:**
   ```bash
   pnpm dev
   ```

4. **Access your app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Tech Stack

- 🧱 Next.js (with **Server Actions**)
- 💾 Prisma ORM + PostgreSQL
- ⚛️ React (with **Zustand** for state management)
- 🧾 React Markdown (for rendering messages)
- 🧠 Ollama (local AI model management)

---

## 📄 Documentation

Additional guides and contribution info:

- [HELP.md](./HELP.md)
- [CONTRIBUTION.md](./CONTRIBUTION.md)

