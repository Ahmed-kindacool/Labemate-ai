import { z } from "zod";

const EnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
  CODE_EXECUTION_TIMEOUT_MS: z.coerce.number().default(10000),
  CODE_EXECUTION_MEMORY_LIMIT_MB: z.coerce.number().default(256),
  MAX_LAB_FILE_SIZE_MB: z.coerce.number().default(10),
});

export type Env = z.infer<typeof EnvSchema>;

let cachedEnv: Env | null = null;

/**
 * Validates process.env once and caches the result. Throws immediately (and loudly)
 * on missing/invalid config instead of failing deep inside a request handler.
 */
export function getEnv(): Env {
  if (cachedEnv) return cachedEnv;

  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid environment configuration: ${parsed.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ")}`
    );
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}
