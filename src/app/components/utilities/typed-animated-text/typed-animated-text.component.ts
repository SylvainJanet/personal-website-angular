import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

// https://medium.com/swlh/an-infinite-type-and-delete-animation-in-angular-10-fc38d87d08ec
@Component({
  selector: 'app-typed-animated-text',
  templateUrl: './typed-animated-text.component.html',
  styleUrls: ['./typed-animated-text.component.css'],
})
export class TypedAnimatedTextComponent implements AfterViewInit {
  @ViewChild('textElement') textElement!: ElementRef;
  @ViewChild('blinkElement') blinkElement!: ElementRef;

  @Input() textArray: string[] = [
    'You Can...',
    'Write Anything You want...',
    '🍻 Enjoy 🍸🍻🍺🍷🍹',
  ];
  @Input() textColor = 'black';
  @Input() fontSize = '20px';
  @Input() blinkWidth = '2px';
  @Input() typingSpeed = 80;
  @Input() deleteSpeed = 30;
  @Input() loop = true;
  @Input() deleteDelay = 1100;

  private i = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.initVariables();
    this.typingEffect();
  }

  private initVariables(): void {
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

  private typingEffect(): void {
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

  private deletingEffect(): void {
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
