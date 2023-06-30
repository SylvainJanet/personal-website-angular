import { Observable } from 'rxjs';
import { LogEntry } from '../../logEntry/logEntry';

/**
 * Abstract class used to define a Log publisher. Any class extending this
 * abstrat class may be used in {@link LogPublisherService} so that logging may
 * occur usind said publisher.
 */
export abstract class LogPublisher {
  /**
   * Logging location. For instance, used to define the local storage key for
   * {@link LogLocalStorage}, or the API URI for {@link LogWebApi}.
   */
  location = '';
  /**
   * Method used to actually log a {@link LogEntry}. Returns a boolean indicating
   * if the entry was logged.
   *
   * @param record The {@link LogEntry} to log
   */
  abstract log(record: LogEntry): Observable<boolean>;
  /** Method used to clear the logs */
  abstract clear(): Observable<boolean>;
}
