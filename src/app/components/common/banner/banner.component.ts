import {
  ApplicationRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { TypedAnimatedTextComponent } from '../../utilities/typed-animated-text/typed-animated-text.component';
import { CommonModule } from '@angular/common';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Banner component. Used to display a basic banner with a title, animated
 * subtitle and a background image.
 */
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TypedAnimatedTextComponent,
    ImgLoadDirective,
    MatProgressSpinnerModule,
  ],
})
export class BannerComponent implements ComponentWithText, OnDestroy {
  /** The main div element of the component. */
  @ViewChild('mainDiv') mainDiv!: ElementRef<HTMLElement>;
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
  /** Preloader for texts. */
  loaderTexts = Preloaders.TEXTS;

  /**
   * Banner component constructor
   *
   * @param languageService The {@link LanguageService}
   * @param textService The {@link TextService}
   * @param visibleToLoadTextService The {@link VisibleToLoadTextService}
   * @param preloader The {@link PreloaderService}
   */
  constructor(
    private textService: TextService,
    private ref: ApplicationRef,
    public visibleToLoadTextService: VisibleToLoadTextService,
    public preloader: PreloaderService
  ) {
    this.bannerSrc = getComputedStyle(document.documentElement)
      .getPropertyValue('--banner-bg-image-url')
      .split('(')[1]
      .split(')')[0]
      .replaceAll('"', '');
    setTimeout(() => {
      this.visibleToLoadTextService.subscribe(this);
    }, 0);
  }

  /**
   * Update the component's texts when the language is updated. See
   * {@link VisibleToLoadTextService}. The subscriber design pattern is used and
   * this function is used when the service notifies its subscribers to update
   * the text contents after a language change. Uses {@link TextService} to get
   * those contents from the database.
   */
  updateTexts(): void {
    this.textService
      .getMulti([
        'occupation-fullstack-dev',
        'occupation-trainer',
        'occupation-mathematician',
        'occupation-musician',
        'main-title',
      ])
      .subscribe((r) => {
        this.messages = [of(r[0]), of(r[1]), of(r[2]), of(r[3])];
        this.iAmMe = of(r[4]);
        this.visibleToLoadTextService.textLoaded(this);
      });
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
   * {@link VisibleToLoadTextService} to avoid having the service try to notify a
   * destroyed subscriber.
   */
  ngOnDestroy(): void {
    this.visibleToLoadTextService.unsubscribe(this);
  }

  /**
   * Get the main component element.
   *
   * @returns The element.
   */
  getElement(): ElementRef<HTMLElement> {
    return this.mainDiv;
  }
}
