import { LogLevel } from 'src/app/services/log/logLevel';

/** Staging environment. */
export const environment = {
  production: false,
  baseHref: '/',
  logLevel: LogLevel.All,
  compactLogDisplay: true,
  api: 'https://server.sylvainjanet.fr/app-dev/',
  logWithDate: false,
};
