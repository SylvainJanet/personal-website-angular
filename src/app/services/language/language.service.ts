import { Injectable } from '@angular/core';
import { Languages } from 'src/app/enums/languages';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { PreloaderService, Preloaders } from '../preloader/preloader.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language: Languages = Languages.ENGLISH;
  subscribers: ComponentWithText[] = [];
  nbrs: Map<ComponentWithText, number> = new Map<ComponentWithText, number>();

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
      this.preloaderService.toLoad(Preloaders.TEXTS, this.nbrs.get(s) ?? 0);
      s.updateTexts();
    });
  }

  subscribe(s: ComponentWithText, numberOfTexts: number) {
    this.subscribers.push(s);
    this.preloaderService.toLoad(Preloaders.TEXTS, numberOfTexts);
    this.nbrs.set(s, numberOfTexts);
  }

  unsubscribe(s: ComponentWithText) {
    const index = this.subscribers.indexOf(s);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }
}
