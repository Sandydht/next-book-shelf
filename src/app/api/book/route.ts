import { bookValidatorSchema } from '@/lib/zod/book-validator';
import { badRequest, createdHandler, successHandler } from '@/utils/api-response-handler';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedInput = bookValidatorSchema.safeParse(body);

  if (!validatedInput.success) {
    return badRequest({
      status: 'error',
      errors: validatedInput.error.flatten().fieldErrors,
    })
  }

  const newBook = await prisma.book.create({
    data: {
      title: validatedInput.data.title,
      author: validatedInput.data.author,
      year: validatedInput.data.year,
      isbn: validatedInput.data.isbn,
      is_read: validatedInput.data.is_read
    }
  })

  return createdHandler({
    status: 'OK',
    data: newBook
  })
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const title = searchParams.get('title');
  const isRead = searchParams.get('is_read');

  const query = {};

  if (title && title !== undefined) {
    Object(query).title = title;
  }

  if (isRead && isRead !== undefined) {
    Object(query).is_read = isRead == 'true' ? true : false;
  }

  const book = await prisma.book.findMany({
    where: query,
    orderBy: {
      updated_at: 'desc'
    }
  });

  return successHandler({
    status: 'OK',
    data: book
  })
}
