import { Component, OnDestroy } from '@angular/core';
import { of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { Preloaders } from 'src/app/services/preloader/preloader.service';

/** Cv profile picture component containing the photo. */
@Component({
  selector: 'app-cv-img',
  templateUrl: './cv-img.component.html',
  styleUrls: ['./cv-img.component.css'],
})
export class CvImgComponent implements ComponentWithText, OnDestroy {
  /** {@link Preloaders} used for the cv profile picture. */
  preloaders = [Preloaders.MAIN];
  /** Alt text of the image. */
  altTxt = of('');

  /**
   * Cv profile picture component constructor
   *
   * @param languageService The {@link LanguageService}
   * @param textService The {@link TextService}
   */
  constructor(
    private languageService: LanguageService,
    private textService: TextService
  ) {
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
    // this.altTxt = this.textService.get('cv-img-alt');
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
