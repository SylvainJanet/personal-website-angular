import { Component, OnDestroy } from '@angular/core';
import { of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-cv-skills',
  templateUrl: './cv-skills.component.html',
  styleUrls: ['./cv-skills.component.css'],
})
export class CvSkillsComponent implements ComponentWithText, OnDestroy {
  skills = of('');
  java = of('');
  csharp = of('');
  python = of('');
  jsts = of('');
  sql = of('');
  html = of('');
  latex = of('');

  constructor(
    private languageService: LanguageService,
    private textService: TextService
  ) {
    this.languageService.subscribe(this, 8);
    this.updateTexts();
  }

  updateTexts(): void {
    this.skills = this.textService.get('skills-title');
    this.java = this.textService.get('java-language');
    this.csharp = this.textService.get('csharp-language');
    this.python = this.textService.get('python-language');
    this.jsts = this.textService.get('js-ts-language');
    this.sql = this.textService.get('sql-language');
    this.html = this.textService.get('html-language');
    this.latex = this.textService.get('latex-language');
  }

  ngOnDestroy(): void {
    this.languageService.unsubscribe(this);
  }
}
