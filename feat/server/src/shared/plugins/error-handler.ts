import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { mapError } from "@/shared/error/error-mapper";
import { ApiResponseFailSchema } from "../schema/response.schema";

export default fp(async function errorHandlerPlugin(fastify: FastifyInstance) {
  fastify.setErrorHandler((err, _req, reply) => {
    fastify.log.error(err);
    const apiErr = mapError(err);

    const failBody = {
      message: apiErr.message,
      success: false as const,
      error: {
        code: apiErr.code,
        detail: apiErr.detail,
      },
    };

    ApiResponseFailSchema.parse(failBody);

    reply.status(apiErr.status).send(failBody);
  });

  fastify.setNotFoundHandler((req, reply) => {
    const body = {
      message: "Route not found",
      success: false as const,
      error: {
        code: "NOT_FOUND",
        detail: { method: req.method, url: req.url },
      },
    };
    reply.status(404).send(body);
  });
});
