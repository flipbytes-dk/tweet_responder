'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Spinner from "./Spinner"
import ReplyCard from "./ReplyCard"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const formSchema = z.object({
  tweetUrl: z.string().url({ message: "Please enter a valid URL." }),
  customInstructions: z.string().optional(),
})

export default function ReplyForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedReply, setGeneratedReply] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tweetUrl: "",
      customInstructions: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setError(null)
    setGeneratedReply(null)

    try {
      const response = await fetch("/api/generateReply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.")
      }

      setGeneratedReply(data.reply)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="tweetUrl"
            render={({ field }) => (
              <FormItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FormLabel>Tweet URL</FormLabel>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Paste the full URL of the tweet you want to reply to.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <FormControl>
                  <Input placeholder="https://x.com/user/status/12345..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customInstructions"
            render={({ field }) => (
              <FormItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FormLabel>Custom Instructions (Optional)</FormLabel>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Guide the AI's tone and style. (e.g., "Be formal," "Add a pun.")</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Be witty and slightly sarcastic."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading && <Spinner className="mr-2 h-4 w-4" />}
            {loading ? "Generating..." : "Generate Reply"}
          </Button>
        </form>
      </Form>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {generatedReply && <ReplyCard reply={generatedReply} />}
    </div>
  )
} 