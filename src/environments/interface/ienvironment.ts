import { LogLevel } from 'src/app/services/log/logLevel/logLevel';

/**
 * Interface for the environment variable. Exposes every configuration element
 * the config should have.
 */
export interface IEnvironment {
  /** If true, the environment is the production environment. */
  production: boolean;
  /** Minimum {@link LogLevel} that will actually be logged in this environment. */
  logLevel: LogLevel;
  /** If true, the logs will be compact. */
  compactLogDisplay: boolean;
  /** API link. */
  api: string;
  /** App base href. */
  baseHref: string;
  /** If true, logs will contain the date of log. */
  logWithDate: boolean;
  /** Property holding the application version. */
  appVersion: string;
}
