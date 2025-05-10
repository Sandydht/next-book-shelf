import { bookValidatorSchema } from '@/lib/zod/book-validator';
import { badRequest } from '@/utils/error-handler';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type DynamicBookQuery = {
  [key: string]: string | number; // allows adding new fields
};

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
  });

  return NextResponse.json({
    status: 'OK',
    data: newBook
  }, {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const title = searchParams.get('title');
  const isRead = searchParams.get('is_read');

  const query = {};
  console.log('title: ', title);

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

  return NextResponse.json({
    status: 'OK',
    data: book
  }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}