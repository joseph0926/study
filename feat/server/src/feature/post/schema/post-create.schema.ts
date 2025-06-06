import { z } from "zod";
import { PostBaseSchema } from "./post-base.schema";

export const CreatePostSchema = PostBaseSchema.omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  images: z.array(z.string().url()).min(1).max(10),
});
export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;
