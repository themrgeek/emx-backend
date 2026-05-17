import { z } from 'zod';
import { createEnvSchema, parseEnv } from './env.js';

export const authServiceEnvSchema = createEnvSchema({
  PORT: z.coerce.number().default(4001),
  HOST: z.string().default('0.0.0.0'),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
    .default('info'),
});

export type AuthServiceEnv = z.infer<typeof authServiceEnvSchema>;

export function parseAuthServiceEnv(): AuthServiceEnv {
  return parseEnv(authServiceEnvSchema);
}
