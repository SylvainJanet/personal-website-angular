import { LogLevel } from 'src/app/services/log/logLevel/logLevel';
import { IEnvironment } from './interface/ienvironment';

/** Development environment. */
export const environment: IEnvironment = {
  production: false,
  logLevel: LogLevel.All,
  compactLogDisplay: false,
  api: 'http://localhost:8080/',
  website: 'http://localhost:4200/',
  logWithDate: false,
  baseHref: '',
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  appVersion: require('../../package.json').version + '-dev',
  isTesting: false,
  fullLoadingMessages: true,
  artificialMinLoadingTime: 750,
  artificialRandomLoadingTime: 4000,
};
