import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import AuthButton from "@/components/AuthButton";
import { useSession, signIn } from "next-auth/react";
import ReplyForm from "@/components/ReplyForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ReplyCard from '@/components/ReplyCard'
import Logo from '@/components/Logo'
import { FeedbackDialog } from '@/components/FeedbackDialog'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex flex-col min-h-screen p-4 sm:p-8 md:p-12`}
    >
      {session && (
        <header className="flex items-center justify-between w-full max-w-4xl mx-auto py-4">
          <Image src="/logo.png" alt="Tweetledoo Logo" width={60} height={60} />
          <AuthButton />
        </header>
      )}
      <main className="flex flex-1 flex-col items-center justify-center text-center">
        {session ? (
          <Card className="w-full max-w-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl sm:text-4xl font-bold">Enhance Your Twitter Conversations</CardTitle>
              <CardDescription className="pt-2">Get AI-powered suggestions to craft thoughtful replies that reflect your voice.</CardDescription>
            </CardHeader>
            <CardContent>
              <ReplyForm />
            </CardContent>
          </Card>
        ) : (
          <div className="w-full max-w-3xl">
            <Image src="/logo.png" alt="Tweetledoo Logo" width={150} height={150} className="mx-auto mb-8" />
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              Amplify Your Voice on Twitter
            </h1>
            <p className="text-lg text-gray-600 mb-8 sm:mb-12">
              Welcome to Tweetledoo! Get AI-powered suggestions to enhance your replies. Add your perspective, refine the tone, and respond with confidence.
            </p>
            <div className="mb-12">
              <Button onClick={() => signIn("google")} size="lg" className="text-lg px-8 py-6">
                Sign In with Google to Get Started
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
              <div className="p-4 rounded-lg">
                <h3 className="font-bold text-xl mb-2">⚡️ Smart Reply Suggestions</h3>
                <p className="text-gray-600">Get AI-powered suggestions to inspire your responses and overcome writer's block.</p>
              </div>
              <div className="p-4 rounded-lg">
                <h3 className="font-bold text-xl mb-2">🎭 Match Your Style</h3>
                <p className="text-gray-600">Customize suggestions to match your tone—funny, professional, thoughtful, or anything in between.</p>
              </div>
              <div className="p-4 rounded-lg">
                <h3 className="font-bold text-xl mb-2">🚀 Enhance Your Voice</h3>
                <p className="text-gray-600">Use suggestions as a starting point to craft authentic replies that represent you.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full border-t border-t-zinc-200">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()}{' '}
            <a href="https://vigyoti.ai" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Vigyoti Inc.
            </a>
          </p>
          <FeedbackDialog />
        </div>
      </footer>
    </div>
  );
}
