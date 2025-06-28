# 🤖 Tweetledoo - Never Be Stumped for a Reply Again!

**Have you ever stared at a tweet, wanting to reply with something clever, but your mind goes blank?** Tweetledoo is here to help!

This app uses AI to craft the perfect, witty, or professional response for you in seconds. Just paste a tweet, add your desired vibe, and let the magic happen.

### ✨ **[Try the Live Demo Now!](https://tweetledoo.vigyoti.ai/)** ✨

---

![Tweetledoo Screenshot](https://i.imgur.com/your-screenshot.png) <!-- TODO: Replace with a real screenshot or GIF of your app -->

## 🚀 Key Features

- **⚡️ Instant Witty Replies**: Go from a tweet to a brilliant comeback in one click.
- **🎭 Match Your Vibe**: Tell the AI to be funny, professional, sarcastic, or anything in between.
- **🚀 Boost Your Engagement**: Craft perfect replies that get noticed and start conversations.
- **🔐 Secure Authentication**: Sign in quickly and securely with your Google account.
- **📊 Admin Dashboard**: For admin users to view usage and analytics.

## How It Works

1.  **Sign In**: Authenticate using your Google account.
2.  **Paste Tweet URL**: Grab the URL of the tweet you want to reply to.
3.  **Set the Vibe**: Add optional instructions (e.g., "be funny," "make it professional").
4.  **Generate**: The app sends the data to an AI workflow.
5.  **Copy & Paste**: Your perfectly crafted reply appears in seconds, ready to be copied.

## 🛠️ Tech Stack

This project is built with a modern, robust tech stack, perfect for a scalable web application:

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Deployment**: [Docker](https://www.docker.com/) on [Hetzner](https://www.hetzner.com/)

## 💬 Feedback & Support

This is a new project, and we'd love your feedback! Please use the "Feedback & Support" link on the website with any ideas, suggestions, or issues.

---

## Getting Started (For Developers)

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

### Environment Variables

Copy the `.env.example` file to a new file named `.env.local` and fill in your credentials.

```bash
cp .env.example .env.local
```

- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `DATABASE_URL` (must be a PostgreSQL connection string)

### Local Development

1.  **Install dependencies:** `npm install`
2.  **Set up the database:** `npx prisma migrate dev`
3.  **Run the dev server:** `npm run dev`

The application will be available at `http://localhost:3000`.
