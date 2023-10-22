import { Inject, Injectable } from '@angular/core';
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
import { SelectorSplitParam } from 'src/app/interfaces/SelectorSplitParam';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { IEnvironment } from 'src/environments/interface/ienvironment';

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
    private paragraphDecoderService: ParagraphDecoderService,
    @Inject(ENV) private environment: IEnvironment
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
      ?.get<StringDto>('text', params)
      ?.pipe(map((c) => c.message));
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
      ?.get<ListStringDto>('multi-text', params)
      ?.pipe(map((dto) => dto.messages));
  }

  /**
   * Get a text for a selector. Uses {@link getText} and the
   * {@link LanguageService} to get the current language. Notifies the
   * {@link Preloaders} that a text is loading, as well as when the text is
   * loaded.
   *
   * @param selector The selector
   * @param preloader The preloader to notify
   * @returns An observable of the text
   */
  get(selector: string, preloader = Preloaders.TEXTS): Observable<string> {
    return this.getTextInLanguage(
      selector,
      this.langageService.current(),
      preloader
    );
  }

  /**
   * Formats a string for preloader messages
   *
   * @param s The string
   * @returns The message
   */
  private formateStringToMessage(s: string) {
    return s.length > 10 ? s.slice(0, 10) + '...' : s;
  }

  /**
   * Preloader message on load for getTextInLanguage.
   *
   * @param selector The selector
   * @param language The language
   * @param preloaded The {@link Preloaders}
   * @returns The message
   */
  private getTextInLanguageToLoadMessage(
    selector: string,
    language: Languages,
    preloader = Preloaders.TEXTS
  ): string {
    if (!this.environment.production && this.environment.fullLoadingMessages)
      return (
        'Loading text - ' +
        selector +
        ' - in ' +
        Languages[language] +
        ' - ' +
        preloader
      );
    return 'Loading text...';
  }

  /**
   * Preloader message on loaded for getTextInLanguage.
   *
   * @param text The text
   * @param selector The selector
   * @param language The language
   * @param preloaded The {@link Preloaders}
   * @returns The message
   */
  private getTextInLanguageLoadedMessage(
    text: string,
    selector: string,
    language: Languages,
    preloader = Preloaders.TEXTS
  ): string {
    if (!this.environment.production && this.environment.fullLoadingMessages) {
      const extrait = this.formateStringToMessage(text);
      return (
        'Text Loaded - ' +
        selector +
        ' - in ' +
        Languages[language] +
        ' : ' +
        extrait +
        ' - ' +
        preloader
      );
    }
    return 'Loading text...';
  }

  /** Whether or not the preloader messages should display the preloader total. */
  private getTextInLanguageMessageWithPreloaderTot(): boolean {
    return !this.environment.production && this.environment.fullLoadingMessages;
  }
  /** Whether or not the preloader messages should display the entire total. */
  private getTextInLanguageMessageWithTot(): boolean {
    return !this.environment.production && this.environment.fullLoadingMessages;
  }

  /**
   * Get a text for a selector in a language. Uses {@link getText}. Only useful
   * when then language isn't the language set by the {@link LanguageService}
   * (for that, see {@link get}) Notifies the {@link Preloaders} that a text is
   * loading, as well as when the text is loaded.
   *
   * @param selector The selector
   * @param preloader The preloader to notify
   * @returns An observable of the text
   */
  getTextInLanguage(
    selector: string,
    language: Languages,
    preloader = Preloaders.TEXTS
  ): Observable<string> {
    const initLoad = of('').pipe(
      ifFirst(() => {
        this.preloaderService.toLoad(
          preloader,
          1,
          this.getTextInLanguageToLoadMessage(selector, language, preloader),
          this.getTextInLanguageMessageWithPreloaderTot(),
          this.getTextInLanguageMessageWithTot()
        );
      }),
      skip(1)
    );
    const getTextRes = this.getText(selector, language)?.pipe(
      catchError(() => ['error']),
      ifFirst((text: string) => {
        this.preloaderService.loaded(
          preloader,
          1,
          this.getTextInLanguageLoadedMessage(
            text,
            selector,
            language,
            preloader
          ),
          this.getTextInLanguageMessageWithPreloaderTot(),
          this.getTextInLanguageMessageWithTot()
        );
      })
    );
    return concat(initLoad, getTextRes);
  }

  /**
   * Preloader message on load for getMulti.
   *
   * @param selector The selector
   * @param language The language
   * @param preloaded The {@link Preloaders}
   * @returns The message
   */
  private getMultiToLoadMessage(
    selectors: string[],
    language: Languages,
    preloader = Preloaders.TEXTS
  ): string {
    if (!this.environment.production && this.environment.fullLoadingMessages)
      return (
        'Loading text - ' +
        selectors +
        ' - in ' +
        Languages[language] +
        ' - ' +
        preloader
      );
    return 'Loading text...';
  }

  /**
   * Preloader message on loaded for getTextInLanguage.
   *
   * @param texts The texts
   * @param selector The selector
   * @param language The language
   * @param preloaded The {@link Preloaders}
   * @returns The message
   */
  private getMultiLoadedMessage(
    texts: string[],
    selectors: string[],
    language: Languages,
    preloader = Preloaders.TEXTS
  ): string {
    if (!this.environment.production && this.environment.fullLoadingMessages) {
      const extraits = [];
      for (const text of texts) {
        extraits.push(this.formateStringToMessage(text));
      }

      return (
        'Text Loaded - ' +
        selectors +
        ' - in ' +
        Languages[language] +
        ' : ' +
        extraits +
        ' - ' +
        preloader
      );
    }
    return 'Loading text...';
  }

  /** Whether or not the preloader messages should display the preloader total. */
  private getMultiMessageWithPreloaderTot(): boolean {
    return !this.environment.production && this.environment.fullLoadingMessages;
  }
  /** Whether or not the preloader messages should display the entire total. */
  private getMultiMessageWithTot(): boolean {
    return !this.environment.production && this.environment.fullLoadingMessages;
  }

  /**
   * Get a text for multiple selectors. Uses {@link getMultiText} and the
   * {@link LanguageService} to get the current language. Notifies the
   * {@link Preloaders} that a text is loading, as well as when the text is
   * loaded.
   *
   * @param selectors The selectors
   * @param preloader The preloader to notify
   * @returns An observable of the texts
   */
  getMulti(
    selectors: string[],
    preloader = Preloaders.TEXTS
  ): Observable<string[]> {
    const initLoad = of(['']).pipe(
      ifFirst(() => {
        this.preloaderService.toLoad(
          preloader,
          1,
          this.getMultiToLoadMessage(
            selectors,
            this.langageService.current(),
            preloader
          ),
          this.getMultiMessageWithPreloaderTot(),
          this.getMultiMessageWithTot()
        );
      }),
      skip(1)
    );
    const getTextRes = this.getMultiText(
      selectors,
      this.langageService.current()
    )?.pipe(
      catchError(() => {
        const res: string[] = [];
        selectors.forEach(() => {
          res.push('error');
        });
        return of(res);
      }),
      ifFirst((res: string[]) => {
        this.preloaderService.loaded(
          preloader,
          1,
          this.getMultiLoadedMessage(
            res,
            selectors,
            this.langageService.current(),
            preloader
          ),
          this.getMultiMessageWithPreloaderTot(),
          this.getMultiMessageWithTot()
        );
      })
    );
    return concat(initLoad, getTextRes);
  }

  /**
   * Preloader message on load for getSplit.
   *
   * @param selector The selector
   * @param language The language
   * @param preloaded The {@link Preloaders}
   * @returns The message
   */
  private getSplitToLoadMessage(
    selector: string,
    language: Languages,
    preloader = Preloaders.TEXTS
  ): string {
    if (!this.environment.production && this.environment.fullLoadingMessages)
      return (
        'Loading text - ' +
        selector +
        ' - in ' +
        Languages[language] +
        ' - ' +
        preloader
      );
    return 'Loading text...';
  }

  /**
   * Formats a set of paragraphs for preloader messages
   *
   * @param paragraphs The paragraphs
   * @returns The message
   */
  private formatParagraphsToMessage(paragraphs: Paragraph[]) {
    const extraits = [];
    for (const paragraph of paragraphs) {
      extraits.push(
        paragraph.els[0].content.length > 10
          ? paragraph.els[0].content.slice(0, 10) + '...'
          : paragraph.els.length > 1
          ? paragraph.els[0].content + '...'
          : paragraph.els[0].content
      );
    }
    return extraits;
  }

  /**
   * Preloader message on loaded for getTextInLanguage.
   *
   * @param paragraphs The paragraphs
   * @param selector The selector
   * @param language The language
   * @param preloaded The {@link Preloaders}
   * @returns The message
   */
  private getSplitLoadedMessage(
    paragraphs: Paragraph[],
    selector: string,
    language: Languages,
    preloader = Preloaders.TEXTS
  ): string {
    if (!this.environment.production && this.environment.fullLoadingMessages) {
      const extraits = this.formatParagraphsToMessage(paragraphs);
      return (
        'Text Loaded - ' +
        selector +
        ' - in ' +
        Languages[language] +
        ' : ' +
        extraits +
        ' - ' +
        preloader
      );
    }
    return 'Loading text...';
  }

  /** Whether or not the preloader messages should display the preloader total. */
  private getSplitMessageWithPreloaderTot(): boolean {
    return !this.environment.production && this.environment.fullLoadingMessages;
  }
  /** Whether or not the preloader messages should display the entire total. */
  private getSplitMessageWithTot(): boolean {
    return !this.environment.production && this.environment.fullLoadingMessages;
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
   * @param preloader The preloader to notify
   * @returns An observable of the {@link Paragraph}.
   */
  getSplit(
    selector: string,
    preloader = Preloaders.TEXTS
  ): Observable<Paragraph[]> {
    const initLoad = of([]).pipe(
      ifFirst(() => {
        this.preloaderService.toLoad(
          preloader,
          1,
          this.getSplitToLoadMessage(
            selector,
            this.langageService.current(),
            preloader
          ),
          this.getSplitMessageWithPreloaderTot(),
          this.getSplitMessageWithTot()
        );
      }),
      skip(1)
    );
    // let decoded: Paragraph[];
    const getTextRes = this.getText(
      selector,
      this.langageService.current()
    )?.pipe(
      catchError(() => ['error']),
      ifFirst((s: string) => {
        // decoded =
        this.preloaderService.loaded(
          preloader,
          1,
          this.getSplitLoadedMessage(
            this.paragraphDecoderService.decode(s),
            selector,
            this.langageService.current(),
            preloader
          ),
          this.getSplitMessageWithPreloaderTot(),
          this.getSplitMessageWithTot()
        );
      }),
      map((s) => this.paragraphDecoderService.decode(s))
    );
    return concat(initLoad, getTextRes);
  }

  /**
   * Preloader message on load for getMultiAllSplot.
   *
   * @param selector The selector
   * @param language The language
   * @param preloaded The {@link Preloaders}
   * @returns The message
   */
  private getMultiAllSplitToLoadMessage(
    selectors: string[],
    language: Languages,
    preloader = Preloaders.TEXTS
  ): string {
    if (!this.environment.production && this.environment.fullLoadingMessages)
      return (
        'Loading text - ' +
        selectors +
        ' - in ' +
        Languages[language] +
        ' - ' +
        preloader
      );
    return 'Loading text...';
  }

  /**
   * Preloader message on loaded for getTextInLanguage.
   *
   * @param paragraphsSet The paragraphs
   * @param selectors The selector
   * @param language The language
   * @param preloaded The {@link Preloaders}
   * @returns The message
   */
  private getMultiAllSplitLoadedMessage(
    paragraphsSet: Paragraph[][],
    selectors: string[],
    language: Languages,
    preloader = Preloaders.TEXTS
  ): string {
    if (!this.environment.production && this.environment.fullLoadingMessages) {
      const extraits = [];
      for (const paragraphs of paragraphsSet) {
        const extraitPar = this.formatParagraphsToMessage(paragraphs);
        extraits.push(extraitPar);
      }

      return (
        'Text Loaded - ' +
        selectors +
        ' - in ' +
        Languages[language] +
        ' : ' +
        extraits +
        ' - ' +
        preloader
      );
    }
    return 'Loading text...';
  }

  /** Whether or not the preloader messages should display the preloader total. */
  private getMultiAllSplitMessageWithPreloaderTot(): boolean {
    return !this.environment.production && this.environment.fullLoadingMessages;
  }
  /** Whether or not the preloader messages should display the entire total. */
  private getMultiAllSplitMessageWithTot(): boolean {
    return !this.environment.production && this.environment.fullLoadingMessages;
  }
  /**
   * Get strings for multiple selectors, but splits the result to get an array
   * of {@link Paragraph} using the {@link ParagraphDecoderService}.
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
   * @param selectors The selectors
   * @param preloader The preloader to notify
   * @returns An observable of the {@link Paragraph}.
   */
  getMultiAllSplit(
    selectors: string[],
    preloader = Preloaders.TEXTS
  ): Observable<Paragraph[][]> {
    const initLoad = of([[]]).pipe(
      ifFirst(() => {
        this.preloaderService.toLoad(
          preloader,
          1,
          this.getMultiAllSplitToLoadMessage(
            selectors,
            this.langageService.current(),
            preloader
          ),
          this.getMultiAllSplitMessageWithPreloaderTot(),
          this.getMultiAllSplitMessageWithTot()
        );
      }),
      skip(1)
    );
    const res: Paragraph[][] = [];
    const getTextRes = this.getMultiText(
      selectors,
      this.langageService.current()
    )?.pipe(
      catchError(() => {
        const res: string[] = [];
        selectors.forEach(() => {
          res.push('error');
        });
        return [res];
      }),
      ifFirst((s: string[]) => {
        s.forEach((t) => {
          res.push(this.paragraphDecoderService.decode(t));
        });
        this.preloaderService.loaded(
          preloader,
          1,
          this.getMultiAllSplitLoadedMessage(
            res,
            selectors,
            this.langageService.current(),
            preloader
          ),
          this.getMultiAllSplitMessageWithPreloaderTot(),
          this.getMultiAllSplitMessageWithTot()
        );
      }),
      map(() => {
        return res;
      })
    );
    return concat(initLoad, getTextRes);
  }

  /**
   * Preloader message on load for getMultiSomeBoolean.
   *
   * @param selector The selector
   * @param language The language
   * @param preloaded The {@link Preloaders}
   * @returns The message
   */
  private getMultiSomeBooleanSplitToLoadMessage(
    selectors: string[],
    language: Languages,
    preloader = Preloaders.TEXTS
  ): string {
    if (!this.environment.production && this.environment.fullLoadingMessages)
      return (
        'Loading text - ' +
        selectors +
        ' - in ' +
        Languages[language] +
        ' - ' +
        preloader
      );
    return 'Loading text...';
  }

  /**
   * Formats a set of paragraphs and strings for preloader messages
   *
   * @param resultSet The set of paragraphs and strings
   * @returns The message
   */
  private formateParagraphStringToMessage(resultSet: (Paragraph[] | string)[]) {
    const extraits = [];
    for (const result of resultSet) {
      if (typeof result === 'string') {
        extraits.push(this.formateStringToMessage(result));
      } else {
        const extraitsPar = this.formatParagraphsToMessage(result);
        extraits.push(extraitsPar);
      }
    }
    return extraits;
  }

  /**
   * Preloader message on loaded for getTextInLanguage.
   *
   * @param resultSet The paragraphs
   * @param selectors The selector
   * @param language The language
   * @param preloaded The {@link Preloaders}
   * @returns The message
   */
  private getMultiSomeBooleanSplitLoadedMessage(
    resultSet: (Paragraph[] | string)[],
    selectors: string[],
    language: Languages,
    preloader = Preloaders.TEXTS
  ): string {
    if (!this.environment.production && this.environment.fullLoadingMessages) {
      const extraits = this.formateParagraphStringToMessage(resultSet);
      return (
        'Text Loaded - ' +
        selectors +
        ' - in ' +
        Languages[language] +
        ' : ' +
        extraits +
        ' - ' +
        preloader
      );
    }
    return 'Loading text...';
  }

  /** Whether or not the preloader messages should display the preloader total. */
  private getMultiSomeBooleanSplitMessageWithPreloaderTot(): boolean {
    return !this.environment.production && this.environment.fullLoadingMessages;
  }
  /** Whether or not the preloader messages should display the entire total. */
  private getMultiSomeBooleanSplitMessageWithTot(): boolean {
    return !this.environment.production && this.environment.fullLoadingMessages;
  }

  /**
   * Get strings for multiple selectors, but splits the result for some of them
   * to get an array of {@link Paragraph} using the
   * {@link ParagraphDecoderService}.
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
   * @param selectors The selectors
   * @param preloader The preloader to notify
   * @returns An observable of the {@link Paragraph}.
   */
  private getMultiSomeBooleanSplit(
    selectors: string[],
    isSplit: boolean[],
    preloader = Preloaders.TEXTS
  ): Observable<(Paragraph[] | string)[]> {
    if (selectors.length != isSplit.length) {
      throw new Error(
        'Invalid parameters for getMultiSomeBooleanSplit - arrays should be of the same length'
      );
    }
    const initLoad = of(['']).pipe(
      ifFirst(() => {
        this.preloaderService.toLoad(
          preloader,
          1,
          this.getMultiSomeBooleanSplitToLoadMessage(
            selectors,
            this.langageService.current(),
            preloader
          ),
          this.getMultiSomeBooleanSplitMessageWithPreloaderTot(),
          this.getMultiSomeBooleanSplitMessageWithTot()
        );
      }),
      skip(1)
    );
    const getTextRes = this.getMultiText(
      selectors,
      this.langageService.current()
    )?.pipe(
      catchError(() => {
        const res: string[] = [];
        selectors.forEach(() => {
          res.push('error');
        });
        return [res];
      }),
      ifFirst((res: (Paragraph[] | string)[]) => {
        this.preloaderService.loaded(
          preloader,
          1,
          this.getMultiSomeBooleanSplitLoadedMessage(
            res,
            selectors,
            this.langageService.current(),
            preloader
          ),
          this.getMultiSomeBooleanSplitMessageWithPreloaderTot(),
          this.getMultiSomeBooleanSplitMessageWithTot()
        );
      }),
      map((output) => {
        const res: (Paragraph[] | string)[] = [];
        output.forEach((s, i) => {
          if (isSplit[i]) {
            res.push(this.paragraphDecoderService.decode(s));
          } else {
            res.push(s);
          }
        });
        return res;
      })
    );
    return concat(initLoad, getTextRes);
  }

  /**
   * Get strings for multiple selectors, but splits the result for some of them
   * to get an array of {@link Paragraph} using the
   * {@link ParagraphDecoderService}. Uses {@link getMultiSomeBooleanSplit}
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
   * @param selectors The selectors
   * @param preloader The preloader to notify
   * @returns An observable of the {@link Paragraph}.
   */
  getMultiSomeSplit(
    selectorsSplits: SelectorSplitParam[],
    preloader = Preloaders.TEXTS
  ): Observable<(Paragraph[] | string)[]> {
    const selectors: string[] = [];
    const isSplit: boolean[] = [];

    selectorsSplits.forEach((ss) => {
      selectors.push(ss.selector);
      isSplit.push(ss.isSplit);
    });

    return this.getMultiSomeBooleanSplit(selectors, isSplit, preloader);
  }
}
