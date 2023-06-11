import { Injectable } from '@angular/core';
import { LogConsole, LogPublisher, LogLocalStorage } from './log-publisher';

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
