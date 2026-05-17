import type { FastifyInstance } from 'fastify';
import { registerHealthRoute } from './routes/health-route.js';

export async function registerRoutes(app: FastifyInstance): Promise<void> {
  await registerHealthRoute(app);
}
