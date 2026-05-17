import {
  parseApiGatewayEnv,
  type ApiGatewayEnv,
} from '@emx/config';

export type AppConfig = ApiGatewayEnv;

export function loadAppConfig(): AppConfig {
  return parseApiGatewayEnv();
}
