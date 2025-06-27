import { PrismaClient } from '@prisma/client'
import path from 'path'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// In development, the database file is relative to the project root.
// We construct an absolute path to it to avoid issues with CWD in Next.js.
const devDbUrl = `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`

const prismaClient = new PrismaClient({
  log: ['query'],
  datasources: {
    db: {
      url: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : devDbUrl,
    },
  },
})

export const prisma = global.prisma || prismaClient

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
} 