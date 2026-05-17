import { z } from 'zod';
import { createEnvSchema, parseEnv } from './env.js';

export const apiGatewayEnvSchema = createEnvSchema({
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default('0.0.0.0'),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
    .default('info'),
});

export type ApiGatewayEnv = z.infer<typeof apiGatewayEnvSchema>;

export function parseApiGatewayEnv(): ApiGatewayEnv {
  return parseEnv(apiGatewayEnvSchema);
}
