import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css'],
})
export class BackToTopComponent implements OnInit {
  trigger = 100;
  iconOpacity = '0';
  iconPointerEvent = 'none';
  backToTopState =
    scrollY > this.trigger
      ? scriptVar.backToTopVisibleState
      : scriptVar.backToTopInvisibleState;

  ngOnInit() {
    this.updateBackToTop();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (scrollY > this.trigger) {
      if (this.backToTopState == scriptVar.backToTopInvisibleState) {
        this.backToTopState = scriptVar.backToTopVisibleState;
        this.updateBackToTop();
      }
    }
    if (scrollY <= this.trigger) {
      if (this.backToTopState == scriptVar.backToTopVisibleState) {
        this.backToTopState = scriptVar.backToTopInvisibleState;
        this.updateBackToTop();
      }
    }
  }

  onClick() {
    document.querySelector('html')?.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  }

  /**
   * Actual update of the style of the elements according to
   * the state set in backToTopState.
   */
  updateBackToTop() {
    if (this.backToTopState === scriptVar.backToTopInvisibleState) {
      this.iconOpacity = '0';
      this.iconPointerEvent = 'none';
    }
    if (this.backToTopState === scriptVar.backToTopVisibleState) {
      this.iconOpacity = '1';
      this.iconPointerEvent = 'all';
    }
  }
}

const scriptVar = {
  refreshLanguageDuration: 0.15,
  refreshLanguageStep: 10,
  localStorageLanguage: 'language', // value should be valid lang attribut for html
  idButtonChangeLanguage: 'buttonLanguage',
  idSubMenuButtonChangeLanguage: 'subMenuLg',
  localStorageLogging: 'logging',
  animationTextTypingSpeed: 80,
  animationTextDeletionSpeed: 30,
  animationTextDeleteDelay: 1100,
  animationTextBlinkWidth: '2px',
  animationTextBlinkClass: 'blink',
  cssBannerHeight: '--banner-height',
  headerStateLight: 'light',
  headerStateDark: 'dark',
  cssHeaderDarkClass: 'dark-header',
  cssHeaderLightClass: 'light-header',
  cssHeaderContentDarkClass: 'dark-header-content',
  cssHeaderContentLightClass: 'light-header-content',
  cssLineOnHoverClass: 'line-on-hover',
  cssBackToTopClass: 'back-to-top',
  backToTopVisibleState: 'visible',
  backToTopInvisibleState: 'invisible',
};
