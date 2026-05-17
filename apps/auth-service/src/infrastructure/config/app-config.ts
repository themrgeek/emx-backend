import {
  parseAuthServiceEnv,
  type AuthServiceEnv,
} from '@emx/config';

export type AppConfig = AuthServiceEnv;

export function loadAppConfig(): AppConfig {
  return parseAuthServiceEnv();
}
