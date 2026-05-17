import { getFastifyLoggerConfig } from '@emx/logger';
import Fastify, { type FastifyInstance } from 'fastify';
import type { AppConfig } from '../config/app-config.js';

export function createServer(config: AppConfig): FastifyInstance {
  return Fastify({
    logger: getFastifyLoggerConfig({
      name: 'api-gateway',
      level: config.LOG_LEVEL,
    }),
  });
}
