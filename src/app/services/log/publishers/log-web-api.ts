import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { LogEntry } from '../log.service';
import { LogPublisher } from './log-publisher';

/** Web API log publisher. Used to post logs to an API. */
export class LogWebApi extends LogPublisher {
  /**
   * Publisher constructor.
   *
   * @param http The `HttpClient`
   */
  constructor(private http: HttpClient) {
    // Must call `super()`from derived classes
    super();

    // Set location
    this.location = '/api/log';
  }

  /**
   * Method used to actually log a {@link LogEntry}. Returns
   *
   * @param entry The {@link LogEntry} to log
   * @returns A boolean indicating if the entry was logged.
   */
  log(entry: LogEntry): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return (
      this.http
        .post(this.location, entry, { headers })
        .pipe(catchError(this.handleErrors))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe((response: any) => response)
    );
  }

  /** Method used to clear the logs */
  clear(): Observable<boolean> {
    // Call Web API to clear all values
    return of(true);
  }

  /**
   * Handles exceptions occuring during the log.
   *
   * @param error The error
   * @returns False, to indicate that the log
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleErrors(error: any): Observable<any> {
    const errors: string[] = [];
    let msg = '';

    msg = 'Status: ' + error.status;
    msg += ' - Status Text: ' + error.statusText;
    if (error) {
      msg += ' - Exception Message: ' + error.exceptionMessage;
    }
    errors.push(msg);

    // eslint-disable-next-line no-console
    console.error('An error occurred', errors);
    return of(false);
  }
}
