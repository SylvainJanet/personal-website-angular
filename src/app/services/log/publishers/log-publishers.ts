import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogEntry } from '../log.service';
import { environment } from 'src/environments/environment';

export abstract class LogPublisher {
  location = '';
  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublisher {
  log(entry: LogEntry): Observable<boolean> {
    // Log to console
    console.log(entry.buildLogString());
    return of(true);
  }

  clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }
}

export class LogLocalStorage extends LogPublisher {
  maxSize;
  constructor() {
    // Must call `super()`from derived classes
    super();

    // Set location
    this.location = 'logging';
    this.maxSize = environment.production ? 100 : 1000;
  }

  pushOrShift(values: LogEntry[], entry: LogEntry) {
    if (values.length > this.maxSize) {
      values.shift();
    }
    values.push(entry);
  }

  // Append log entry to local storage
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
      console.log(ex);
    }

    return of(ret);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }
}

export class LogWebApi extends LogPublisher {
  http: HttpClient;
  constructor(httpClient: HttpClient) {
    // Must call `super()`from derived classes
    super();

    // Set location
    this.location = '/api/log';
    this.http = httpClient;
  }

  // Add log entry to back end data store
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

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    // Call Web API to clear all values
    return of(true);
  }

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

    console.error('An error occurred', errors);
    return throwError(() => errors);
  }
}
