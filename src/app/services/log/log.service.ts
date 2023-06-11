import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogLevel } from './logLevel';
import { LogPublisher } from './publishers/log-publisher';
import { LogPublishersService } from './publishers/log-publishers.service';

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
  level: LogLevel = environment.logLevel;
  /** Does the log contains the date and time of the log. */
  logWithDate = environment.logWithDate;
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
   * @param publishersService The {@link LogPublishersService}
   */
  constructor(private publishersService: LogPublishersService) {
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
    const res = new LogService(this.publishersService);
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
      const entry: LogEntry = new LogEntry();
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

/**
 * Represents a log entry, with all the information to log and provides methods
 * to format the log message appropriately.
 */
export class LogEntry {
  /** The date of creation of the entry */
  entryDate: Date = new Date();
  /** The message */
  message = '';
  /** The {@link LogLevel} of the entry */
  level: LogLevel = LogLevel.Debug;
  /** Optional objects */
  extraInfo: unknown[] = [];
  /** If the log entry should take the date into account */
  logWithDate = true;
  /**
   * The class name used in the log, used to identify where the log comes from
   * in the code, and should be specified when creating a logger.
   */
  className = '';
  /** If the logs should be compact */
  compactDisplay = environment.compactLogDisplay;

  /**
   * Builds the string to log using all of the information given.
   *
   * @returns The string to log
   */
  buildLogString(): string {
    let ret = '';

    if (this.logWithDate) {
      ret = new Date().toLocaleString() + (this.compactDisplay ? ' - ' : '');
    }

    ret +=
      (this.compactDisplay ? '' : '\n\t') +
      'Class:' +
      (this.compactDisplay ? ' ' : '\t') +
      this.className;
    ret +=
      (this.compactDisplay ? ' - ' : '\n\t') +
      'Type:' +
      (this.compactDisplay ? ' ' : '\t') +
      LogLevel[this.level];
    ret +=
      (this.compactDisplay ? ' - ' : '\n\t\t') +
      'Message:' +
      (this.compactDisplay ? ' ' : '\t') +
      this.message;
    if (this.extraInfo.length) {
      ret +=
        (this.compactDisplay ? ' - ' : '\n\t\t') +
        'Extra Info:' +
        (this.compactDisplay ? ' ' : '\t') +
        this.formatParams(this.extraInfo);
    }

    return ret;
  }

  /**
   * Format the optional objects.
   *
   * @param params The optional objects
   * @returns A string, displaying them properly
   */
  private formatParams(params: unknown[]): string {
    let ret: string = params.join(
      this.compactDisplay
        ? ','
        : '\n--------------------------------------------------------------------------------\n\t\t\t\t\t'
    );

    // Is there at least one object in the array?
    if (params.some((p) => typeof p == 'object')) {
      ret = '';

      // Build comma-delimited string
      for (const item of params) {
        ret +=
          JSON.stringify(item, this.replacer, this.compactDisplay ? '' : '\t\t')
            .split('\n')
            .join(this.compactDisplay ? '' : '\n\t\t\t\t\t') +
          (this.compactDisplay
            ? ','
            : '\n--------------------------------------------------------------------------------\n\t\t\t\t\t');
      }
    }

    return ret;
  }

  /**
   * Replacer method used to convert to JSON and remove information from the
   * logs.
   *
   * @param key The key
   * @param value The value
   * @returns The replaced value
   */
  private replacer(key: string, value: unknown) {
    if (key == 'secret') return undefined;
    else return value;
  }
}
