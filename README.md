
# Whispering Pages

An elegant collection of contemporary poetry exploring themes of love, loss, nature, and the human experience.

## 🌟 Project Overview

Whispering Pages is a modern web application for reading, sharing, and managing poetry. It features a beautiful UI, categorized poems, and a contact form for readers to connect.

## ✨ Features

- Browse featured and categorized poems
- Responsive, mobile-friendly design
- Modern UI with shadcn-ui and Tailwind CSS
- Contact form for feedback and questions
- Supabase integration for storing poems and contact submissions

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)


## 🛠️ Installation

Clone the repository and install dependencies:

```sh
git clone <YOUR_GIT_URL>
cd whispering-pages-main
npm install
# or
yarn install
```

### Linting

```sh
npm run lint
# or
yarn lint
```

### Building for Production

```sh
npm run build
# or
yarn build
```

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

## 🛠️ Tech Stack

- [Vite](https://vitejs.dev/) – Fast build tool
- [React](https://react.dev/) – UI library
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [shadcn/ui](https://ui.shadcn.com/) – UI components
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS
- [Supabase](https://supabase.com/) – Backend as a Service (database & auth)

## 🗄️ Database (Supabase)

This project uses [Supabase](https://supabase.com/) for storing poems and contact submissions. See `supabase-schema.sql` for the schema and setup instructions.

**Environment variables required:**

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Add these to a `.env` file in the project root.

## 📦 Deployment

You can deploy Whispering Pages to any modern hosting provider (Vercel, Netlify, etc.).

For Vercel, see `vercel.json` for SPA routing configuration.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

MIT
