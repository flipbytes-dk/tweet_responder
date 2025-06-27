import { Octokit } from '@octokit/rest'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { title, body } = req.body

  if (!title || !body) {
    return res.status(400).json({ message: 'Title and body are required' })
  }

  const { GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME } = process.env

  if (!GITHUB_TOKEN || !GITHUB_REPO_OWNER || !GITHUB_REPO_NAME) {
    console.error('Missing GitHub environment variables')
    return res.status(500).json({ message: 'Server configuration error' })
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN })

  try {
    const issueBody = `**Submitted by:** ${session.user.email}\n\n---\n\n${body}`

    await octokit.issues.create({
      owner: GITHUB_REPO_OWNER,
      repo: GITHUB_REPO_NAME,
      title: title,
      body: issueBody,
      labels: ['feedback'],
    })

    return res.status(201).json({ message: 'Issue created successfully' })
  } catch (error) {
    console.error('GitHub API Error:', error)
    return res.status(500).json({ message: 'Failed to create issue' })
  }
} 