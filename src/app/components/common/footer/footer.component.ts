import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map, of } from 'rxjs';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { IEnvironment } from 'src/environments/interface/ienvironment';

/** Footer component, displaying a banner and a link to the website. */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [CommonModule, ImgLoadDirective, MatProgressSpinnerModule],
})
export class FooterComponent implements ComponentWithText, OnDestroy {
  /** The main section element of the component. */
  @ViewChild('mainSection') mainSection!: ElementRef<HTMLElement>;
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
  /** Preloader for texts. */
  loaderTexts = Preloaders.TEXTS;

  /**
   * Footer component constructor
   *
   * @param languageService The {@link LanguageService}
   * @param textService The {@link TextService}
   * @param environment The environment
   * @param visibleToLoadTextService The {@link VisibleToLoadTextService}
   * @param preloader The {@link PreloaderService}
   */
  constructor(
    private languageService: LanguageService,
    private textService: TextService,
    @Inject(ENV) public environment: IEnvironment,
    public visibleToLoadTextService: VisibleToLoadTextService,
    public preloader: PreloaderService
  ) {
    this.footerSrc = getComputedStyle(document.documentElement)
      .getPropertyValue('--footer-bg-image-url')
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
    this.textService.getMulti(['sylvain-janet', 'website']).subscribe((r) => {
      this.footerText = of(r[0] + ' - ');
      this.footerLink = of(r[1]);
      this.footerHref = this.footerLink.pipe(map((s) => 'https://www.' + s));

      this.visibleToLoadTextService.textLoaded(this);
    });
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
   * When the image double loads, it should no longer be displayed. See html for
   * explanation as to why this behaviour exists
   */
  onDoubleImgLoad() {
    this.doubleImgDisplay = 'none';
  }

  /**
   * Get the main component element.
   *
   * @returns The element.
   */
  getElement(): ElementRef<HTMLElement> {
    return this.mainSection;
  }
}
