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
git clone https://github.com/yourusername/course-platform.git
cd course-platform
```
### 2. Install Dependencies
```bash
bun install
```

### 3. Create .env.local
```env
  # Clerk
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
  CLERK_SECRET_KEY=your_clerk_secret_key
  
  # Convex
  NEXT_PUBLIC_CONVEX_URL=your_convex_url
  CONVEX_DEPLOY_KEY=your_convex_deploy_key
  
  # Stripe
  STRIPE_SECRET_KEY=your_stripe_secret_key
  STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
  
  # Resend
  RESEND_API_KEY=your_resend_api_key
  EMAIL_FROM_ADDRESS=you@yourdomain.com
```

### 4. Start the app
```
bun dev
```

### 5. Start Convex
```
bun convex dev
```
