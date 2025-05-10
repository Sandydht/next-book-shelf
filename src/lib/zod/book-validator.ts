import { z } from 'zod';

export const bookValidatorSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }).trim(),
  author: z.string().nonempty({ message: 'Author is required' }).trim(),
  year: z.string().nonempty({ message: 'Year is required' }).trim(),
  isbn: z.string().nonempty({ message: 'ISBN is required' }).trim()
})