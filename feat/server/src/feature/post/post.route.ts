import { FastifyInstance } from "fastify";
import { postListController } from "./post.controller";

export const postRouter = (fastify: FastifyInstance) => {
  fastify.route({ url: "/posts", method: "GET", handler: postListController });
};
