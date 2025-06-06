import { z } from "zod";

export const CommentBaseSchema = z.object({
  id: z.string().uuid(),
  content: z
    .string()
    .min(1, { message: "content는 최소 1자 이상이어야합니다." })
    .max(120, { message: "댓글은 최대 120자입니다." }),

  createdAt: z.date().optional(),

  authorId: z.string().uuid(),
  postId: z.string().uuid(),
});
