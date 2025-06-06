import { z } from 'zod';
import { PostBaseSchema } from './post-base.schema';
import { CommentBaseSchema } from '@/feature/comment/schema/comment-base.schema';
import { UserBaseSchema } from '@/feature/user/schema/user-base.schema';
import { PaginationSchema } from '@/shared/schema/response.schema';

export const PostResponseSchema = PostBaseSchema.extend({
  author: UserBaseSchema,
  images: z.array(z.object({ url: z.string().url(), order: z.number() })),
  _count: z.object({
    likes: z.number().int(),
    comments: z.number().int(),
  }),
  comments: z.array(CommentBaseSchema).optional(),
});
export type PostResponseSchemaType = z.infer<typeof PostResponseSchema>;

export const PostListResponseSchema = z.object({
  items: z.array(PostResponseSchema).default([]),
  pageInfo: PaginationSchema,
});
export type PostListResponseSchemaType = z.infer<typeof PostListResponseSchema>;
