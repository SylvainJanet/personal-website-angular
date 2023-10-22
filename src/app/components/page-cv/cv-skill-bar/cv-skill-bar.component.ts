import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
} from '@angular/core';
import { of } from 'rxjs';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { scriptVar } from 'src/scripts/template/tools/setUp';
import { debounce } from 'src/scripts/tools/debounce/debounce';

/**
 * Component used to display a skill with a animated bar representing a
 * percentage.
 */
@Component({
  selector: 'app-cv-skill-bar',
  templateUrl: './cv-skill-bar.component.html',
  styleUrls: ['./cv-skill-bar.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CvSkillBarComponent implements OnChanges {
  /**
   * An input containinf the name of the skill to be displayed as an
   * `Observable<string>`.
   */
  @Input() skillName = of('SKILL');
  /**
   * The percentage, to be displayed both as a number but also as the amount the
   * bar will fill up.
   */
  @Input() percent = 50;
  /**
   * Width of the bar. Initially 0, and gets un to {@link percent}% when the bar
   * is in view, and goes back to 0 when it gets out of view.
   */
  width = '0';
  /** Minimal scroll value to have the bar in view. */
  posElementMin = 0;
  /** Maximal scroll value to have the bar in view. */
  posElementMax = 0;

  /**
   * Skill bar component constructor.
   *
   * @param preloaderService The {@link PreloaderService}
   * @param element The `ElementRef`
   */
  constructor(
    private preloaderService: PreloaderService,
    private element: ElementRef
  ) {}

  /**
   * If the input changes, the position has to be computed again and the width
   * has to be updated again.
   */
  ngOnChanges() {
    this.updateAnimation();
  }
  /**
   * Computes the position precise position of the element in the page so that
   * the animation triggers exactly as the bar enters or leaves the viewport.
   */
  getElPos() {
    if (!this.element.nativeElement) return;
    const posViewPort =
      this.element.nativeElement.getBoundingClientRect().y +
      this.element.nativeElement.firstElementChild.firstElementChild.getBoundingClientRect()
        .height +
      parseInt(
        getComputedStyle(
          this.element.nativeElement.firstElementChild.firstElementChild
        ).marginTop
      ) +
      parseInt(
        getComputedStyle(
          this.element.nativeElement.firstElementChild.firstElementChild
        ).marginBottom
      );
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
      this.element.nativeElement.firstElementChild.firstElementChild.nextElementSibling.getBoundingClientRect().height;
  }

  /**
   * Update the trigger when the window is resized. Indeed, the bar position
   * will change since it is tied to viewport height. Uses the {@link debounce}
   * annotation to avoid firing this too much : resize events fire a lot during
   * resizing. Calls {@link updateAnimation} which does the actual update once
   * everything is loaded.
   */
  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.updateAnimation();
  }

  /**
   * Checks if the width has to be changed (and thus, the animation started) and
   * do the change if it is the case.
   */
  updateWidth() {
    if (scrollY < this.posElementMin || scrollY > this.posElementMax) {
      this.width = '0';
    } else {
      this.width = this.percent + '%';
    }
  }

  /**
   * Does the actual update of the scroll trigger amount and the possible width
   * modification (to create the animation).
   */
  updateAnimation() {
    this.getElPos();
    this.updateWidth();
  }

  /**
   * Update the trigger when client scrolls. Uses the {@link debounce} annotation
   * to avoid firing this too much : resize events fire a lot during resizing.
   * Calls {@link updateAnimation} which does the actual update once everything
   * is loaded.
   */
  @HostListener('window:scroll', ['$event'])
  @debounce()
  onScroll() {
    this.updateAnimation();
  }
}
