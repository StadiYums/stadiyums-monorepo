import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1)
    .refine(
      (v) => v.startsWith("postgresql://") || v.startsWith("postgres://"),
      "DATABASE_URL must be a PostgreSQL connection string",
    ),
  NEXT_PUBLIC_FAN_URL: z.string().url().optional(),
  NEXT_PUBLIC_RUNNER_URL: z.string().url().optional(),
  NEXT_PUBLIC_ADMIN_URL: z.string().url().optional(),
  NEXT_PUBLIC_LANDING_URL: z.string().url().optional(),
  NEXT_PUBLIC_VENDOR_URL: z.string().url().optional(),
  SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(input: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(input);
  if (!result.success) {
    const formatted = result.error.flatten().fieldErrors;
    throw new Error(`Invalid environment: ${JSON.stringify(formatted)}`);
  }
  return result.data;
}

export function getEnv(): Env {
  return parseEnv({
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_FAN_URL: process.env.NEXT_PUBLIC_FAN_URL,
    NEXT_PUBLIC_RUNNER_URL: process.env.NEXT_PUBLIC_RUNNER_URL,
    NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL,
    NEXT_PUBLIC_LANDING_URL: process.env.NEXT_PUBLIC_LANDING_URL,
    NEXT_PUBLIC_VENDOR_URL: process.env.NEXT_PUBLIC_VENDOR_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}
