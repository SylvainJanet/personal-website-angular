import { Preloaders } from 'src/app/services/preloader/preloader.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  preloaders = [Preloaders.MAIN];
}
