/**
 * Log levels. Used to distinguish between several types of log messages, order
 * by the severity of the underlying issue. If any level is logged, any log of a
 * higher level will also be logged.
 */
export enum LogLevel {
  /** All - everything is logged */
  All = 0,
  /**
   * Debug - used only for development {@link environment}. Log level should be
   * higher in production.
   */
  Debug = 1,
  /** Info - used for informative messages */
  Info = 2,
  /** Warn - used for light warnings or errors */
  Warn = 3,
  /** Error - used for serious errors */
  Error = 4,
  /** Fatal - used for errors that should stop the app immediatly */
  Fatal = 5,
  /** Off - used to disable all logs */
  Off = 6,
}
