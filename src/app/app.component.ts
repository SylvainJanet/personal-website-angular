import { environment } from './../environments/environment';
import {
  PreloaderService,
  Preloaders,
} from './services/preloader/preloader.service';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
  mainLoader = Preloaders.MAIN;
  loaderTexts = Preloaders.TEXTS;
  env = environment;
  opacity = 0;

  constructor(
    public preloader: PreloaderService,
    private cd: ChangeDetectorRef
  ) {
    this.increaseOpacity(0, 10, 10);
  }

  ngAfterViewInit() {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth + 'px';
    document.documentElement.style.setProperty(
      '--scroll-bar-width',
      scrollbarWidth
    );
    this.cd.detectChanges();
  }
  ngAfterViewChecked() {
    this.cd.detectChanges();
  }
  /**
   * Increases opacity of the page from 0 to 1 in N steps at a certain speed.
   *
   * @param {any} i Current step. Starts at 0
   * @param {any} N Max number of step
   * @param {any} step Duration of a step in millisecond
   */
  increaseOpacity(i: number, N: number, step: number) {
    setTimeout(() => {
      this.opacity = i / (N - 1);
      if (i < N - 1) {
        this.increaseOpacity(i + 1, N, step);
      }
    }, step);
  }
}
