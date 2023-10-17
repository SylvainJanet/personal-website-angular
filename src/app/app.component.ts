import { PreloaderService } from './services/preloader/preloader.service';
import { Component, OnInit } from '@angular/core';
import { Preloaders } from './services/preloader/preloaders/preloaders';
import { BackToTopComponent } from './components/common/back-to-top/back-to-top.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './components/common/header/header.component';
import { PageContentComponent } from './components/page-cv/page-content/page-content.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { BannerComponent } from './components/common/banner/banner.component';

/** Main app component. */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    BackToTopComponent,
    MatProgressSpinnerModule,
    HeaderComponent,
    PageContentComponent,
    FooterComponent,
    BackToTopComponent,
    BannerComponent,
  ],
})
export class AppComponent implements OnInit {
  /** Main loader, so that this {@link Preloaders} can be binded to in HTML */
  mainLoader = Preloaders.MAIN;
  /** Text loader, so that this {@link Preloaders} can be binded to in HTML */
  loaderTexts = Preloaders.TEXTS;
  /** Opacity, used to smoothly make the page appear on first load */
  opacity = 0;

  /**
   * Main app component constructor.
   *
   * @param preloader The {@link PreloaderService}
   * @param cd The `ChangeDetectorRef`
   */
  constructor(public preloader: PreloaderService) {
    this.increaseOpacity(0, 40, 10);
  }

  /** Used to set a css variable representing the scroll bar width. */
  ngOnInit() {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth + 'px';
    document.documentElement.style.setProperty(
      '--scroll-bar-width',
      scrollbarWidth
    );
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
      this.opacity = (i + 1) / N;
      if (i < N - 1) {
        this.increaseOpacity(i + 1, N, step);
      }
    }, step);
  }
}
