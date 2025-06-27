import { prisma } from "./db";

interface ReplyData {
  tweetUrl: string;
  customInstructions?: string;
  generatedText: string;
  userId: string;
}

export async function logGeneratedReply(data: ReplyData) {
  try {
    await prisma.generatedReply.create({
      data: {
        tweetUrl: data.tweetUrl,
        customInstructions: data.customInstructions,
        generatedText: data.generatedText,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
    console.log("Logged generated reply to database.");
  } catch (error) {
    console.error("Failed to log generated reply:", error);
    // In a real application, you might want more robust error handling here,
    // like sending to an error tracking service (e.g., Sentry).
  }
} 