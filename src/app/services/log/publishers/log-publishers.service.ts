import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogConsole, LogPublisher, LogLocalStorage } from './log-publishers';

@Injectable({
  providedIn: 'root',
})
export class LogPublishersService {
  http: HttpClient;
  constructor(private httpClient: HttpClient) {
    // Build publishers arrays
    this.http = this.httpClient;
    this.buildPublishers();
  }

  // Public properties
  publishers: LogPublisher[] = [];

  // Build publishers array
  buildPublishers(): void {
    // Create instance of LogConsole Class
    this.publishers.push(new LogConsole());
    // this.publishers.push(new LogLocalStorage());
    // pour API : this.publishers.push(new LogWebApi(this.http));
  }
}
