import { LogLevel } from 'src/app/services/log/logLevel/logLevel';
import { IEnvironment } from './interface/ienvironment';

/** Production environment. */
export const environment: IEnvironment = {
  production: true,
  logLevel: LogLevel.Warn,
  compactLogDisplay: true,
  api: 'https://server.sylvainjanet.fr/app/',
  logWithDate: true,
  baseHref: '',
};
