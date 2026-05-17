import pino, { type Logger, type LoggerOptions } from 'pino';

export type LogLevel =
  | 'fatal'
  | 'error'
  | 'warn'
  | 'info'
  | 'debug'
  | 'trace'
  | 'silent';

export interface CreateLoggerOptions {
  readonly name: string;
  readonly level?: LogLevel;
  readonly requestId?: string;
}

export interface FastifyLoggerConfig {
  readonly level: LogLevel;
  readonly name: string;
  readonly base?: { readonly requestId: string };
}

export function getFastifyLoggerConfig(
  options: CreateLoggerOptions,
): FastifyLoggerConfig {
  const config: FastifyLoggerConfig = {
    name: options.name,
    level: options.level ?? 'info',
  };

  if (options.requestId !== undefined) {
    return {
      ...config,
      base: { requestId: options.requestId },
    };
  }

  return config;
}

export function createLogger(options: CreateLoggerOptions): Logger {
  const loggerOptions: LoggerOptions = {
    name: options.name,
    level: options.level ?? 'info',
  };

  if (options.requestId !== undefined) {
    loggerOptions.base = { requestId: options.requestId };
  }

  return pino(loggerOptions);
}
