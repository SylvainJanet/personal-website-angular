import { Component, HostListener, OnInit } from '@angular/core';
import { scriptVar } from '../../../../scripts/template/tools/setUp';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';
import { debounce } from 'src/scripts/tools/debounce';
import { TestService } from 'src/app/services/db/test/test.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  trigger: number;
  headerState: string;
  domcomputation: DOMComputationService;
  logger: LogService;

  constructor(
    domcomputation: DOMComputationService,
    logService: LogService,
    private testService: TestService,
    private httpClient: HttpClient
  ) {
    this.domcomputation = domcomputation;
    this.trigger = 0;
    this.headerState = '';
    this.logger = logService.withClassName('HeaderComponent');
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.updateTrigger();
  }

  ngOnInit() {
    this.updateTrigger();
  }

  updateTrigger() {
    this.trigger = this.domcomputation.getActualHeight(
      document.getElementsByClassName('banner').item(0)
    );
    const oldHeaderState = this.headerState;
    this.headerState =
      scrollY > this.trigger
        ? scriptVar.headerStateLight
        : scriptVar.headerStateDark;
    if (oldHeaderState != this.headerState) {
      this.logger.debug('Update trigger for dark/light header');
      this.updateHeader();
    }
  }

  /**
   * Changes every element having class oldClass. Replace that class
   * with the class newClass
   * @param {*} oldClass the class to replace
   * @param {*} newClass the new class
   */
  changeEveryClass(oldClass: string, newClass: string) {
    this.logger.debug('Change every class', oldClass, 'to', newClass);
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
    this.logger.debug('Update header');
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
  @debounce()
  onScroll() {
    if (scrollY > this.trigger) {
      if (this.headerState == scriptVar.headerStateDark) {
        this.logger.debug('Scroll check');
        this.headerState = scriptVar.headerStateLight;
        this.updateHeader();
      }
    }
    if (scrollY <= this.trigger) {
      if (this.headerState == scriptVar.headerStateLight) {
        this.logger.debug('Scroll check');
        this.headerState = scriptVar.headerStateDark;
        this.updateHeader();
      }
    }
  }

  language() {
    const params = new HttpParams().set(
      'content',
      'This content was set from the front end'
    );

    this.httpClient
      .put('http://localhost:8080/add-message', null, {
        params: params,
        responseType: 'text',
      })
      .subscribe({
        next: (m) => {
          console.log(m);
        },
        error: (e) => {
          console.log(e);
        },
      });

    this.httpClient
      .get('http://localhost:8080/hello', {
        responseType: 'text',
      })
      .subscribe({
        next: (m) => {
          console.log(m);
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
}
