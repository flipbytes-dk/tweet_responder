# N8N Workflow Prompt Updates Needed

## Em Dash Removal
The N8N workflow that generates tweet replies needs to be updated to avoid using em dashes (—) in the generated responses.

### Action Required:
1. Access your N8N workflow at the webhook URL configured in `N8N_WEBHOOK_URL`
2. Locate the AI prompt/system message in the workflow
3. Add an explicit instruction to the prompt: "Do not use em dashes (—) in the response. Use regular hyphens (-) or restructure sentences to avoid dashes entirely."

### Current Integration:
- The Next.js app sends `tweetUrl` and `customInstructions` to the N8N webhook
- N8N handles the AI prompting and returns `tweet_reply` in the response
- The prompt configuration is external to this codebase

### Suggested Prompt Addition:
```
Important formatting rules:
- Do not use em dashes (—) in your response
- Use regular hyphens (-) or commas for breaks in sentences
- Keep responses natural and conversational
```
