import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { LanguageModalRowComponent } from '../language-modal-row/language-modal-row.component';
import { LanguageService } from 'src/app/services/language/language.service';
import { Languages } from 'src/app/enums/languages';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';

/**
 * Language modal component, displaying multiple
 * {@link LanguageModalRowComponent}. For now, the available languages are
 * hard-coded since there is only a few of them.
 */
@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    LanguageModalRowComponent,
    MatProgressSpinnerModule,
    ImgLoadDirective,
  ],
})
export class LanguageModalComponent implements ComponentWithText, OnDestroy {
  /** Whether or not the modal is open. */
  @Input() isOpen = false;
  /** The HTMLElement that has been clicked on to open the component. */
  @Input() clickedEl!: HTMLElement;
  /** Emits when the modal is closed. No value is emitted. */
  @Output() closed = new EventEmitter<boolean>();
  /** ElementRef of the modal content. */
  @ViewChild('modalContent') modalContent!: ElementRef;
  /** Languages enumeration used for binding in html. */
  Languages = Languages;
  /** The main div element of the component. */
  @ViewChild('mainDiv') mainDiv!: ElementRef<HTMLElement>;

  /** English language name. */
  englishName = '';
  /** French language name. */
  frenchName = '';
  /** Preloader for texts. */
  loaderTexts = Preloaders.TEXTS;
  /** Display style of the image doubles */
  doubleImgDisplay = 'block';
  /** Flag sources, used to load the sources when this component loads. */
  flagSrcs = ['fr.svg', 'gb.svg', 'us.svg', 'xx.svg'];
  /** Flag selectors, used to load the sources when this components loads. */
  flagSelectors = ['fr', 'gb', 'us', 'xx'];
  /** {@link Preloaders} used for the images. */
  preloaders = [Preloaders.MAIN];

  /**
   * Language modal component constructor.
   *
   * @param languageService The {@link LanguageService}
   * @param visibleToLoadTextService The {@link VisibleToLoadTextService}
   * @param textService The {@link TextService}
   * @param preloader The {@link PreloaderService}
   */
  constructor(
    public languageService: LanguageService,
    public visibleToLoadTextService: VisibleToLoadTextService,
    private textService: TextService,
    public preloader: PreloaderService
  ) {
    setTimeout(() => {
      this.visibleToLoadTextService.subscribe(this, true);
    }, 0);
  }

  /**
   * Update the component's texts when the language is updated. See
   * {@link VisibleToLoadTextService}. The subscriber design pattern is used and
   * this function is used when the service notifies its subscribers to update
   * the text contents after a language change. Uses {@link TextService} to get
   * those contents from the database.
   */
  updateTexts() {
    this.textService
      .getTextInLanguage('english-language-name', Languages.ENGLISH)
      .subscribe((t) => {
        this.englishName = t;
        this.visibleToLoadTextService.textLoaded(this);
      });
    this.textService
      .getTextInLanguage('french-language-name', Languages.FRENCH)
      .subscribe((t) => {
        this.frenchName = t;
        this.visibleToLoadTextService.textLoaded(this);
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

  /**
   * On destroy, the component has to be unsubscribed from the
   * {@link VisibleToLoadTextService} to avoid having the service try to notify a
   * destroyed subscriber.
   */
  ngOnDestroy(): void {
    this.visibleToLoadTextService.unsubscribe(this);
  }

  /** Close the modal. */
  closeModal() {
    this.isOpen = false;
    this.closed.emit();
  }

  /** Change the language. */
  changeLanguage(language: Languages) {
    this.closeModal();
    if (language != this.languageService.current()) {
      this.languageService.set(language);
    }
  }

  /** On click on the correct location, close the modal */
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    // Check if the click event target is the modal's backdrop
    if (
      this.isOpen &&
      !this.clickedEl.contains(event.target as HTMLElement) &&
      !this.modalContent.nativeElement.contains(event.target as HTMLElement)
    ) {
      this.closeModal();
    }
  }

  /**
   * When the image double loads, it should no longer be displayed. See html for
   * explanation as to why this behaviour exists
   */
  onDoubleImgLoad() {
    this.doubleImgDisplay = 'none';
  }
}
