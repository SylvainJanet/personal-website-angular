import { Injectable } from '@angular/core';
import { LogPublisher } from './log-publisher';
import { LogConsole } from './log-console';
import { LogLocalStorage } from './log-local-storage';

/**
 * Service responsible for giving an array of {@link LogPublisher} used for
 * logging.
 */
@Injectable({
  providedIn: 'root',
})
export class LogPublishersService {
  /** Log publisher service constructor. */
  constructor() {
    // Build publishers arrays
    this.buildPublishers();
  }

  /** Public properties */
  publishers: LogPublisher[] = [];

  /** Build publishers array */
  buildPublishers(): void {
    // Create instance of LogConsole Class
    this.publishers.push(new LogConsole());
    this.publishers.push(new LogLocalStorage());
    // pour API : this.publishers.push(new LogWebApi(this.http));
  }
}
