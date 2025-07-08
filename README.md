# 📚 Course Platform

A modern course platform built with **Next.js App Router**, **Convex backend**, and **Stripe** for payments. Includes transactional email support via Resend + React Email.

## 🚀 Features

- 🧑‍🏫 User authentication via Clerk
- 🎓 Course creation & enrollment
- 💳 Stripe-powered checkout & billing
- ✉️ Transactional emails with Resend + React Email
- 🧠 Real-time backend using Convex
- ⚡ Fast deployment with Vercel
- 🌐 Type-safe and fully styled with Tailwind & Shadcn UI

---

## 🛠️ Tech Stack

| Area        | Tech                                                                 |
|-------------|----------------------------------------------------------------------|
| Frontend    | Next.js 14 (App Router), Tailwind CSS, Shadcn UI                     |
| Backend     | Convex (functions + database)                                        |
| Auth        | Clerk                                                                |
| Payments    | Stripe                                                               |
| Emails      | [Resend](https://resend.com) + [React Email](https://react.email)    |
| Hosting     | Vercel                                                               |
| Tooling     | TypeScript, ESLint, Prettier                                         |

---

## 🧑‍💻 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Aneeshie/course-platform.git
cd course-platform
```
### 2. Install Dependencies
```bash
bun install
```

### 3. Create .env.local
```env
  # Clerk
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=****
  CLERK_SECRET_KEY=****
  
  # Convex
  NEXT_PUBLIC_CONVEX_URL=****
  CONVEX_DEPLOY_KEY=****
  
  # Stripe
  STRIPE_SECRET_KEY=****
  STRIPE_WEBHOOK_SECRET=****
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=****
  
  # Resend
  RESEND_API_KEY=****
  EMAIL_FROM_ADDRESS=****
```

### 4. Start the app
```
bun dev
```

### 5. Start Convex
```
bun convex dev
```
