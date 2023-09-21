import { CommonModule } from '@angular/common';
import { Component, OnDestroy, Inject } from '@angular/core';
import { map, of } from 'rxjs';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { IEnvironment } from 'src/environments/interface/ienvironment';

/** Footer component, displaying a banner and a link to the website. */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [CommonModule, ImgLoadDirective],
})
export class FooterComponent implements ComponentWithText, OnDestroy {
  /** Footer text just before the link. */
  footerText = of('');
  /** Text of the footer link. */
  footerLink = of('');
  /** Actual link. */
  footerHref = of('');
  /** {@link Preloaders} used for the footer image. */
  preloaders = [Preloaders.MAIN];
  /** Footer source. Will be taken from the css variables. */
  footerSrc;
  /**
   * Display style of the image double (see html for explanation as to why it
   * exists)
   */
  doubleImgDisplay = 'block';

  /**
   * Footer component constructor
   *
   * @param languageService The {@link LanguageService}
   * @param textService The {@link TextService}
   * @param environment The environment
   */
  constructor(
    private languageService: LanguageService,
    private textService: TextService,
    @Inject(ENV) public environment: IEnvironment
  ) {
    this.footerSrc = getComputedStyle(document.documentElement)
      .getPropertyValue('--footer-bg-image-url')
      .split('(')[1]
      .split(')')[0]
      .replaceAll('"', '');
    this.languageService.subscribe(this);
    this.updateTexts();
  }

  /**
   * Update the component's texts when the language is updated. See
   * {@link LanguageService}. The subscriber design pattern is used and this
   * function is used when the service notifies its subscribers to update the
   * text contents after a language change. Uses {@link TextService} to get those
   * contents from the database.
   */
  updateTexts(): void {
    this.footerText = this.textService
      .get('sylvain-janet')
      .pipe(map((s) => s + ' - '));
    this.footerLink = this.textService.get('website');
    this.footerHref = this.footerLink.pipe(map((s) => 'https://www.' + s));
  }

  /**
   * On destroy, the component has to be unsubscribed rom the
   * {@link LanguageService} to avoid having the service try to notify a
   * destroyed subscriber.
   */
  ngOnDestroy(): void {
    this.languageService.unsubscribe(this);
  }

  /**
   * When the image double loads, it should no longer be displayed. See html for
   * explanation as to why this behaviour exists
   */
  onDoubleImgLoad() {
    this.doubleImgDisplay = 'none';
  }
}
