import { Injectable } from '@angular/core';
import { DatasourceService } from '../datasource/datasource.service';
import { Languages } from 'src/app/enums/languages';
import { HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { LanguageService } from '../../language/language.service';
import {
  PreloaderService,
  Preloaders,
} from '../../preloader/preloader.service';
import { SubParagraph } from 'src/app/components/classes/SubParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { Paragraph } from 'src/app/components/classes/Paragraph';

/** Text service. */
@Injectable({
  providedIn: 'root',
})
export class TextService {
  /**
   * Text service constructor
   *
   * @param dataSource The {@link DatasourceService}
   * @param langageService The {@link LanguageService}
   * @param preloaderService The {@link PreloaderService}
   */
  constructor(
    private dataSource: DatasourceService,
    private langageService: LanguageService,
    private preloaderService: PreloaderService
  ) {}

  /**
   * Get text for a selector in a language
   *
   * @param selector The selectore
   * @param language The language
   * @returns An observable of the text
   */
  private getText(selector: string, language: Languages): Observable<string> {
    const params = new HttpParams()
      .set('selector', selector)
      .set('language', Languages[language]);
    return this.dataSource.get('text', params);
  }

  /**
   * Get a text for a selector. Uses {@link getText} and the
   * {@link LanguageService} to get the current language. Notifies the TEXTS
   * {@link Preloaders} the a text is loading, as weel as when the text is
   * loaded.
   *
   * @param selector The selector
   * @returns An observable of the text
   */
  get(selector: string): Observable<string> {
    this.preloaderService.toLoad(Preloaders.TEXTS, 1);
    let isFirstTime = true;
    return this.getText(selector, this.langageService.current()).pipe(
      catchError(() => {
        if (isFirstTime) {
          this.preloaderService.loaded(Preloaders.TEXTS, 1);
        }
        isFirstTime = false;
        return ['error'];
      }),
      map((r) => {
        // in case the Observable is binded multiple times, this should only happen once.
        if (isFirstTime) {
          this.preloaderService.loaded(Preloaders.TEXTS, 1);
        }
        isFirstTime = false;
        return r;
      })
    );
  }

  /**
   * Get the other language (as in, the language that the app is not currently
   * in) name in its own language.
   *
   * @returns An observable of the language name
   */
  getOtherLanguage(): Observable<string> {
    return this.langageService.current() == Languages.FRENCH
      ? this.getText('english-language-name', Languages.ENGLISH)
      : this.getText('french-language-name', Languages.FRENCH);
  }

  /**
   * Get a string for a selector, but splits the result to get an array of
   * {@link Paragraph}.
   *
   * In the text, use `[[]]` to create new paragraph, use `[[br]]` to create a
   * `<br>` element, use `[[a_asset, link/to/asset.jpg]]` to create an `<a>`
   * with href to assets/link/to/asset.jpg (see
   * {@link TextSubParagraphComponent}), use `[[, some text]]` to create
   * `<strong><em>some text</em></strong>`
   *
   * Do note that those elements are designed with the existence of code
   * injection in mind and/or malicious content in mind. For instance, `<a\>`
   * links are designed to be always prefixed by the asset folder path and hence
   * avoid any kind of attacks and injection of link to another domain (or even
   * the same domain but with an unexpected path).
   *
   * @param selector The selector
   * @returns An observable of the {@link Paragraph}.
   */
  getSplit(selector: string): Observable<Paragraph[]> {
    this.preloaderService.toLoad(Preloaders.TEXTS, 1);
    let isFirstTime = true;
    return this.getText(selector, this.langageService.current()).pipe(
      catchError(() => {
        if (isFirstTime) {
          this.preloaderService.loaded(Preloaders.TEXTS, 1);
        }
        isFirstTime = false;
        return ['error'];
      }),
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
      }),
      map((r) => {
        // in case the Observable is binded multiple times, this should only happen once.
        if (isFirstTime) {
          this.preloaderService.loaded(Preloaders.TEXTS, 1);
        }
        isFirstTime = false;
        return r;
      })
    );
  }
}
