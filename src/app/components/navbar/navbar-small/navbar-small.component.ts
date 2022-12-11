import { Component } from '@angular/core';

// https://stackoverflow.com/questions/39930709/how-to-handle-hybrid-devices-in-click-touch-events-properly

@Component({
  selector: 'app-navbar-small',
  templateUrl: './navbar-small.component.html',
  styleUrls: ['./navbar-small.component.css'],
})
export class NavbarSmallComponent {
  message = 'Test event';
  testEvent() {
    this.message =
      this.message == 'Test event' ? 'event detected' : 'Test event';
  }
}
