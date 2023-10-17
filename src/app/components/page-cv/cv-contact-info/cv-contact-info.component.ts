import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';

/**
 * Contact info component, containing basic contact info such as phone number,
 * email and a quick review of my name and profile.
 */
@Component({
  selector: 'app-cv-contact-info',
  templateUrl: './cv-contact-info.component.html',
  styleUrls: ['./cv-contact-info.component.css'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class CvContactInfoComponent implements ComponentWithText, OnDestroy {
  /** The main div element of the component. */
  @ViewChild('mainDiv') mainDiv!: ElementRef<HTMLElement>;
  /** Text containing the name label. */
  name = of('');
  /** Text containing the name. */
  sj = of('');
  /** Text containing the profile label. */
  profile = of('');
  /** Text containing the profile. */
  fsDev = of('');
  /** Text containing the email label. */
  email = of('');
  /** Text containing the phone label. */
  phone = of('');
  /** Preloader for texts. */
  loaderTexts = Preloaders.TEXTS;

  /**
   * Contact info component constructor.
   *
   * @param textService The {@link TextService}
   * @param visibleToLoadTextService The {@link VisibleToLoadTextService}
   * @param preloader The {@link PreloaderService}
   */
  constructor(
    private textService: TextService,
    public visibleToLoadTextService: VisibleToLoadTextService,
    public preloader: PreloaderService
  ) {
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
        'about-name-field',
        'sylvain-janet',
        'about-profile-field',
        'occupation-fullstack-dev',
        'about-email-field',
        'about-phone-field',
      ])
      .subscribe((r) => {
        this.name = of(r[0]);
        this.sj = of(r[1]);
        this.profile = of(r[2]);
        this.fsDev = of(r[3]);
        this.email = of(r[4]);
        this.phone = of(r[5]);

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
   * Get the main component element.
   *
   * @returns The element.
   */
  getElement(): ElementRef<HTMLElement> {
    return this.mainDiv;
  }
}
