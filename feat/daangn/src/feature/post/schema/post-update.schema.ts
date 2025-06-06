import { z } from "zod";
import { PostBaseSchema } from "./post-base.schema";

export const UpdatePostSchema = PostBaseSchema.partial().extend({
  id: z.string().uuid(),
});
export type UpdatePostSchemaType = z.infer<typeof UpdatePostSchema>;
