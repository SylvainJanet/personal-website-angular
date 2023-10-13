import { Injectable } from '@angular/core';
import { DatasourceService } from '../datasource/datasource.service';
import { Languages } from 'src/app/enums/languages';
import { HttpParams } from '@angular/common/http';
import { Observable, catchError, concat, map, of, skip } from 'rxjs';
import { LanguageService } from '../../language/language.service';
import { PreloaderService } from '../../preloader/preloader.service';
import { Paragraph } from 'src/app/components/classes/paragraph/paragraph';
import { StringDto } from 'src/app/interfaces/StringDto';
import { Preloaders } from '../../preloader/preloaders/preloaders';
import { ifFirst } from 'src/app/operators/ifFirst';
import { ParagraphDecoderService } from '../../paragraphdecoder/paragraph-decoder.service';
import { ListStringDto } from 'src/app/interfaces/ListStringDto';

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
   * @param paragraphDecoderService The {@link ParagraphDecoderService}
   */
  constructor(
    private dataSource: DatasourceService,
    private langageService: LanguageService,
    private preloaderService: PreloaderService,
    private paragraphDecoderService: ParagraphDecoderService
  ) {}

  /**
   * Get text for a selector in a language
   *
   * @param selector The selector
   * @param language The language
   * @returns An observable of the text
   */
  private getText(selector: string, language: Languages): Observable<string> {
    const params = new HttpParams()
      .set('selector', selector)
      .set('language', Languages[language]);
    return this.dataSource
      .get<StringDto>('text', params)
      .pipe(map((c) => c.message));
  }

  /**
   * Get texts for multiple selectors in a language
   *
   * @param selectors The selectors
   * @param language The language
   * @returns An observable of the texts
   */
  private getMultiText(
    selectors: string[],
    language: Languages
  ): Observable<string[]> {
    let params = new HttpParams().set('language', Languages[language]);
    for (const selector of selectors) {
      params = params.append('selectors', selector);
    }
    return this.dataSource
      .get<ListStringDto>('multi-text', params)
      .pipe(map((dto) => dto.messages));
  }

  /**
   * Get a text for a selector. Uses {@link getText} and the
   * {@link LanguageService} to get the current language. Notifies the TEXTS
   * {@link Preloaders} that a text is loading, as well as when the text is
   * loaded.
   *
   * @param selector The selector
   * @returns An observable of the text
   */
  get(selector: string): Observable<string> {
    const initLoad = of('').pipe(
      ifFirst(() => {
        this.preloaderService.toLoad(Preloaders.TEXTS, 1);
      }),
      skip(1)
    );
    const getTextRes = this.getText(
      selector,
      this.langageService.current()
    ).pipe(
      ifFirst(() => {
        this.preloaderService.loaded(Preloaders.TEXTS, 1);
      }),
      catchError(() => ['error'])
    );
    return concat(initLoad, getTextRes);
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
   * {@link Paragraph} using the {@link ParagraphDecoderService}.
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
    const initLoad = of([]).pipe(
      ifFirst(() => {
        this.preloaderService.toLoad(Preloaders.TEXTS, 1);
      }),
      skip(1)
    );
    const getTextRes = this.getText(
      selector,
      this.langageService.current()
    ).pipe(
      ifFirst(() => {
        this.preloaderService.loaded(Preloaders.TEXTS, 1);
      }),
      catchError(() => ['error']),
      map((s) => this.paragraphDecoderService.decode(s))
    );
    return concat(initLoad, getTextRes);
  }
}
