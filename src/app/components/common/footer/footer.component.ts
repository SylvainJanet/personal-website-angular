import { Component, OnDestroy } from '@angular/core';
import { map, of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { Preloaders } from 'src/app/services/preloader/preloader.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements ComponentWithText, OnDestroy {
  footerText = of('');
  footerLink = of('');
  preloaders = [Preloaders.MAIN];
  bannerSrc;

  constructor(
    private languageService: LanguageService,
    private textService: TextService
  ) {
    this.bannerSrc = 'assets/img/overlay-bg.jpg';
    this.languageService.subscribe(this, 2);
    this.updateTexts();
  }

  updateTexts(): void {
    this.footerText = this.textService
      .get('sylvain-janet')
      .pipe(map((s) => s + ' - '));
    this.footerLink = this.textService.get('website');
  }

  ngOnDestroy(): void {
    this.languageService.unsubscribe(this);
  }
}
