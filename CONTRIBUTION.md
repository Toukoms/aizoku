# 🤝 Contribution Guidelines

Thank you for considering contributing to **Aizoku**!  
We welcome issues, improvements, new features, or even docs. Here’s how to get started:

---

## 🛠️ Project Stack

- **Next.js** (App Router, Server Actions)
- **TypeScript**
- **Prisma** + **PostgreSQL**
- **Zustand** (state management)
- **Zod** (schema validation)
- **React Markdown**
- **Tailwind CSS**
- **Ollama** for local AI model serving

---

## 📂 Project Structure

The project is mainly structured as follows:

- **/app**: All the files related to the pages of the Next.js 15 app are here. This includes authentication pages, chat,
  and other features. For more information about the App Router in Next.js, we recommend checking out the official
  Next.js documentation.

- **/src**: The core logic and components of the project reside here. You’ll find the following directories:
    - **actions**: For handling business logic, such as interactions with the database or user actions.
    - **store**: Contains the application state management.
    - **components**: Reusable components that form the app's user interface.
    - **types**: TypeScript type definitions used throughout the project.
    - **schema**: Zod schema definitions to ensure type safety for form handling.

- **/public**: This folder is reserved for static assets like images, fonts, and other files necessary for the app's
  proper functioning.

- **/prisma**: Contains files necessary for managing the database through Prisma. The Prisma schema (`schema.prisma`)
  defines the database structure, and migrations are stored here.

We encourage creativity and experimentation, so feel free to explore and structure your code as you see fit. Every
approach is welcome, but we’ll discuss them during the code reviews.

---

## 🧪 Running Locally (Dev Mode)

Follow the [README.md](./README.md) for setup instructions.  
Make sure:

- You have **Ollama** installed and running
- Your `.env` file is correctly configured with PostgreSQL

```bash
pnpm dev

## 🧪 Running Locally (Dev Mode)

Follow the [README.md](./README.md) for setup instructions.
Make sure:

- You have **Ollama** installed and running
- Your `.env` file is correctly configured with PostgreSQL

```bash
pnpm dev
```

---

## 🔍 Want to Contribute?

1. **Fork** this repository
2. **Clone** your fork and create a branch from develop branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. Make your changes
4. Commit with a meaningful message:
   ```bash
   git commit -m "feat: add x feature"
   ```
5. Push your branch:
   ```bash
   git push origin feat/your-feature-name
   ```
6. Open a **Pull Request**

---

## ✨ Code Style & Tips

- Follow existing patterns — keep code modular & readable
- Use descriptive commit messages
- If unsure, open a Draft PR early to get feedback

---

Let’s build a great offline AI experience together — welcome to the Aizoku clan 🧠💜

