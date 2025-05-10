import { bookValidatorSchema } from '@/lib/zod/book-validator';
import { badRequest } from '@/utils/error-handler';
import { NextRequest, NextResponse } from 'next/server';
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