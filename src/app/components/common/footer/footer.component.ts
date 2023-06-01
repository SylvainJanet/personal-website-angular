import { Component } from '@angular/core';
import { Preloaders } from 'src/app/services/preloader/preloader.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  footerText = 'Sylvain Janet - ';
  footerLink = 'sylvainjanet.fr';
  preloaders = [Preloaders.MAIN];
  bannerSrc;

  constructor() {
    this.bannerSrc = 'assets/img/overlay-bg.jpg';
  }
}
