import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { LanguageService } from 'src/app/services/language/language.service';

/**
 * Contact info component, containing basic contact info such as phone number,
 * email and a quick review of my name and profile.
 */
@Component({
  selector: 'app-cv-contact-info',
  templateUrl: './cv-contact-info.component.html',
  styleUrls: ['./cv-contact-info.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CvContactInfoComponent implements ComponentWithText, OnDestroy {
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

  /**
   * Contact info component constructor.
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
      });
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
