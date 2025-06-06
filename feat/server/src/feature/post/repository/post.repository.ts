import { prisma } from "@/shared/db/prisma";

type PostListRepositoryParams = {
  limit: string;
  after?: string | null;
  before?: string | null;
};

export const PostListRepository = async ({
  limit,
  after,
}: PostListRepositoryParams) => {
  const cursorObj = after
    ? JSON.parse(Buffer.from(after, "base64").toString())
    : undefined;

  const posts = await prisma.post.findMany({
    take: parseInt(limit, 10) + 1,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: {
      author: true,
      images: { orderBy: { order: "asc" } },
      comments: { orderBy: { createdAt: "desc" } },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    cursor: cursorObj
      ? {
          id: cursorObj.id,
          createdAt: cursorObj.createdAt,
        }
      : undefined,
  });

  return posts;
};
