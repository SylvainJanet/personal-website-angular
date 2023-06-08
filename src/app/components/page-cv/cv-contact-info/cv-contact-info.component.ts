import { Component, OnDestroy } from '@angular/core';
import { of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-cv-contact-info',
  templateUrl: './cv-contact-info.component.html',
  styleUrls: ['./cv-contact-info.component.css'],
})
export class CvContactInfoComponent implements ComponentWithText, OnDestroy {
  name = of('');
  sj = of('');
  profile = of('');
  fsDev = of('');
  email = of('');
  phone = of('');

  constructor(
    private languageService: LanguageService,
    private textService: TextService
  ) {
    this.languageService.subscribe(this, 6);
    this.updateTexts();
  }

  updateTexts(): void {
    this.name = this.textService.get('about-name-field');
    this.sj = this.textService.get('sylvain-janet');
    this.profile = this.textService.get('about-profile-field');
    this.fsDev = this.textService.get('occupation-fullstack-dev');
    this.email = this.textService.get('about-email-field');
    this.phone = this.textService.get('about-phone-field');
  }
  ngOnDestroy(): void {
    this.languageService.unsubscribe(this);
  }
}
