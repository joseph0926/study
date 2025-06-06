import { FastifyReply, FastifyRequest } from "fastify";
import { getPostListService } from "./services/post-list.service";
import { PostListResponseSchema } from "./schema/post-response.schema";

export const postListController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const res = await getPostListService(req.query);
  const parsed = PostListResponseSchema.safeParse(res);
  if (!parsed.success) throw parsed.error;

  return reply.status(200).send({
    message: "게시글 리스트를 가져오는데 성공하였습니다.",
    success: true,
    data: parsed.data,
  });
};
