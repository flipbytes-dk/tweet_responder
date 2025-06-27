'use client'

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ReplyCardProps {
  reply: string;
}

export default function ReplyCard({ reply }: ReplyCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(reply)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Card className="mt-4 w-full">
      <CardHeader className="bg-blue-500 text-white rounded-t-lg">
        <CardTitle>Generated Reply</CardTitle>
        <CardDescription className="text-blue-100">
          Review and copy the AI-generated reply below.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <p>{reply}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCopy} className="ml-auto">
          {copied ? "Copied!" : "Copy"}
        </Button>
      </CardFooter>
    </Card>
  )
} 