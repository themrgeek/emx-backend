import { loadAppConfig } from './infrastructure/config/app-config.js';
import { createServer } from './infrastructure/server/create-server.js';
import { registerRoutes } from './interfaces/http/register-routes.js';

const start = async (): Promise<void> => {
  const config = loadAppConfig();
  const app = createServer(config);

  try {
    await registerRoutes(app);
    await app.listen({
      port: config.PORT,
      host: config.HOST,
    });

    console.log(`Auth service running on ${config.HOST}:${config.PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

void start();
