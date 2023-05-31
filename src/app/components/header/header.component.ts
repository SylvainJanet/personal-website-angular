import { Component, HostListener, OnInit } from '@angular/core';
import { scriptVar } from '../../../scripts/template/tools/setUp';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  trigger: number;
  headerState: string;
  domcomputation: DOMComputationService;

  constructor(domcomputation: DOMComputationService) {
    this.domcomputation = domcomputation;
    this.trigger = 0;
    this.headerState = '';
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.trigger = this.domcomputation.getActualHeight(
      document.getElementsByClassName('banner').item(0)
    );
    this.headerState =
      scrollY > this.trigger
        ? scriptVar.headerStateLight
        : scriptVar.headerStateDark;
    this.updateHeader();
  }

  ngOnInit() {
    this.trigger = this.domcomputation.getActualHeight(
      document.getElementsByClassName('banner').item(0)
    );
    this.headerState =
      scrollY > this.trigger
        ? scriptVar.headerStateLight
        : scriptVar.headerStateDark;
    this.updateHeader();
  }

  /**
   * Changes every element having class oldClass. Replace that class
   * with the class newClass
   * @param {*} oldClass the class to replace
   * @param {*} newClass the new class
   */
  changeEveryClass(oldClass: string, newClass: string) {
    const els = document.querySelectorAll('.' + oldClass);
    for (let i = 0; i < els.length; i++) {
      const el = els.item(i);
      el.classList.remove(oldClass);
      el.classList.add(newClass);
    }
  }

  /**
   * Actual update of the style of the appropriate element according to
   * the state set in headerState.
   */
  updateHeader() {
    if (this.headerState === 'light') {
      this.changeEveryClass(
        scriptVar.cssHeaderDarkClass,
        scriptVar.cssHeaderLightClass
      );
      this.changeEveryClass(
        scriptVar.cssHeaderContentDarkClass,
        scriptVar.cssHeaderContentLightClass
      );
    }
    if (this.headerState === 'dark') {
      this.changeEveryClass(
        scriptVar.cssHeaderLightClass,
        scriptVar.cssHeaderDarkClass
      );
      this.changeEveryClass(
        scriptVar.cssHeaderContentLightClass,
        scriptVar.cssHeaderContentDarkClass
      );
    }
  }

  /**
   * Update the variable headerState with the state of the header
   * depending on the scrollY value.
   * Below a threshold, the header should be dark. Once the scrollY
   * value goes over, the header should be light.
   */
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (scrollY > this.trigger) {
      if (this.headerState == scriptVar.headerStateDark) {
        this.headerState = scriptVar.headerStateLight;
        this.updateHeader();
      }
    }
    if (scrollY <= this.trigger) {
      if (this.headerState == scriptVar.headerStateLight) {
        this.headerState = scriptVar.headerStateDark;
        this.updateHeader();
      }
    }
  }

  language() {
    console.log('This is temporary');
  }
}
