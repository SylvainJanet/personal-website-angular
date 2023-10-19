import { LogLevel } from 'src/app/services/log/logLevel/logLevel';
import { IEnvironment } from './interface/ienvironment';

/** Production environment. */
export const environment: IEnvironment = {
  production: true,
  logLevel: LogLevel.Warn,
  compactLogDisplay: true,
  api: 'https://server.sylvainjanet.fr/app/',
  website: 'https://sylvainjanet.fr/',
  logWithDate: true,
  baseHref: '',
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  appVersion: require('../../package.json').version,
};
