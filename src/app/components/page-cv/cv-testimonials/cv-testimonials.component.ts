import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { CvTestimonialComponent } from '../cv-testimonial/cv-testimonial.component';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { timeInterval } from 'rxjs';

/**
 * Component used to display several user testimonials, using the
 * {@link CvTestimonialComponent}.
 */
@Component({
  selector: 'app-cv-testimonials',
  templateUrl: './cv-testimonials.component.html',
  styleUrls: ['./cv-testimonials.component.css'],
  imports: [CommonModule, ImgLoadDirective, CvTestimonialComponent],
  standalone: true,
})
export class CvTestimonialsComponent implements ComponentWithText, OnDestroy {
  /** The main div element of the component. */
  @ViewChild('mainDiv') mainDiv!: ElementRef<HTMLElement>;
  /**
   * Display style of the image double (see html for explanation as to why it
   * exists)
   */
  doubleImgDisplay = 'block';
  /** {@link Preloaders} used for the footer image. */
  preloaders = [Preloaders.MAIN];

  /**
   * Boolean used to keep track of user interaction with the component. This is
   * to prevent testimonial from scrolling automatically, as it is the default
   * behaviour when the user isn't interacting with the component.
   */
  interacted = false;
  /**
   * Boolean used to keep tract of whether or not the component is waiting for
   * the user not to interact with the component anymore so that it can resumte
   * the automatic scrolling.
   */
  isWaitingForNoInteraction = false;

  /** The selectors for the names of the clients. */
  namesSelectors = [
    'testimonial-0-name',
    'testimonial-1-name',
    'testimonial-2-name',
    'testimonial-3-name',
    'testimonial-4-name',
    'testimonial-5-name',
    'testimonial-6-name',
    'testimonial-7-name',
    'testimonial-8-name',
    'testimonial-9-name',
  ];
  /**
   * The actual names, retrieved from the database. Used to prevent the app from
   * requestion the same information multiple times.
   */
  actualNames: string[] = ['', '', '', '', '', '', '', '', '', ''];
  /** The selectors for the comments left. */
  commentsSelectors = [
    'testimonial-0-comment',
    'testimonial-1-comment',
    'testimonial-2-comment',
    'testimonial-3-comment',
    'testimonial-4-comment',
    'testimonial-5-comment',
    'testimonial-6-comment',
    'testimonial-7-comment',
    'testimonial-8-comment',
    'testimonial-9-comment',
  ];
  /**
   * The actual comments, retrieved from the database. Used to prevent the app
   * from requestion the same information multiple times.
   */
  actualComments: string[] = ['', '', '', '', '', '', '', '', '', ''];
  /** The grades left by the clients, in order. */
  grades = [4.67, 5, 5, 5, 4.67, 4.67, 5, 5, 5, 5];
  /** The dates of the testimonials, in order. */
  dates = [
    new Date(2022, 0, 12),
    new Date(2022, 10, 25),
    new Date(2022, 4, 6),
    new Date(2022, 10, 4),
    new Date(2022, 2, 11),
    new Date(2022, 5, 10),
    new Date(2022, 10, 25),
    new Date(2022, 5, 1),
    new Date(2022, 10, 4),
    new Date(2022, 5, 9),
  ];
  /** The selectors for the courses names. */
  coursesSelectors = [
    'testimonial-0-course',
    'testimonial-1-course',
    'testimonial-2-course',
    'testimonial-3-course',
    'testimonial-4-course',
    'testimonial-5-course',
    'testimonial-6-course',
    'testimonial-7-course',
    'testimonial-8-course',
    'testimonial-9-course',
  ];
  /**
   * The actual courses names, retrieved from the database. Used to prevent the
   * app from requestion the same information multiple times.
   */
  actualCourses: string[] = ['', '', '', '', '', '', '', '', '', ''];

  /**
   * Array used to keep track of the indices that have already been retrived
   * from the backend. Used to avoid to retrive them again. This will be reset
   * when the language is changed.
   */
  indexQueried: number[] = [];

  /** The index of the current testimonial being displayed. */
  currentIndex = 0;
  /** Number of testimonials. */
  nbrOfTestimonials = 10;

  /** Name of the displayed client. */
  name = '';
  /** Displayed comment. */
  comment = '';
  /** Displayed grade. */
  grade = 5;
  /** Displayed date. */
  date = new Date();
  /** Displayed course. */
  course = '';

  /** Current opacity. */
  opacity = 1;

  /**
   * Interval used to change automatically the displayed testimonial. This is
   * used to clear the interval when the component is destroyed to avoid memory
   * leaks.
   */
  goTroughInterval;

  /**
   * Constructor.
   *
   * @param textService The {@link TextService}
   * @param visibleToLoadTextService The {@link VisibleToLoadTextService}
   * @param preloader The {@link PreloaderService}
   */
  constructor(
    private textService: TextService,
    public visibleToLoadTextService: VisibleToLoadTextService,
    public preloader: PreloaderService
  ) {
    setTimeout(() => {
      this.visibleToLoadTextService.subscribe(this);
    }, 0);
    this.goTroughInterval = setInterval(() => {
      if (!this.interacted && !this.isWaitingForNoInteraction) {
        this.next();
        return;
      }
      if (this.interacted) {
        this.interacted = false;
        this.isWaitingForNoInteraction = true;
        return;
      }
      if (!this.interacted && this.isWaitingForNoInteraction) {
        this.isWaitingForNoInteraction = false;
      }
    }, 7500);
  }

  /**
   * When the image double loads, it should no longer be displayed. See html for
   * explanation as to why this behaviour exists
   */
  onDoubleImgLoad() {
    this.doubleImgDisplay = 'none';
  }

  /** When the user clicks on the next button. */
  onClickNext() {
    this.interacted = true;
    this.next();
  }

  /** Go to the next slide. */
  next() {
    if (this.currentIndex == this.nbrOfTestimonials - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.onSlideChange();
  }

  /** When the user clicks on the previous button. */
  onClickPrev() {
    this.interacted = true;
    this.prev();
  }

  /** Go to the previous shouldslide. */
  prev() {
    if (this.currentIndex == 0) {
      this.currentIndex = this.nbrOfTestimonials - 1;
    } else {
      this.currentIndex--;
    }
    this.onSlideChange();
  }

  /**
   * When the current slide has changed, refreshes the slide. Looks if the index
   * has been querried before. If so, just retrieve the previously querried
   * texts. If not, querry the texts.
   */
  onSlideChange() {
    this.opacity = 0;
    if (this.indexQueried.includes(this.currentIndex)) {
      const indexToQuery = this.currentIndex;
      setTimeout(() => {
        this.name = this.actualNames[indexToQuery];
        this.comment = this.actualComments[indexToQuery];
        this.course = this.actualCourses[indexToQuery];
        this.date = this.dates[indexToQuery];
        this.grade = this.grades[indexToQuery];

        this.opacity = 1;
      }, 200);
      return;
    }
    this.queryTexts();
  }

  /** Query the texts for the current index. */
  queryTexts() {
    const indexToQuery = this.currentIndex;
    this.textService
      .getMulti([
        this.namesSelectors[indexToQuery],
        this.commentsSelectors[indexToQuery],
        this.coursesSelectors[indexToQuery],
      ])
      .pipe(timeInterval())
      .subscribe((r) => {
        this.visibleToLoadTextService.textLoaded(this);

        const timeMs = r['interval'];
        let waitTime = 0;
        if (timeMs < 200) {
          waitTime = 200 - timeMs;
        }
        setTimeout(() => {
          const value = r['value'];
          this.name = value[0];
          this.comment = value[1];
          this.course = value[2];
          this.date = this.dates[indexToQuery];
          this.grade = this.grades[indexToQuery];

          this.opacity = 1;

          this.actualNames[indexToQuery] = this.name;
          this.actualComments[indexToQuery] = this.comment;
          this.actualCourses[indexToQuery] = this.course;
          this.indexQueried.push(indexToQuery);
        }, waitTime);
      });
  }

  /**
   * Update the texts. Used when the language is changed : thus, the array
   * containing the indexes already querried has to be reset.
   */
  updateTexts(): void {
    this.opacity = 0;
    this.indexQueried = [];
    this.queryTexts();
  }

  /**
   * Get the main component element.
   *
   * @returns The element.
   */
  getElement(): ElementRef<HTMLElement> {
    return this.mainDiv;
  }

  /**
   * On destroy, the component has to be unsubscribed rom the
   * {@link VisibleToLoadTextService} to avoid having the service try to notify a
   * destroyed subscriber.
   */
  ngOnDestroy(): void {
    this.visibleToLoadTextService.unsubscribe(this);
    clearInterval(this.goTroughInterval);
  }
}
