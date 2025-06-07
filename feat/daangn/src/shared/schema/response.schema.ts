import { z } from 'zod';
import { ErrorResponseSchema } from './error.schema';

const ApiResponseBaseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export const ApiResponseFailSchema = ApiResponseBaseSchema.extend({
  success: z.literal(false),
  error: ErrorResponseSchema,
});

export const makeApiResponseSuccessSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) =>
  ApiResponseBaseSchema.extend({
    success: z.literal(true),
    data: dataSchema,
  });

export const PaginationSchema = z.object({
  nextCursor: z.string().nullable(),
  prevCursor: z.string().nullable(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});
export type PaginationSchemaType = z.infer<typeof PaginationSchema>;
