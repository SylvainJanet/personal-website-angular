import { Component, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { TypedAnimatedTextComponent } from '../../utilities/typed-animated-text/typed-animated-text.component';
import { CommonModule } from '@angular/common';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';

/**
 * Banner component. Used to display a basic banner with a title, animated
 * subtitle and a background image.
 */
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  standalone: true,
  imports: [CommonModule, TypedAnimatedTextComponent, ImgLoadDirective],
})
export class BannerComponent implements ComponentWithText, OnDestroy {
  /** {@link Preloaders} used for the banner image. */
  preloaders = [Preloaders.MAIN];
  /** Banner source. Will be taken from the css variables. */
  bannerSrc: string;
  /** Array of messages used for the subtitle animation. */
  messages: Observable<string>[] = [];
  /** Main title. */
  iAmMe: Observable<string> = of('');
  /**
   * Display style of the image double (see html for explanation as to why it
   * exists)
   */
  doubleImgDisplay = 'block';

  /**
   * Banner component constructor
   *
   * @param languageService The {@link LanguageService}
   * @param textService The {@link TextService}
   */
  constructor(
    private languageService: LanguageService,
    private textService: TextService
  ) {
    this.bannerSrc = getComputedStyle(document.documentElement)
      .getPropertyValue('--banner-bg-image-url')
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
    this.messages = [
      this.textService.get('occupation-fullstack-dev'),
      this.textService.get('occupation-trainer'),
      this.textService.get('occupation-mathematician'),
      this.textService.get('occupation-musician'),
    ];
    this.iAmMe = this.textService.get('main-title');
  }

  /**
   * When the image double loads, it should no longer be displayed. See html for
   * explanation as to why this behaviour exists
   */
  onDoubleImgLoad() {
    this.doubleImgDisplay = 'none';
  }

  /**
   * On destroy, the component has to be unsubscribed rom the
   * {@link LanguageService} to avoid having the service try to notify a
   * destroyed subscriber.
   */
  ngOnDestroy(): void {
    this.languageService.unsubscribe(this);
  }
}
