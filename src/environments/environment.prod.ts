import { LogLevel } from 'src/app/services/log/logLevel';

export const environment = {
  production: true,
  baseHref: '/',
  logLevel: LogLevel.Warn,
  compactLogDisplay: true,
  api: 'https://server.sylvainjanet.fr/app/',
};
