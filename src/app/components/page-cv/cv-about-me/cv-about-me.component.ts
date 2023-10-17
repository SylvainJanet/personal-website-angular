import {
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { LogService } from 'src/app/services/log/log.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { scriptVar } from 'src/scripts/template/tools/setUp';
import { debounce } from 'src/scripts/tools/debounce/debounce';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { CommonModule } from '@angular/common';
import { TextParagraphSetComponent } from '../../utilities/text-paragraph-set/text-paragraph-set.component';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/** Component used to display About Me information. */
@Component({
  selector: 'app-cv-about-me',
  templateUrl: './cv-about-me.component.html',
  styleUrls: ['./cv-about-me.component.css'],
  standalone: true,
  imports: [CommonModule, TextParagraphSetComponent, MatProgressSpinnerModule],
})
export class CvAboutMeComponent
  implements ComponentWithText, OnDestroy, OnChanges
{
  /** The main div element of the component. */
  @ViewChild('mainDiv') mainDiv!: ElementRef<HTMLElement>;
  /**
   * Width of the bar underneath the title. It will be animated when the bar
   * enter/exits the client's view.
   */
  width = '0';
  /** Minimal scroll value to have the bar in view */
  posElementMin = 0;
  /** Maximal scroll value to have the bar in view */
  posElementMax = 0;
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
  /** Preloader for texts. */
  loaderTexts = Preloaders.TEXTS;

  /**
   * About me component constructor
   *
   * @param preloader The {@link PreloaderService}
   * @param element The `ElementRef`
   * @param logService The {@link LogService}
   * @param languageService The {@link LanguageService}
   * @param textService The {@link TextService}
   * @param visibleToLoadTextService The {@link VisibleToLoadTextService}
   */
  constructor(
    public preloader: PreloaderService,
    private element: ElementRef,
    logService: LogService,
    private textService: TextService,
    public visibleToLoadTextService: VisibleToLoadTextService
  ) {
    this.logger = logService.withClassName('CvAboutMeComponent');
    this.visibleToLoadTextService.subscribe(this);
  }

  /**
   * If the input changes, the position has to be computed again and the width
   * has to be updated again.
   */
  ngOnChanges() {
    this.getElPos();
    this.updateWidth();
  }

  /**
   * Update the component's texts when the language is updated. See
   * {@link VisibleToLoadTextService}. The subscriber design pattern is used and
   * this function is used when the service notifies its subscribers to update
   * the text contents after a language change. Uses {@link TextService} to get
   * those contents from the database.
   */
  updateTexts(): void {
    this.textService
      .getMultiSomeSplit([
        { selector: 'about-me-title', isSplit: false },
        { selector: 'cv-file-name', isSplit: false },
        { selector: 'about-me-content', isSplit: true },
      ])
      .subscribe((r) => {
        this.aboutMe = of(r[0] as string);
        this.linkToCv = 'pdf/' + (r[1] as string);

        this.paragraphs = r[2] as Paragraph[];
        this.paragraphs.splice(1, 0, new Paragraph([]));
        this.paragraphs.forEach((p) => (p.cssClass = 'lead'));
        this.paragraphs[6].els[1].assetHref = this.linkToCv;

        this.visibleToLoadTextService.textLoaded(this);
      });
  }

  /**
   * On destroy, the component has to be unsubscribed rom the
   * {@link VisibleToLoadTextService} to avoid having the service try to notify a
   * destroyed subscriber.
   */
  ngOnDestroy(): void {
    this.visibleToLoadTextService.unsubscribe(this);
  }

  /**
   * Computes the position precise position of the element in the page so that
   * the animation triggers exactly as the bar enters or leaves the viewport.
   */
  getElPos() {
    if (
      this.element.nativeElement.firstElementChild.tagName ==
      'MAT-PROGRESS-SPINNER'
    ) {
      return;
    }
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
          this.getElPos();
          this.updateWidth();
        }
      },
    });
  }

  /**
   * Get the main component element.
   *
   * @returns The element.
   */
  getElement(): ElementRef<HTMLElement> {
    return this.mainDiv;
  }
}
