import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Observable, of, zip } from 'rxjs';

/**
 * Component used to display an array of strings with a typing animation, as if
 * the text was typed, then erased, the the next text was typed, then erased,
 * and so forth.
 *
 * Inspired by
 * https://medium.com/swlh/an-infinite-type-and-delete-animation-in-angular-10-fc38d87d08ec
 */
@Component({
  selector: 'app-typed-animated-text',
  templateUrl: './typed-animated-text.component.html',
  styleUrls: ['./typed-animated-text.component.css'],
})
export class TypedAnimatedTextComponent implements AfterViewInit, OnChanges {
  /** The text element */
  @ViewChild('textElement') textElement!: ElementRef;
  /** The line element that will blink as the cursor at the end of the line does */
  @ViewChild('blinkElement') blinkElement!: ElementRef;
  /**
   * Array of `Observable<string>` containing the different texts to be
   * displayed, one after the other used as input.
   */
  @Input() inputArray: Observable<string>[] = [of('')];
  /**
   * Array of string containing the texts to be displayed. Artifact of the
   * creation of this component in my pure HTML/CSS/JS template. This could be
   * changed to only require arrays of observables and using pipes or other
   * tools on observables to get the same results. It might complicate the code
   * though.
   */
  textArray: string[] = [];
  /** Text color */
  @Input() textColor = 'black';
  /** Font size */
  @Input() fontSize = '1em';
  /** Blinking line width */
  @Input() blinkWidth = '2px';
  /** Typing speed (in ms) */
  @Input() typingSpeed = 80;
  /** Deleting speed (in ms) */
  @Input() deleteSpeed = 30;
  /** This animation is on loop */
  @Input() loop = true;
  /** Delay between end of typing and beginning of deleting (in ms) */
  @Input() deleteDelay = 1100;

  /** Index of the current string being either displayed or erased */
  private i = 0;

  /**
   * Typed animation text component constructor
   *
   * @param renderer The `Renderer`
   */
  constructor(private renderer: Renderer2) {
    zip(this.inputArray).subscribe({
      next: (r) => (this.textArray = r),
    });
  }

  /**
   * If the array of observable changes, the array of string has to be updted
   * too.
   */
  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['inputArray'];
    if (change && change.currentValue != change.previousValue) {
      zip(this.inputArray).subscribe({
        next: (r) => {
          this.textArray = r;
        },
      });
    }
    if (this.textElement) {
      this.initVariables();
    }
  }

  /**
   * Once the view is init and every string of the array has been received,
   * initialize the proper parameters and start the typing effect.
   */
  ngAfterViewInit(): void {
    this.initVariables();
    zip(this.inputArray).subscribe({
      next: (r) => {
        this.textArray = r;
        this.typingEffect();
      },
    });
  }

  /** Style setup. This could be done with binding in HTML */
  initVariables(): void {
    this.renderer.setStyle(
      this.textElement.nativeElement,
      'color',
      this.textColor
    );
    this.renderer.setStyle(
      this.textElement.nativeElement,
      'font-size',
      this.fontSize
    );
    this.renderer.setStyle(this.textElement.nativeElement, 'padding', '0.1em');

    this.renderer.setStyle(
      this.blinkElement.nativeElement,
      'border-right-width',
      this.blinkWidth
    );
    this.renderer.setStyle(
      this.blinkElement.nativeElement,
      'border-right-color',
      this.textColor
    );
    this.renderer.setStyle(
      this.blinkElement.nativeElement,
      'font-size',
      this.fontSize
    );
  }

  /**
   * Typing effect : Types the string letter after letter with {@link typinSpeed}
   * delay. Once the string is totally written, call {@link deletingEffect}.
   */
  typingEffect(): void {
    const word = this.textArray[this.i].split('');
    const loopTyping = () => {
      if (word.length > 0) {
        this.textElement.nativeElement.innerHTML += word.shift();
      } else {
        setTimeout(() => {
          this.deletingEffect();
        }, this.deleteDelay);
        return;
      }
      setTimeout(loopTyping, this.typingSpeed);
    };
    loopTyping();
  }

  /**
   * Deleting effect : Deletes the string letter after letter with
   * {@link deleteSpeed} delay. Once the string is totally removed, type again
   * after having changed the index of the current element being display
   * {@link i}
   */
  deletingEffect(): void {
    const word = this.textArray[this.i].split('');
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        this.textElement.nativeElement.innerHTML = word.join('');
      } else {
        this.i = this.textArray.length > this.i + 1 ? this.i + 1 : 0;
        this.typingEffect();
        return;
      }
      setTimeout(loopDeleting, this.deleteSpeed);
    };
    loopDeleting();
  }
}
