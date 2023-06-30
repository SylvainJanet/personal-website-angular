import { LogLevel } from 'src/app/services/log/logLevel/logLevel';
import { IEnvironment } from './interface/ienvironment';

/** Production environment. */
export const environment: IEnvironment = {
  production: false,
  logLevel: LogLevel.All,
  compactLogDisplay: false,
  api: 'http://localhost:8080/',
  logWithDate: false,
  baseHref: '',
};
