import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { scriptVar } from '../../../../scripts/template/tools/setUp';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';
import { debounce } from 'src/scripts/tools/debounce';
import { Observable, of } from 'rxjs';
import { TextService } from 'src/app/services/db/text/text.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { Languages } from 'src/app/enums/languages';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';

/**
 * Header component, displaying either a link back home to the left and a button
 * to change language to the right when the screen width is enough, or a link
 * back home to the left and an icon with a drop down menu on the right. The
 * header also changes color once the client has scrolled passed the header.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, ComponentWithText, OnDestroy {
  /**
   * Scroll trigger value for header to change color.
   *
   * Defined to be the height of banner. This way
   */
  trigger: number;
  /**
   * The state of the header, based on the scroll amount compared with the
   * triger
   */
  headerState: string;
  /** Logger. See {@link LogService} */
  logger: LogService;
  /** Name used as text for the link back the the home page */
  myName: Observable<string> = of('');
  /** Text containing the other language on the button used to switch language. */
  otherLanguage: Observable<string> = of('');

  /**
   * Header component constructor.
   *
   * @param domcomputation The {@link DOMComputationService}
   * @param logService The {@link LogService}
   * @param textService The {@link TextService}
   * @param languageService The {@link LanguageService}
   */
  constructor(
    private domcomputation: DOMComputationService,
    logService: LogService,
    private textService: TextService,
    private languageService: LanguageService
  ) {
    this.trigger = 0;
    this.headerState = '';
    this.logger = logService.withClassName(this.constructor.name);
    this.languageService.subscribe(this);
    this.updateTexts();
  }

  /**
   * On destroy, the component has to be unsubscribed rom the
   * {@link LanguageService} to avoid having the service try to notify a
   * destroyed subscriber.
   */
  ngOnDestroy(): void {
    this.languageService.unsubscribe(this);
  }

  /**
   * Update the component's texts when the language is updated. See
   * {@link LanguageService}. The subscriber design pattern is used and this
   * function is used when the service notifies its subscribers to update the
   * text contents after a language change. Uses {@link TextService} to get those
   * contents from the database.
   */
  updateTexts(): void {
    this.myName = this.textService.get('sylvain-janet');
    this.otherLanguage = this.textService.getOtherLanguage();
  }

  /**
   * Update the trigger when the window is resized. Indeed, the banner height
   * will change since it is tied to viewport height. Uses the {@link debounce}
   * annotation to avoid firing this too much : resize events fire a lot during
   * resizing.
   */
  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.updateTrigger();
  }

  /**
   * On init, the trigger has to be updated and the state has to be checked
   * because the client could be loading the page already scolled.
   */
  ngOnInit() {
    this.updateTrigger();
  }

  /**
   * Updates the trigger for the state change, as well as checks if the state
   * changes. In that case, calls the method {@link updateHeader} responsible for
   * making the actual changes
   */
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
   * Changes every element having class oldClass. Replace that class with the
   * class newClass
   *
   * @param {any} oldClass The class to replace
   * @param {any} newClass The new class
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
   * Actual update of the style of the appropriate element according to the
   * state set in headerState.
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
   * Update the variable headerState with the state of the header depending on
   * the scrollY value. Below a threshold, the header should be dark. Once the
   * scrollY value goes over, the header should be light.
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

  /**
   * Method called on click of the language change button. Switches the language
   * from English to French.
   */
  languageChange() {
    if (this.languageService.current() == Languages.ENGLISH) {
      this.languageService.set(Languages.FRENCH);
    } else {
      this.languageService.set(Languages.ENGLISH);
    }
  }
}
