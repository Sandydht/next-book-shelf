import { bookValidatorSchema } from '@/lib/zod/book-validator';
import { badRequest } from '@/utils/error-handler';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedInput = bookValidatorSchema.safeParse(body);

  if (!validatedInput.success) {
    return badRequest({
      status: 'error',
      errors: validatedInput.error.flatten().fieldErrors,
    })
  }

  return NextResponse.json({
    status: 'OK',
    data: body
  }, {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}