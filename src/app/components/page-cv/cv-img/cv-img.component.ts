import { Component } from '@angular/core';
import { Preloaders } from 'src/app/services/preloader/preloader.service';

@Component({
  selector: 'app-cv-img',
  templateUrl: './cv-img.component.html',
  styleUrls: ['./cv-img.component.css'],
})
export class CvImgComponent {
  preloaders = [Preloaders.MAIN];
}
