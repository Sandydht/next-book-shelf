import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { badRequest, notFound, successHandler } from "@/utils/api-response-handler";
import { bookValidatorSchema } from "@/lib/zod/book-validator";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const findBook = await prisma.book.findFirst({
    where: {
      id: Number(id)
    }
  });

  if (!findBook) {
    return notFound({
      status: 'error',
      message: 'Book not found!'
    })
  }

  return successHandler({
    status: 'OK',
    data: findBook
  })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const findBook = await prisma.book.findFirst({
    where: {
      id: Number(id)
    }
  });

  if (!findBook) {
    return notFound({
      status: 'error',
      message: 'Book not found!'
    })
  }

  const body = await req.json();
  const validatedInput = bookValidatorSchema.safeParse(body);
  if (!validatedInput.success) {
    return badRequest({
      status: 'error',
      errors: validatedInput.error.flatten().fieldErrors,
    })
  }

  const newBook = await prisma.book.update({
    where: {
      id: Number(id)
    },
    data: {
      title: validatedInput.data.title,
      author: validatedInput.data.author,
      year: validatedInput.data.year,
      isbn: validatedInput.data.isbn,
      is_read: validatedInput.data.is_read
    }
  })

  return successHandler({
    status: 'OK',
    data: newBook
  })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const findBook = await prisma.book.findFirst({
    where: {
      id: Number(id)
    }
  });

  if (!findBook) {
    return notFound({
      status: 'error',
      message: 'Book not found!'
    })
  }

  await prisma.book.delete({
    where: {
      id: Number(id)
    }
  })

  return successHandler({
    status: 'OK',
    message: 'Book data has been successfully deleted!'
  })
}