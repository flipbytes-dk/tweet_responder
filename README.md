# Tweet Responder

Tweet Responder is a Next.js application that uses AI to generate witty, contextual replies to tweets. Users can authenticate, submit a tweet URL, and receive a custom-tailored response.

## Features

- **AI-Powered Replies**: Integrates with an n8n workflow to generate replies.
- **User Authentication**: Secure login with Google and Twitter using NextAuth.js.
- **Admin Dashboard**: Analytics and usage metrics for administrators.
- **Dockerized**: Ready for containerized deployment.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional, for containerized setup)

### Environment Variables

Before you begin, you'll need to set up your environment variables. Copy the `.env.example` file to a new file named `.env.local`:

```bash
cp .env.example .env.local
```

Then, open `.env.local` and fill in the required secrets and URLs.

- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Your Google OAuth credentials.
- `TWITTER_CLIENT_ID` & `TWITTER_CLIENT_SECRET`: Your Twitter OAuth credentials.
- `NEXTAUTH_URL`: Should be `http://localhost:3000` for local development.
- `NEXTAUTH_SECRET`: A randomly generated secret (`openssl rand -base64 32`).
- `N8N_WEBHOOK_URL`: The URL for your AI generation webhook.
- `DATABASE_URL`: Pre-configured for the local SQLite database.

### Local Development Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up the database:**
    Run the Prisma migrations to create the database schema.
    ```bash
    npx prisma migrate dev
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

### Docker Setup

1.  **Build the Docker image:**
    ```bash
    docker build -t tweet-responder .
    ```

2.  **Run the Docker container:**
    Make sure your `.env.local` file is complete, as Docker will use it.
    ```bash
    docker run -p 3000:3000 --env-file .env.local tweet-responder
    ```

The application will be available at `http://localhost:3000`. The container will automatically run database migrations on startup.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
