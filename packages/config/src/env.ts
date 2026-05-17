import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

export const baseEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

export function createEnvSchema<T extends z.ZodRawShape>(
  shape: T,
): z.ZodObject<typeof baseEnvSchema.shape & T> {
  return baseEnvSchema.extend(shape);
}

export function parseEnv<T extends z.ZodType>(
  schema: T,
): z.infer<T> {
  const result = schema.safeParse(process.env);

  if (!result.success) {
    console.error('Invalid environment variables:', result.error.flatten());
    process.exit(1);
  }

  return result.data;
}
