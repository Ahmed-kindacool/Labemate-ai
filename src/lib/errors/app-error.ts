export type AppErrorCode =
  | "INVALID_INPUT"
  | "UNSUPPORTED_FILE"
  | "FILE_TOO_LARGE"
  | "LAB_READ_FAILED"
  | "AI_GENERATION_FAILED"
  | "EXECUTION_FAILED"
  | "REPORT_GENERATION_FAILED";

/**
 * A user-facing application error. `message` is always safe to display —
 * never put stack traces, secrets, or internal paths in it (see PROJECT_SPEC.md §7).
 */
export class AppError extends Error {
  readonly code: AppErrorCode;

  constructor(code: AppErrorCode, message: string) {
    super(message);
    this.name = "AppError";
    this.code = code;
  }
}

export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}
