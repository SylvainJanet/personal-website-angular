import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogLevel } from './logLevel';
import { LogPublisher } from './publishers/log-publishers';
import { LogPublishersService } from './publishers/log-publishers.service';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  // https://www.codemag.com/article/1711021/Logging-in-Angular-Applications

  level: LogLevel = environment.logLevel;
  logWithDate = true;
  publishers: LogPublisher[];
  className = 'none specified';

  constructor(private publishersService: LogPublishersService) {
    // Set publishers
    this.publishers = this.publishersService.publishers;
  }

  withClassName(name: string) {
    const res = new LogService(this.publishersService);
    res.level = this.level;
    res.logWithDate = this.logWithDate;
    res.className = name;
    return res;
  }

  debug(msg: string, ...optionalParams: unknown[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: unknown[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: unknown[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: unknown[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: unknown[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: unknown[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

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
              console.log(
                'Erreur avec loggeur ' +
                  logger.constructor.name +
                  ' ' +
                  logger.location
              );
            }
          },
          error: () => {
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

  private shouldLog(level: LogLevel): boolean {
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
export class LogEntry {
  // Public Properties
  entryDate: Date = new Date();
  message = '';
  level: LogLevel = LogLevel.Debug;
  extraInfo: unknown[] = [];
  logWithDate = true;
  className = '';
  compactDisplay = environment.compactLogDisplay;

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
          JSON.stringify(item, null, this.compactDisplay ? '' : '\t\t')
            .split('\n')
            .join(this.compactDisplay ? '' : '\n\t\t\t\t\t') +
          (this.compactDisplay
            ? ','
            : '\n--------------------------------------------------------------------------------\n\t\t\t\t\t');
      }
    }

    return ret;
  }
}
