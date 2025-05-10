import { PrismaClient, Prisma } from '../src/lib/generated/prisma';

const prisma = new PrismaClient();

const bookData: Prisma.BookCreateInput[] = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    year: '2018',
    isbn: '978-602-06-3318-3',
    is_read: false
  },
  {
    title: 'The Richest Man In Babylon',
    author: 'George S. Clason',
    year: '1959',
    isbn: '978-979-22-5963-6',
    is_read: false
  },
  {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    year: '2020',
    isbn: '978-6026486-57-8',
    is_read: false
  },
]

export async function main() {
  await prisma.book.createMany({ data: bookData });
}

main()
