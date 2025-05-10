import { PrismaClient } from './generated/prisma';

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient
// }

// const prisma = globalForPrisma.prisma;

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const prisma = new PrismaClient();

export default prisma
