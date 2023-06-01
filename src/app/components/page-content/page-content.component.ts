import { Component } from '@angular/core';
import { Preloaders } from 'src/app/services/preloader/preloader.service';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.css'],
})
export class PageContentComponent {
  preloaders = [Preloaders.MAIN];
}
