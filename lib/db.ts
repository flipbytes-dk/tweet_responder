import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prismaClient = new PrismaClient({
  log: ['query'],
})

export const prisma = global.prisma || prismaClient

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
} 