import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogEntry } from '../log.service';
import { environment } from 'src/environments/environment';

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

/** Local storage {@link LogPublisher}. Used to log in local storage. */
export class LogLocalStorage extends LogPublisher {
  /** Max number of elements in local storage */
  maxSize;

  /** Log local storage publisher constructor. */
  constructor() {
    // Must call `super()`from derived classes
    super();

    // Set location
    this.location = 'logging';
    this.maxSize = environment.production ? 100 : 1000;
  }

  /**
   * Push a {@link LogEntry} in an array if the array is small enough, but shift
   * all the values otherwise. Used to ensure the localStorage size doesn't
   * increase above the set limit.
   *
   * @param values The array of {@link LogEntry}
   * @param entry The {@link LogEntry} to push at the end of the array, after a
   *   shift if necessary
   */
  pushOrShift(values: LogEntry[], entry: LogEntry) {
    if (values.length > this.maxSize) {
      values.shift();
    }
    values.push(entry);
  }

  /**
   * Method used to actually log a {@link LogEntry}. Returns
   *
   * @param entry The {@link LogEntry} to log
   * @returns A boolean indicating if the entry was logged.
   */
  log(entry: LogEntry): Observable<boolean> {
    let ret = false;
    let values: LogEntry[];

    try {
      // Get previous values from local storage
      values = localStorage.getItem(this.location)
        ? JSON.parse(localStorage.getItem(this.location) as string)
        : [];

      // Add new log entry to array
      this.pushOrShift(values, entry);

      // Store array into local storage
      localStorage.setItem(this.location, JSON.stringify(values, null, '\n'));

      // Set return value
      ret = true;
    } catch (ex) {
      // Display error in console
      // eslint-disable-next-line no-console
      console.log(ex);
    }

    return of(ret);
  }

  /** Method used to clear the local storage */
  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }
}

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
