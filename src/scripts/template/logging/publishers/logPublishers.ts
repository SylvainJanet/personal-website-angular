import { scriptVar } from '../../tools/setUp';

/**
 * Abstract class of a Log Publisher. Subclasses will be responsible for
 * actually logging a LogEntry and clearing the logs. A property
 * location may be set if necessary to provide additionnal info to the publisher
 */
export class AbstractLogPublisher {
  properties: any;
  constructor() {
    if (this.constructor === AbstractLogPublisher) {
      throw new TypeError(
        'Abstract class "AbstractLogPublisher" cannot be instantiated directly'
      );
    }
    this.properties = {
      location: '',
    };
  }

  get(name: string) {
    if (!this.has(name)) {
      throw new Error(`Property ${name} not found`);
    }
    return this.properties[name];
  }

  has(name: string) {
    return name in this.properties;
  }

  log(_record: any) {
    throw new Error('You must implement this function');
  }

  clear() {
    throw new Error('You must implement this function');
  }
}

/**
 * Log Publisher logging into the console.
 */
export class LogConsole extends AbstractLogPublisher {
  override log(entry: { buildLogString: () => any }) {
    console.log(entry.buildLogString());
  }

  override clear() {
    console.clear();
  }
}

/**
 * Log Publisher logging into the LocalStorage.
 */
export class LogLocalStroage extends AbstractLogPublisher {
  location: string;
  constructor() {
    super();
    this.location = scriptVar.localStorageLogging;
  }

  /**
   * LocalStorage containes a stringified array of LogEntry. Thus, to properly format
   * the log, one should first parse the value in LocalStorage, add the new LogEntry to
   * the resulting array, and stringify the result.
   * @param {*} entry LogEntry to log
   */
  override log(entry: any) {
    let values = [];

    try {
      values = localStorage.getItem(this.location)
        ? JSON.parse(localStorage.getItem(this.location) ?? '')
        : [];

      values.push(entry);

      localStorage.setItem(this.location, JSON.stringify(values, null, '\n'));
    } catch (ex) {
      // if an error occurs during the loging process, we lack any other mean to retrive the information.
      console.log(ex);
    }
  }

  override clear() {
    localStorage.removeItem(this.location);
  }
}
