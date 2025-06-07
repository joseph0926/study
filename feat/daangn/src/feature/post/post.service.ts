import { z } from 'zod';
import { axiosInstance } from '@/lib/axios';
import {
  makeApiResponseSuccessSchema,
  PaginationSchema,
} from '@/shared/schema/response.schema';
import { ApiError } from '@/shared/error/api-error';
import { PostListResponseSchema } from './schema/post-response.schema';

type GetPostListParams = {
  nextCursor: string | null;
  limit?: string;
};

export const getPostList = async (query: GetPostListParams) => {
  const parsedQuery = PaginationSchema.pick({ nextCursor: true })
    .extend({
      limit: z.string(),
    })
    .safeParse(query);
  if (!parsedQuery.success)
    throw new ApiError('VALIDATION_ERROR', parsedQuery.error.message);

  const { data } = await axiosInstance.get('/posts', {
    params: { ...parsedQuery.data },
  });
  const parasedData = makeApiResponseSuccessSchema(
    PostListResponseSchema,
  ).safeParse(data);
  if (!parasedData.success) {
    throw new ApiError('VALIDATION_ERROR', parasedData.error.message);
  }

  return parasedData.data.data;
};
