import { LogLevel } from 'src/app/services/log/logLevel';

export const environment = {
  production: false,
  baseHref: '/',
  logLevel: LogLevel.All,
  compactLogDisplay: false,
  api: 'http://localhost:8080/',
};
