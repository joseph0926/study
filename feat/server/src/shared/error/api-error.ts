export type ErrorCode =
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "INTERNAL_ERROR"
  | (string & {});

export class ApiError extends Error {
  public readonly code: ErrorCode;
  public readonly detail?: unknown;
  public readonly status: number;

  constructor(
    code: ErrorCode,
    message: string,
    options?: { status?: number; detail?: unknown }
  ) {
    super(message);
    this.code = code;
    this.detail = options?.detail;
    this.status = options?.status ?? 400;
  }
}
