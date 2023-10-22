import { LogLevel } from 'src/app/services/log/logLevel/logLevel';
import { IEnvironment } from './interface/ienvironment';

/** Staging environment. */
export const environment: IEnvironment = {
  production: false,
  logLevel: LogLevel.All,
  compactLogDisplay: true,
  api: 'https://server.sylvainjanet.fr/app-dev/',
  website: 'https://dev.sylvainjanet.fr/',
  logWithDate: false,
  baseHref: '',
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  appVersion: require('../../package.json').version + '-staging',
  isTesting: false,
  fullLoadingMessages: false,
  artificialMinLoadingTime: 0,
  artificialRandomLoadingTime: 0,
};
