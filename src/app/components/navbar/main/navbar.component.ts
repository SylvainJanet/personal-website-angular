import { BreakpointService } from './../../../services/breakpoint/breakpoint.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', './navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public bps: BreakpointService) {}
}
