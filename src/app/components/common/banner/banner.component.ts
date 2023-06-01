import { Component } from '@angular/core';
import { Preloaders } from 'src/app/services/preloader/preloader.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent {
  preloaders = [Preloaders.MAIN];
  bannerSrc: string;

  constructor() {
    this.bannerSrc =
      'assets/img/' +
      getComputedStyle(document.documentElement)
        .getPropertyValue('--banner-bg-image-url')
        .split("'")[1];
  }
}
