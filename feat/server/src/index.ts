import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import errorHandler from "./shared/plugins/error-handler";
import { postRouter } from "./feature/post/post.route";

const PORT = 4000;

export function buildServer() {
  const fastify = Fastify({
    logger: {
      level: "info",
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "yyyy-mm-dd HH:MM:ss.l",
          colorize: true,
          ignore: "pid,hostname",
        },
      },
    },
  });

  fastify.get("/ping", (_req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ ping: "ok" });
  });

  fastify.register(errorHandler);
  fastify.register(postRouter);

  return fastify;
}

const server = buildServer();

server.listen({ port: PORT }, (err, _address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  server.log.info(`서버가 포트번호 ${PORT}에서 정상 실행되었습니다.`);
});
