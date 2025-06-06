import { CommentBaseSchema } from "./comment-base.schema";

export const CommentCreateSchema = CommentBaseSchema.omit({
  id: true,
  createdAt: true,
});
