import Fastify, { FastifyReply, FastifyRequest } from "fastify";

const PORT = 4000;

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

fastify.listen({ port: PORT }, (err, _address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`서버가 포트번호 ${PORT}에서 정상 실행되었습니다.`);
});
