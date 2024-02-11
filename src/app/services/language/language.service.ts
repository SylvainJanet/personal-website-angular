import { Injectable } from '@angular/core';
import { Languages } from 'src/app/enums/languages';
import { VisibleToLoadTextService } from '../visibletoloadtext/visible-to-load-text.service';
import { PreloaderService } from '../preloader/preloader.service';
import { locales } from 'src/app/enums/locales';

/**
 * Language service. The current language is stored in the client's local
 * storage, and is english by default.
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  /** The current language of the application. */
  language: Languages = Languages.ENGLISH;

  /** Language service. */
  constructor(
    private visibleToLoadTextService: VisibleToLoadTextService,
    private preloaderService: PreloaderService
  ) {
    if (localStorage.getItem('language') != null) {
      this.language =
        Languages[localStorage.getItem('language') as keyof typeof Languages];
    } else {
      localStorage.setItem('language', Languages[Languages.ENGLISH]);
    }
  }

  /**
   * Get the current language
   *
   * @returns The current language
   */
  current(): Languages {
    return this.language;
  }

  /**
   * Set the current language. Notifies every {@link ComponentWithText}
   * subscriber to update their text content.
   *
   * @param language The language
   */
  set(language: Languages) {
    this.language = language;
    localStorage.setItem('language', Languages[language]);
    this.preloaderService.isMainLoad = true;
    this.visibleToLoadTextService.languageChange();
  }

  /**
   * Get the current {@link locales}
   *
   * @returns The current locale
   */
  currentLocale(): string {
    return locales[this.current()];
  }
}
