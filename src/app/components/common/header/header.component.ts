import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { scriptVar } from '../../../../scripts/template/tools/setUp';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';
import { debounce } from 'src/scripts/tools/debounce/debounce';
import { Observable, of } from 'rxjs';
import { TextService } from 'src/app/services/db/text/text.service';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { ButtonBarOnHoverComponent } from '../../utilities/button-bar-on-hover/button-bar-on-hover.component';
import { LinkBarOnHoverComponent } from '../../utilities/link-bar-on-hover/link-bar-on-hover.component';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LanguageModalComponent } from '../language-modal/language-modal.component';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { IEnvironment } from 'src/environments/interface/ienvironment';

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
  standalone: true,
  imports: [
    ButtonBarOnHoverComponent,
    LinkBarOnHoverComponent,
    MatProgressSpinnerModule,
    CommonModule,
    LanguageModalComponent,
  ],
})
export class HeaderComponent implements OnInit, ComponentWithText, OnDestroy {
  /** The main div element of the component. */
  @ViewChild('mainDiv') mainDiv!: ElementRef<HTMLElement>;
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
  /** Preloader for texts. */
  loaderTexts = Preloaders.TEXTS;

  /** Whether or not to show the language change modal. */
  showModal = false;
  /** ElementRef of the button in the uncollapsed header opening the modal. */
  @ViewChild('buttonHeaderModal', { read: ElementRef })
  buttonHeaderModal!: ElementRef;
  /** ElementRef of the button in the collapsed header opening the modal. */
  @ViewChild('buttonCollapsedModal', { read: ElementRef })
  buttonCollapsedModal!: ElementRef;
  /** HTMLElement of the button clicked on to open the modal */
  clickedEl!: HTMLElement;
  /** Text icon to be clicked on to open the modal */
  textIcon = of('\xa0 \xa0 🌐 \xa0 \xa0');

  /** Website url */
  website: string;

  /**
   * Header component constructor.
   *
   * @param domcomputation The {@link DOMComputationService}
   * @param logService The {@link LogService}
   * @param textService The {@link TextService}
   * @param visibleToLoadTextService The {@link VisibleToLoadTextService}
   * @param preloader The {@link PreloaderService}
   * @param changeDetectorRef The {@link ChangeDetectorRef}
   * @param environment The {@link IEnvironment}
   */
  constructor(
    private domcomputation: DOMComputationService,
    logService: LogService,
    private textService: TextService,
    public visibleToLoadTextService: VisibleToLoadTextService,
    public preloader: PreloaderService,
    @Inject(ENV) public environment: IEnvironment
  ) {
    this.website = environment.website;
    this.trigger = 0;
    this.headerState = '';
    this.logger = logService.withClassName(this.constructor.name);
    setTimeout(() => {
      this.visibleToLoadTextService.subscribe(this);
    }, 0);
  }

  /**
   * On destroy, the component has to be unsubscribed from the
   * {@link VisibleToLoadTextService} to avoid having the service try to notify a
   * destroyed subscriber.
   */
  ngOnDestroy(): void {
    this.visibleToLoadTextService.unsubscribe(this);
  }

  /**
   * Update the component's texts when the language is updated. See
   * {@link VisibleToLoadTextService}. The subscriber design pattern is used and
   * this function is used when the service notifies its subscribers to update
   * the text contents after a language change. Uses {@link TextService} to get
   * those contents from the database.
   */
  updateTexts(): void {
    this.textService.get('sylvain-janet').subscribe((v) => {
      this.myName = of(v);
      this.visibleToLoadTextService.textLoaded(this);
    });
  }

  /**
   * Update the trigger when the window is resized. Indeed, the banner height
   * will change since it is tied to viewport height. Uses the {@link debounce}
   * annotation to avoid firing this too much : resize events fire a lot during
   * resizing.
   */
  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize(event: Event) {
    this.updateTrigger(event);
  }

  /**
   * On init, the trigger has to be updated and the state has to be checked
   * because the client could be loading the page already scolled.
   */
  ngOnInit() {
    this.updateTrigger({
      currentTarget: { scrollY: 0 } as Window,
    } as unknown as Event);
  }

  /**
   * Updates the trigger for the state change, as well as checks if the state
   * changes. In that case, calls the method {@link updateHeader} responsible for
   * making the actual changes
   */
  updateTrigger(event: Event) {
    if (!event.currentTarget) return;
    this.trigger = this.domcomputation.getActualHeight(
      document.getElementsByClassName('banner').item(0)
    );
    const oldHeaderState = this.headerState;
    this.headerState =
      (event.currentTarget as Window).scrollY > this.trigger
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
   * @param oldClass The class to replace
   * @param newClass The new class
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
  onScroll(event: Event) {
    if ((event.currentTarget as Window).scrollY > this.trigger) {
      if (this.headerState == scriptVar.headerStateDark) {
        this.headerState = scriptVar.headerStateLight;
        this.updateHeader();
      }
    }
    if ((event.currentTarget as Window).scrollY <= this.trigger) {
      if (this.headerState == scriptVar.headerStateLight) {
        this.headerState = scriptVar.headerStateDark;
        this.updateHeader();
      }
    }
  }

  /**
   * Get the main component element.
   *
   * @returns The element.
   */
  getElement(): ElementRef<HTMLElement> {
    return this.mainDiv;
  }

  /** Open the modal using the uncollapsed header button */
  openModalButtonHeader() {
    this.clickedEl =
      this.buttonHeaderModal?.nativeElement?.children[0]?.children[0];
    this.showModal = true;
  }
  /** Open the modal using the collapsed header button */
  openModalButtonCollapsed() {
    this.clickedEl =
      this.buttonCollapsedModal?.nativeElement?.children[0]?.children[0];
    this.showModal = true;
  }
  /** Close the modal */
  closeModal() {
    this.showModal = false;
  }
}
