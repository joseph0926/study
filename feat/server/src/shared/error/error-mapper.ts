import { ZodError } from "zod";
import { ApiError } from "./api-error";

export function mapError(err: unknown): ApiError {
  if (err instanceof ApiError) return err;

  if (err instanceof ZodError) {
    return new ApiError("VALIDATION_ERROR", "입력 값이 올바르지 않습니다.", {
      status: 422,
      detail: err.flatten(),
    });
  }

  return new ApiError("INTERNAL_ERROR", "서버 내부 오류가 발생했습니다.", {
    status: 500,
    detail: process.env.NODE_ENV === "development" ? err : undefined,
  });
}
