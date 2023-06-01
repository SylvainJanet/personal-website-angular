import { LogLevel } from 'src/app/services/log/logLevel';

export const environment = {
  production: false,
  testMessage: 'Coucou - staging',
  baseHref: '/',
  logLevel: LogLevel.All,
  compactLogDisplay: true,
};
