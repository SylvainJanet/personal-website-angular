import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogEntry } from '../log.service';
import { LogPublisher } from './log-publisher';

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
