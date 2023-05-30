import { environment } from '../../../environments/environment';
import { LogLevel } from './logLevel';
import { AbstractLogPublisher } from './publishers/logPublishers';
import { LogPublisherService } from './publishers/logPublishersService';

const publishersService = new LogPublisherService();

/**
 * LogService class. Used to log
 */
export class LogService {
  level = environment.logLevel;
  logWithDate = true;
  publishers: AbstractLogPublisher[] = [];
  className = 'none specified';
  publishersService: LogPublisherService;

  constructor() {
    this.publishers = publishersService.publishers;
    this.publishersService = publishersService;
  }

  withClassName(name: string) {
    const res = new LogService();
    res.className = name;
    return res;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeToLog(msg: string, level: number, params: any[]) {
    if (this.shouldLog(level)) {
      const entry = new LogEntry();
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      entry.className = this.className;
      for (const logger of this.publishers) {
        logger.log(entry);
      }
    }
  }

  shouldLog(level: number) {
    let ret = false;
    if (
      (level >= this.level && level !== LogLevel.Off) ||
      this.level === LogLevel.All
    ) {
      ret = true;
    }
    return ret;
  }
}

/**
 * LogEntry objects having all the information that
 * could be formatted and logged by a LogPublisher.
 */
export class LogEntry {
  entryDate = new Date();
  message = '';
  level = LogLevel.Debug;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraInfo: any[] = [];
  logWithDate = true;
  className = '';

  /**
   * Provides a canonical format of the log entry.
   * @returns a log message formatted
   */
  buildLogString() {
    let ret = '';

    if (this.logWithDate) {
      ret = this.entryDate.toLocaleDateString() + ' - ';
    }

    ret += 'Class: ' + this.className;
    ret += ' - Type: ' + LogLevel[this.level];
    ret += ' - Message: ' + this.message;
    if (this.extraInfo.length) {
      ret += ' - Extra Info: ' + this.formatParams(this.extraInfo);
    }

    return ret;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatParams(params: any[]) {
    let ret = params.join(',');

    if (params.some((p) => typeof p == 'object')) {
      ret = '';

      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }

    return ret;
  }
}

const logService = new LogService();
export { logService };
