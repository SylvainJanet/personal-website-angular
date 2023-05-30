import {
  AbstractLogPublisher,
  LogConsole,
  LogLocalStroage,
} from './logPublishers';

/**
 * Log Publisher Service, instanciates and provides the publishers
 * used.
 */
export class LogPublisherService {
  constructor() {
    this.buildPublishers();
  }

  publishers: AbstractLogPublisher[] = [];

  buildPublishers() {
    this.publishers.push(new LogConsole());
    this.publishers.push(new LogLocalStroage());
  }
}
