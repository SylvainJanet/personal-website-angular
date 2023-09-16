import { IEnvironment } from 'src/environments/interface/ienvironment';
import { LogLevel } from '../logLevel/logLevel';

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
  compactDisplay: boolean;

  /**
   * LogEntry constructor
   *
   * @param environment The environment
   */
  constructor(environment: IEnvironment) {
    this.compactDisplay = environment.compactLogDisplay;
  }

  /**
   * Builds the string to log using all of the information given.
   *
   * @returns The string to log
   */
  buildLogString(): string {
    let ret = '';

    if (this.logWithDate) {
      ret =
        this.entryDate.toLocaleString() + (this.compactDisplay ? ' - ' : '');
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
      if (ret.endsWith(',')) {
        ret = ret.slice(0, -1);
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
