import { Component, HostListener, OnDestroy } from '@angular/core';
import { of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { scriptVar } from 'src/scripts/template/tools/setUp';

/** Component for the back to top icon. */
@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css'],
})
export class BackToTopComponent implements ComponentWithText, OnDestroy {
  /**
   * Scroll trigger value for the icon to appear.
   *
   * Defined to be the height of the icon, plus twice the spacing between the
   * icon and the bottom of the screen. That way, since the banner is taking the
   * entire viewport height, when the icon (dis)appears, it is neatly evenly
   * seperated from the bottom of the screen and the banner.
   */
  trigger =
    parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--back-to-top-size')
        .split('px')[0]
    ) +
    2 *
      parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--back-to-top-bottom')
          .split('px')[0]
      );
  /** Icon opacity, to make it disappear when it should. */
  iconOpacity = '0';
  /**
   * The pointer events css property, to make it unclickable and not to change
   * the cursor pointer in any way when the icon disappears.
   */
  iconPointerEvent = 'none';
  /**
   * The state of the icon, based on the scroll amount compared with the
   * trigger.
   */
  backToTopState =
    scrollY > this.trigger
      ? scriptVar.backToTopVisibleState
      : scriptVar.backToTopInvisibleState;
  /** Alt text of the image. */
  altTxt = of('');

  /**
   * Component constructor.
   *
   * @param languageService The {@link LanguageService}
   * @param textService The {@link TextService}
   */
  constructor(
    private languageService: LanguageService,
    private textService: TextService
  ) {
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
    // this.altTxt = this.textService.get('back-to-top-alt');
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
   * On scroll event. This checks whether or not the state has to be changed. If
   * it has to be, it changed the state and calls the method responsible for
   * actually updating the component.
   */
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

  /**
   * On click event. Scrolls back to top smoothly.
   *
   * @param event The event, specified mainly to prevent the default behaviour
   *   of the link
   */
  onClick(event: Event) {
    document.querySelector('html')?.scrollTo({ top: 0, behavior: 'smooth' });
    event.preventDefault();
  }

  /**
   * Actual update of the style of the elements according to the state set in
   * backToTopState. It changes the opacity of the component and its
   * clickability.
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
