import { Inject, Injectable } from '@angular/core';
import { LogPublisher } from './publisher/log-publisher';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { IEnvironment } from 'src/environments/interface/ienvironment';
import { LogConsole } from './console/log-console';
import { LogLocalStorage } from './local-storage/log-local-storage';

/**
 * Service responsible for giving an array of {@link LogPublisher} used for
 * logging.
 */
@Injectable({
  providedIn: 'root',
})
export class LogPublishersService {
  /**
   * Log publisher service constructor.
   *
   * @param environment The environment
   */
  constructor(@Inject(ENV) private environment: IEnvironment) {
    // Build publishers arrays
    this.buildPublishers();
  }

  /** Public properties */
  private _publishers: LogPublisher[] = [];

  public get publishers() {
    return this._publishers;
  }

  /** Build publishers array */
  buildPublishers(): void {
    // Create instance of LogConsole Class
    this._publishers.push(new LogConsole());
    this._publishers.push(new LogLocalStorage(this.environment));
    // pour API : this.publishers.push(new LogWebApi(this.http));
  }
}
