import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { logGeneratedReply } from '@/lib/metrics';

type Data = {
  reply?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session || !session.user || !session.user.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { tweetUrl, customInstructions } = req.body;

  if (!tweetUrl) {
    return res.status(400).json({ error: 'Tweet URL is required' });
  }

  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!n8nWebhookUrl) {
    console.error("N8N_WEBHOOK_URL is not set in .env.local");
    return res.status(500).json({ error: "Server configuration error: Webhook URL is not set." });
  }

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tweetUrl, customInstructions }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('n8n webhook returned an error:', response.status, errorBody);
      throw new Error('Failed to get reply from n8n workflow.');
    }

    const responseBody = await response.text();
    const data = JSON.parse(responseBody);
    const generatedReply = data.output?.tweet_reply;

    if (!generatedReply) {
      console.error("Could not find 'tweet_reply' in the webhook response:", responseBody);
      return res.status(500).json({ error: 'The AI workflow returned an invalid response format.' });
    }

    await logGeneratedReply({
      tweetUrl,
      customInstructions,
      generatedText: generatedReply,
      userId: session.user.id,
    });

    return res.status(200).json({ reply: generatedReply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An internal server error occurred while contacting the AI service.' });
  }
} 