import { Inject, Injectable } from '@angular/core';
import { LogPublisher } from './publishers/publisher/log-publisher';
import { LogPublishersService } from './publishers/log-publishers.service';
import { LogEntry } from './logEntry/logEntry';
import { LogLevel } from './logLevel/logLevel';
import { IEnvironment } from 'src/environments/interface/ienvironment';
import { ENV } from 'src/environments/injectionToken/environment-provider';

/**
 * Service responsible for logging using every {@link LogPublisher} given by the
 * {@link LogPublishersService}. Inspired by
 * https://www.codemag.com/article/1711021/Logging-in-Angular-Applications
 */
@Injectable({
  providedIn: 'root',
})
export class LogService {
  /** Log level : minimal log level actually logged. */
  level: LogLevel = this.environment.logLevel;
  /** Does the log contains the date and time of the log. */
  logWithDate = this.environment.logWithDate;
  /** {@link LogPublisher} used to log the {@link LogEntry} */
  publishers: LogPublisher[];
  /**
   * Class name used in the log, used to identify where the log comes from in
   * the code, and should be specified when creating a logger.
   */
  className = 'none specified';

  /**
   * Log service constructor.
   *
   * @param environment The environment
   * @param publishersService The {@link LogPublishersService}
   */
  constructor(
    @Inject(ENV) private environment: IEnvironment,
    private publishersService: LogPublishersService
  ) {
    // Set publishers
    this.publishers = this.publishersService.publishers;
  }

  /**
   * Used to create a new logger with a specific class name
   *
   * @param name The name of the classe
   * @returns The logger
   */
  withClassName(name: string) {
    const res = new LogService(this.environment, this.publishersService);
    res.level = this.level;
    res.logWithDate = this.logWithDate;
    res.className = name;
    return res;
  }

  /**
   * Logs a debug message with optional objects
   *
   * @param msg The message
   * @param optionalParams The optional objects
   */
  debug(msg: string, ...optionalParams: unknown[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  /**
   * Logs a info message with optional objects
   *
   * @param msg The message
   * @param optionalParams The optional objects
   */
  info(msg: string, ...optionalParams: unknown[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  /**
   * Logs a warn message with optional objects
   *
   * @param msg The message
   * @param optionalParams The optional objects
   */
  warn(msg: string, ...optionalParams: unknown[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  /**
   * Logs a error message with optional objects
   *
   * @param msg The message
   * @param optionalParams The optional objects
   */
  error(msg: string, ...optionalParams: unknown[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  /**
   * Logs a fatal message with optional objects
   *
   * @param msg The message
   * @param optionalParams The optional objects
   */
  fatal(msg: string, ...optionalParams: unknown[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  /**
   * Creates a {@link LogEntry} with a messages and optional objects and logs it
   * at a given {@link LogLevel} using the {@link LogPublisher}.
   *
   * @param msg The message
   * @param level The {@link LogLevel}
   * @param params The optional objects
   */
  private writeToLog(msg: string, level: LogLevel, params: unknown[]) {
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry(this.environment);
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      entry.className = this.className;
      for (const logger of this.publishers) {
        logger.log(entry).subscribe({
          next: (response) => {
            if (!response) {
              // eslint-disable-next-line no-console
              console.log(
                'Erreur avec loggeur ' +
                  logger.constructor.name +
                  ' ' +
                  logger.location
              );
            }
          },
          error: () => {
            // eslint-disable-next-line no-console
            console.log(
              'Erreur avec loggeur ' +
                logger.constructor.name +
                ' ' +
                logger.location
            );
          },
          complete: undefined,
        });
      }
    }
  }

  /**
   * Tests whether or not a {@link LogEntry} should be logged at the given level.
   *
   * @param level The log level to test
   * @returns Whether or not the {@link LogEntry} should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    let ret = false;
    if (
      (level >= this.level && this.level !== LogLevel.Off) ||
      this.level === LogLevel.All
    ) {
      ret = true;
    }
    return ret;
  }
}
