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
import { SubParagraph } from 'src/app/components/classes/SubParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { Paragraph } from 'src/app/components/classes/Paragraph';

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
    this.preloaderService.toLoad(Preloaders.TEXTS, 1);
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

  getSplit(selector: string): Observable<Paragraph[]> {
    this.preloaderService.toLoad(Preloaders.TEXTS, 1);
    return this.getText(selector, this.langageService.current()).pipe(
      map((s) => {
        const res = [];
        const paragraphs = s.split(/\[\[\]\]/);
        for (const paragraph of paragraphs) {
          const split = paragraph.split(/\[\[|\]\]/);
          const p = new Paragraph([]);
          for (let i = 0; i < split.length; i++) {
            if (i % 2 == 0 && (i != split.length - 1 || split[i])) {
              p.els.push(new SubParagraph(SubParagraphRoot.SPAN, split[i]));
            } else {
              const element = split[i];
              const ref = element.split(',')[0];
              if (ref == 'br') {
                p.els.push(new SubParagraph(SubParagraphRoot.BR, ''));
              } else if (ref == 'a_asset') {
                p.els.push(
                  new SubParagraph(
                    SubParagraphRoot.A_ASSET,
                    element.split(',').splice(-1, 1).join('')
                  )
                );
              } else {
                p.els.push(
                  new SubParagraph(
                    SubParagraphRoot.STRONG_EM,
                    element.split(',').splice(-1, 1).join('')
                  )
                );
              }
            }
          }
          res.push(p);
        }
        return res;
      })
    );
  }
}
