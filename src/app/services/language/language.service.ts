import { Injectable } from '@angular/core';
import { Languages } from 'src/app/enums/languages';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { PreloaderService } from '../preloader/preloader.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language: Languages = Languages.ENGLISH;
  subscribers: ComponentWithText[] = [];

  constructor(private preloaderService: PreloaderService) {
    if (localStorage.getItem('language') != null) {
      this.language =
        Languages[localStorage.getItem('language') as keyof typeof Languages];
    } else {
      localStorage.setItem('language', Languages[Languages.ENGLISH]);
    }
  }

  current(): Languages {
    return this.language;
  }

  set(language: Languages) {
    this.language = language;
    localStorage.setItem('language', Languages[language]);
    this.subscribers.forEach((s) => {
      s.updateTexts();
    });
  }

  subscribe(s: ComponentWithText) {
    this.subscribers.push(s);
  }

  unsubscribe(s: ComponentWithText) {
    const index = this.subscribers.indexOf(s);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }
}
