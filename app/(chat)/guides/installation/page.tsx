import React from 'react';
import {ScrollArea} from "@/src/components/ui/scroll-area";
import MarkdownGpt from "@/src/components/markdown-gpt";

function InstallationPage() {
  const markdown = `
# 🧠 How to Install Ollama

Ollama is a tool that helps run AI models directly on your computer — no internet connection required once installed!

Follow these simple steps to get it working on your machine:

---

## ✅ Step 1: Check Your Computer

- Ollama works on **Windows**, **macOS**, and **Linux**
- Make sure your computer is **not too old** (at least 8GB RAM recommended)

---

## 💾 Step 2: Download Ollama

Go to the official download page:

👉 [https://ollama.com/download](https://ollama.com/download)

- If you're using **Windows**, click on the **Windows** button
- If you're on a **Mac**, click on **macOS**
- If you're on **Linux**, follow the instructions provided on the page

---

## 📦 Step 3: Install Ollama

- Once the file is downloaded, **double-click** to install it
- Follow the installation wizard — it’s just like installing any other app!

---

## 🚀 Step 4: Open Ollama

- After installation, **open the Ollama app**
- It might open a small black window — that’s normal!
- The app runs in the background and helps you chat with AI locally

---

## 🧪 Step 5: Check if it Works

Open your browser and go to: http://localhost:11434

If you see the Ollama welcome page, then you're all set!' (ex: Ollama is running)

---

## 🧰 Ollama CLI Guide

### 📥 1. Install / Pull a Model

Download a model to use it offline.

\`\`\`bash
ollama pull llama3.2
\`\`\`

Other examples:

\`\`\`bash
ollama pull mistral
ollama pull qwen:7b
\`\`\`

### 🚀 2. Run a Model

Start chatting with a local model:
\`\`\`bash
ollama run llama3.2
\`\`\`

### 📃 3. List Installed Models

Check which models are already available on your machine:

\`\`\`bash
ollama list
\`\`\`

### ❌ 4. Delete a Model
Remove a model to free up space:

\`\`\`bash
ollama rm llama3.2
\`\`\`

For more information, check the ollama documentation: https://github.com/ollama/ollama

  `
  return (
    <ScrollArea className={"h-[80vh] p-4"}>
      <div className={"max-w-5xl w-full mx-auto py-8"}>
        <MarkdownGpt content={markdown} className={"prose-sm!"}/>
      </div>
    </ScrollArea>
  );
}

export default InstallationPage;