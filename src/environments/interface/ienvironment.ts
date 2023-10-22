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
  /** Website link */
  website: string;
  /** App base href. */
  baseHref: string;
  /** If true, logs will contain the date of log. */
  logWithDate: boolean;
  /** Property holding the application version. */
  appVersion: string;
  /**
   * If true, the app is currently being tested. Usefull to disable, for
   * instance, delays on html requests artificially added in development.
   */
  isTesting: boolean;
  /**
   * If true, the loading messages will be full of information. Should be on for
   * production.
   */
  fullLoadingMessages: boolean;
  /**
   * Artificial minimal loading time in ms. Should only be used in dev or
   * staging.
   */
  artificialMinLoadingTime: number;
  /**
   * Random additional artificial loading time in ms. Should only be used in dev
   * or staging.
   */
  artificialRandomLoadingTime: number;
}
