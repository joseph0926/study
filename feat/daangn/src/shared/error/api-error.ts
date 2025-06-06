export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'INTERNAL_ERROR'
  | (string & {});

export class ApiError extends Error {
  public readonly code: ErrorCode;
  public readonly detail?: unknown;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}
