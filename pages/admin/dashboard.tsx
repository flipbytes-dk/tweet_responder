import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ReplyWithUser = Prisma.GeneratedReplyGetPayload<{
  include: { user: true };
}>;

interface AdminDashboardProps {
  replies: ReplyWithUser[];
}

export default function AdminDashboard({ replies }: AdminDashboardProps) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tweet URL</TableHead>
            <TableHead>Generated Reply</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {replies.map((reply) => (
            <TableRow key={reply.id}>
              <TableCell>{reply.user.name}</TableCell>
              <TableCell>{reply.user.email}</TableCell>
              <TableCell>
                <a href={reply.tweetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Tweet
                </a>
              </TableCell>
              <TableCell>{reply.generatedText}</TableCell>
              <TableCell>{new Date(reply.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user?.isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const replies = await prisma.generatedReply.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // The 'createdAt' field is a Date object, which is not directly serializable
  // by Next.js. We need to convert it to a string.
  // Explicitly typing 'reply' here to help with type inference.
  const serializableReplies = replies.map((reply: ReplyWithUser) => ({
    ...reply,
    createdAt: reply.createdAt.toISOString(),
    user: {
        ...reply.user,
        emailVerified: reply.user.emailVerified?.toISOString() || null,
    }
  }));

  return {
    props: {
      replies: serializableReplies,
    },
  };
}; 