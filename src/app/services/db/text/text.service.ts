import { Injectable } from '@angular/core';
import { DatasourceService } from '../datasource/datasource-test.service';
import { Languages } from 'src/app/enums/languages';
import { HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LanguageService } from '../../language/language.service';
import {
  PreloaderService,
  Preloaders,
} from '../../preloader/preloader.service';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  constructor(
    private dataSource: DatasourceService,
    private langageService: LanguageService,
    private preloaderService: PreloaderService
  ) {}

  getText(selector: string, language: Languages): Observable<string> {
    const params = new HttpParams()
      .set('selector', selector)
      .set('language', Languages[language]);
    return this.dataSource.get('text', params);
  }

  get(selector: string): Observable<string> {
    return this.getText(selector, this.langageService.current()).pipe(
      map((r) => {
        this.preloaderService.loaded(Preloaders.TEXTS, 1);
        return r;
      })
    );
  }

  getOtherLanguage(): Observable<string> {
    return this.langageService.current() == Languages.FRENCH
      ? this.getText('english-language-name', Languages.ENGLISH)
      : this.getText('french-language-name', Languages.FRENCH);
  }

  getSplit(selector: string): Observable<string[]> {
    return this.getText(selector, this.langageService.current()).pipe(
      map((s) => {
        const split = s.split(new RegExp('\\[\\[|\\]\\]'));
        const res = [];
        for (let index = 0; index < split.length; index++) {
          if (index % 2 == 0 && (index != split.length - 1 || split[index])) {
            res.push(split[index]);
          } else {
            const element = split[index];
            if (element) {
              res.push(element.split(',').splice(-1, 1).join(''));
            }
          }
        }
        this.preloaderService.loaded(Preloaders.TEXTS, res.length);
        return res;
      })
    );
  }
}
