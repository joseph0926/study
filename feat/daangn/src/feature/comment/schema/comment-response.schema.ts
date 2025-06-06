import { z } from "zod";
import { CommentBaseSchema } from "./comment-base.schema";
import { UserBaseSchema } from "@/feature/user/schema/user-base.schema";

export const CommentResponseSchema = CommentBaseSchema.extend({
  author: UserBaseSchema,
  _count: z.object({
    commentLikes: z.number().int().nonnegative().default(0),
  }),
});
