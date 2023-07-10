import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { LogService } from 'src/app/services/log/log.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { environment } from 'src/environments/environment';
import { scriptVar } from 'src/scripts/template/tools/setUp';
import { debounce } from 'src/scripts/tools/debounce/debounce';
import { Paragraph } from '../../classes/paragraph/paragraph';

/** Component used to display About Me information. */
@Component({
  selector: 'app-cv-about-me',
  templateUrl: './cv-about-me.component.html',
  styleUrls: ['./cv-about-me.component.css'],
})
export class CvAboutMeComponent
  implements AfterViewInit, ComponentWithText, OnDestroy
{
  /**
   * Width of the bar underneath the title. It will be animated when the bar
   * enter/exits the client's view.
   */
  width = '0';
  /** Minimal scroll value to have the bar in view */
  posElementMin = 0;
  /** Maximal scroll value to have the bar in view */
  posElementMax = 0;
  /** Environment. See {@link environment} */
  env = environment;
  /** Logger. See {@link LogService} */
  logger: LogService;
  /** About me title */
  aboutMe = of('');
  /** Link to CV (is dependent on the current language) */
  linkToCv = '';
  /**
   * Array of {@link Paragraph} used to display the content of the about me
   * section. Will be retrieved by the {@link TextService}.
   */
  paragraphs: Paragraph[] = [];

  /**
   * About me component constructor
   *
   * @param preloader The {@link PreloaderService}
   * @param element The `ElementRef`
   * @param logService The {@link LogService}
   * @param languageService The {@link LanguageService}
   * @param textService The {@link TextService}
   */
  constructor(
    private preloader: PreloaderService,
    private element: ElementRef,
    logService: LogService,
    private languageService: LanguageService,
    private textService: TextService
  ) {
    this.logger = logService.withClassName('CvAboutMeComponent');
    this.languageService.subscribe(this);
    this.updateTexts();
  }

  /**
   * Update the component's texts when the language is updated. See
   * {@link LanguageService}. The subscriber design pattern is used and this
   * function is used when the service notifies its subscribers to update the
   * text contents after a language change. Uses {@link TextService} to get those
   * contents from the database.
   */
  updateTexts(): void {
    this.aboutMe = this.textService.get('about-me-title');
    this.textService.get('cv-file-name').subscribe({
      next: (name) => {
        this.linkToCv = 'pdf/' + name;
        this.textService.getSplit('about-me-content').subscribe({
          next: (r) => {
            this.paragraphs = r;
            this.paragraphs.splice(1, 0, new Paragraph([]));
            this.paragraphs.forEach((p) => (p.cssClass = 'lead'));
            this.paragraphs[6].els[1].assetHref = this.linkToCv;
          },
        });
      },
    });
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
   * Computes the position precise position of the element in the page so that
   * the animation triggers exactly as the bar enters or leaves the viewport.
   */
  getElPos() {
    const posViewPort =
      this.element.nativeElement.firstElementChild.firstElementChild.firstElementChild.getBoundingClientRect()
        .y +
      this.element.nativeElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getBoundingClientRect()
        .height;
    const viewPortOffset = scrollY;
    const viewPortHeight = window.innerHeight;
    this.posElementMax = posViewPort + viewPortOffset;
    this.posElementMin = this.posElementMax - viewPortHeight;
    this.posElementMax -= parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue(scriptVar.cssHeaderHeight)
        .split('px')[0]
    );
    this.posElementMax +=
      this.element.nativeElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.getBoundingClientRect().height;
  }

  /**
   * Checks if the width has to be changed (and thus, the animation started) and
   * do the change if it is the case.
   */
  updateWidth() {
    if (scrollY < this.posElementMin || scrollY > this.posElementMax) {
      this.width = '0';
    } else {
      this.width = '75%';
    }
  }

  /**
   * Update the trigger when the window is resized. Indeed, the bar position
   * will change since it is tied to viewport height. Uses the {@link debounce}
   * annotation to avoid firing this too much : resize events fire a lot during
   * resizing. Calls {@link updateAfterLoaded} which does the actual update once
   * everything is loaded.
   */
  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.updateAfterLoaded();
  }

  /**
   * Update the trigger when client scrolls. Uses the {@link debounce} annotation
   * to avoid firing this too much : resize events fire a lot during resizing.
   * Calls {@link updateAfterLoaded} which does the actual update once everything
   * is loaded.
   */
  @HostListener('window:scroll', ['$event'])
  @debounce()
  onScroll() {
    this.updateAfterLoaded();
  }

  /**
   * Does the actual update of the scroll trigger amount and the possible width
   * modification (to create the animation) once all assets are loaded.
   */
  updateAfterLoaded() {
    this.preloader.statusAnyLoading.subscribe({
      next: (isAnyLoading) => {
        if (isAnyLoading != null && !isAnyLoading) {
          setTimeout(() => {
            this.getElPos();
            this.updateWidth();
          });
        }
      },
    });
  }

  /**
   * After the view is initialized, the trigger has to be updated and the
   * animation may trigger as a results. This may happen if the client loads the
   * page already scrolled down.
   */
  ngAfterViewInit(): void {
    this.updateAfterLoaded();
  }
}
