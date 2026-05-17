import type { FastifyInstance } from 'fastify';

export interface HealthResponse {
  readonly status: 'ok';
  readonly service: 'auth-service';
}

export async function registerHealthRoute(
  app: FastifyInstance,
): Promise<void> {
  app.get<{ Reply: HealthResponse }>('/health', async () => {
    return {
      status: 'ok',
      service: 'auth-service',
    };
  });
}
