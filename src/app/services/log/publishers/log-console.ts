import { Observable, of } from 'rxjs';
import { LogEntry } from '../log.service';
import { LogPublisher } from './log-publisher';

/** Console {@link LogPublisher}. Used to log in console. */
export class LogConsole extends LogPublisher {
  /**
   * Method used to actually log a {@link LogEntry}. Returns
   *
   * @param entry The {@link LogEntry} to log
   * @returns A boolean indicating if the entry was logged.
   */
  log(entry: LogEntry): Observable<boolean> {
    // Log to console
    // eslint-disable-next-line no-console
    console.log(entry.buildLogString());
    return of(true);
  }

  /** Method used to clear the console */
  clear(): Observable<boolean> {
    // eslint-disable-next-line no-console
    console.clear();
    return of(true);
  }
}
