import { z } from "zod";
import { PostBaseSchema } from "./post-base.schema";
import { CommentBaseSchema } from "@/feature/comment/schema/comment-base.schema";
import { UserBaseSchmea } from "@/feature/user/schema/user-base.schema";

export const PostResponseSchema = PostBaseSchema.extend({
  author: UserBaseSchmea,
  images: z.array(z.object({ url: z.string().url(), order: z.number() })),
  _count: z.object({
    likes: z.number().int(),
    comments: z.number().int(),
  }),
  comments: z.array(CommentBaseSchema).optional(),
});
