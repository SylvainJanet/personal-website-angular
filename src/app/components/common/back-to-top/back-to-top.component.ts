import { Component, HostListener, OnInit } from '@angular/core';
import { scriptVar } from 'src/scripts/template/tools/setUp';

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
