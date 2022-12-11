import { LogLevel } from 'src/app/services/log/logLevel';

export const environment = {
  production: true,
  testMessage: 'Coucou - prod',
  baseHref: '/',
  logLevel: LogLevel.Warn,
};
