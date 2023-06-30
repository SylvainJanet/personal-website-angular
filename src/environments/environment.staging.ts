import { LogLevel } from 'src/app/services/log/logLevel/logLevel';
import { IEnvironment } from './interface/ienvironment';

/** Staging environment. */
export const environment: IEnvironment = {
  production: false,
  logLevel: LogLevel.All,
  compactLogDisplay: true,
  api: 'https://server.sylvainjanet.fr/app-dev/',
  logWithDate: false,
  baseHref: '',
};
