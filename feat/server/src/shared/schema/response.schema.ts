import { z } from "zod";

const ApiResponseBaseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export const ApiResponseFailSchema = ApiResponseBaseSchema.extend({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    detail: z.any().optional(),
  }),
});

export const makeApiResponseSuccessSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) =>
  ApiResponseBaseSchema.extend({
    success: z.literal(true),
    data: dataSchema,
  });
