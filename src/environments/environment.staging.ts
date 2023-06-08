import { LogLevel } from 'src/app/services/log/logLevel';

export const environment = {
  production: false,
  baseHref: '/',
  logLevel: LogLevel.All,
  compactLogDisplay: true,
  api: 'https://server.sylvainjanet.fr/app-dev/',
};
