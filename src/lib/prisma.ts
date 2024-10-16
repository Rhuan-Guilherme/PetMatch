import { PrismaClient } from '@prisma/client'
import { env } from '../env/env'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
