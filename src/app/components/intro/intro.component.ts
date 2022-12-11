import { BreakpointService } from './../../services/breakpoint/breakpoint.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent {
  small: boolean;

  constructor(private bpService: BreakpointService) {
    this.small = bpService.isSmallOrLess();
  }
}
