import { Component, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { Preloaders } from 'src/app/services/preloader/preloader.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements ComponentWithText, OnDestroy {
  preloaders = [Preloaders.MAIN];
  bannerSrc: string;
  messages: Observable<string>[] = [];
  iAmMe: Observable<string> = of('');

  constructor(
    private languageService: LanguageService,
    private textService: TextService
  ) {
    this.bannerSrc =
      'assets/img/' +
      getComputedStyle(document.documentElement)
        .getPropertyValue('--banner-bg-image-url')
        .split("'")[1];
    this.languageService.subscribe(this);
    this.updateTexts();
  }
  updateTexts(): void {
    this.messages = [
      this.textService.get('occupation-fullstack-dev'),
      this.textService.get('occupation-trainer'),
      this.textService.get('occupation-mathematician'),
      this.textService.get('occupation-musician'),
    ];
    this.iAmMe = this.textService.get('main-title');
  }
  ngOnDestroy(): void {
    this.languageService.unsubscribe(this);
  }
}
