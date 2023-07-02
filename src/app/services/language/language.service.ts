import { Injectable } from '@angular/core';
import { Languages } from 'src/app/enums/languages';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';

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
  /**
   * Uses the Observer design pattern to notify every components implementing
   * {@link ComponentWithText} that has text to update the text content when the
   * language of the app is changed.
   */
  subscribers: ComponentWithText[] = [];

  /** Language service. */
  constructor() {
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
    this.subscribers.forEach((s) => {
      s.updateTexts();
    });
  }

  /**
   * Let a {@link ComponentWithText} subscribe to this observer to be notified of
   * a language change.
   *
   * @param s The {@link ComponentWithText}
   */
  subscribe(s: ComponentWithText) {
    this.subscribers.push(s);
  }

  /**
   * Let a {@link ComponentWithText} unsubscribe to this observer.
   *
   * @param s The {@link ComponentWithText}
   */
  unsubscribe(s: ComponentWithText) {
    const index = this.subscribers.indexOf(s);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }
}
