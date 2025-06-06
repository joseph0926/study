import { z } from "zod";
import { PaginationSchema } from "@/shared/schema/response.schema";
import { PostListRepository } from "../repository/post.repository";
import { PostListResponseSchemaType } from "../schema/post-response.schema";

export const getPostListService = async (
  query: unknown
): Promise<PostListResponseSchemaType> => {
  const parsed = PaginationSchema.pick({ nextCursor: true })
    .extend({
      limit: z.string(),
    })
    .safeParse(query);
  if (!parsed.success) throw parsed.error;

  const { limit, nextCursor: after } = parsed.data;

  const rawPostListData = await PostListRepository({ limit, after });

  const hasNext = rawPostListData.length > parseInt(limit, 10);
  const items = hasNext
    ? rawPostListData.slice(0, parseInt(limit, 10))
    : rawPostListData;
  const nextCursor = hasNext
    ? Buffer.from(
        JSON.stringify({
          createdAt: items[items.length - 1].createdAt,
          id: items[items.length - 1].id,
        })
      ).toString("base64")
    : null;

  return {
    items,
    pageInfo: {
      hasNext,
      hasPrev: !!after,
      nextCursor,
      prevCursor: after || null,
    },
  };
};
