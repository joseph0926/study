import { z } from "zod";

export const ErrorResponseSchema = z.object({
  code: z.string(),
  detail: z.any().optional(),
});
export type ErrorResponseSchemaType = z.infer<typeof ErrorResponseSchema>;
