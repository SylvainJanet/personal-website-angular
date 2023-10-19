import { Injectable, OnDestroy } from '@angular/core';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { WindowScrollService } from '../windowScrollService/window-scroll.service';
import { WindowResizeService } from '../windowResizeService/window-resize.service';
import { Subscription } from 'rxjs';
import { DOMComputationService } from '../domcomputation/domcomputation.service';
import { debounce } from 'src/scripts/tools/debounce/debounce';

/**
 * Service responsible for managing {@link ComponentWithText} so that only
 * components in the viewport actually make the API calls to get the texts. To
 * avoid a somewhat disturbing user experience of having components loading
 * while scrolling or resizing, the loaded zone is actually a little bigger than
 * the viewport.
 */
@Injectable({
  providedIn: 'root',
})
export class VisibleToLoadTextService implements OnDestroy {
  /**
   * {@link ComponentWithText} managed. The visible components will load their
   * texts when appropriate.
   */
  subscribers: ComponentWithText[] = [];

  /** Map containing the visibility of each {@link ComponentWithText}. */
  visibility: Map<ComponentWithText, boolean>;
  /**
   * Map containing whether or not each {@link ComponentWithText} as loaded their
   * texts. This is important so that the {@link ComponentWithText} do not reload
   * their texts after it already has been done, and so that preloaders can be
   * displayed while the texts are loading.
   */
  loaded: Map<ComponentWithText, boolean>;
  /**
   * Map containing whether or not each {@link ComponentWithText} is currently
   * loading. This is important so that the {@link ComponentWithText} do not
   * reload their texts when they are already loading.
   */
  loading: Map<ComponentWithText, boolean>;

  /**
   * Map containing whether or not each {@link ComponentWithText} should reload.
   * Usefull for instance when a language change occurs while a component is
   * already loading.
   */
  toReload: Map<ComponentWithText, boolean>;
  /**
   * Allow any {@link ComponentWithText} to be loaded when appropriate only once.
   * Usefull for language names for instance, which are loaded in their onw
   * languages and thus do not need to be reloaded on language change.
   */
  onlyOnce: Map<ComponentWithText, boolean>;

  /** Scroll subscription to the {@link WindowScrollService} scroll observable */
  scroll: Subscription;
  /** Resize subscription to the {@link WindowResizeService} resize observable */
  resize: Subscription;

  /**
   * Buffer factor for the height. For instance, a buffer factor of 0 means no
   * buffer, a buffer factor of 1 means that the viewport height is extended
   * (both up and down) by another viewport height.
   */
  bufferFactorHeight = 0.5;
  /**
   * Buffer factor for the width. For instance, a buffer factor of 0 means no
   * buffer, a buffer factor of 1 means that the viewport width is extended
   * (both left and right) by another viewport width.
   */
  bufferFactorWidth = 0.25;

  /**
   * VisibleToLoadText service constructor
   *
   * @param windowScrollService The {@link WindowScrollService}
   * @param windowResizeService The {@link WindowResizeService}
   * @param domComputationService The {@link DOMComputationService}
   */
  constructor(
    private windowScrollService: WindowScrollService,
    private windowResizeService: WindowResizeService,
    private domComputationService: DOMComputationService
  ) {
    this.scroll = windowScrollService.scroll.subscribe(() => {
      this.loadNewTexts();
    });
    this.resize = windowResizeService.resize.subscribe(() => {
      this.loadNewTexts();
    });
    this.visibility = new Map<ComponentWithText, boolean>();
    this.loaded = new Map<ComponentWithText, boolean>();
    this.loading = new Map<ComponentWithText, boolean>();
    this.toReload = new Map<ComponentWithText, boolean>();
    this.onlyOnce = new Map<ComponentWithText, boolean>();
  }

  /**
   * On destroy, the service has to be unsubscribed from the scroll observable
   * from the {@link WindowScrollService} and the resize observable from the
   * {@link WindowResizeService}.
   */
  ngOnDestroy(): void {
    this.scroll.unsubscribe();
    this.resize.unsubscribe();
  }

  /**
   * Let a {@link ComponentWithText} subscribe to this observer to be notified
   * when appropriate.
   *
   * @param s The {@link ComponentWithText}
   */
  subscribe(s: ComponentWithText, onlyOnce = false) {
    this.subscribers.push(s);
    this.loaded.set(s, false);
    this.loading.set(s, false);
    this.toReload.set(s, false);
    this.loadNewTextsOf(s);
    this.onlyOnce.set(s, onlyOnce);
  }

  /**
   * Let a {@link ComponentWithText} unsubscribe to this observer.
   *
   * @param s The {@link ComponentWithText}
   */
  unsubscribe(s: ComponentWithText) {
    const index = this.subscribers.indexOf(s);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
    this.visibility.delete(s);
    this.loading.delete(s);
    this.loaded.delete(s);
  }

  /**
   * Update the visibility of a single {@link ComponentWithText}
   *
   * @param comp The {@link ComponentWithText}
   */
  private updateVisibilityOf(comp: ComponentWithText) {
    this.visibility.set(
      comp,
      this.domComputationService.isIntoView(
        comp.getElement(),
        this.bufferFactorHeight,
        this.bufferFactorWidth
      )
    );
  }

  /** Update the visibility of all {@link ComponentWithText} */
  updateVisibility() {
    for (const comp of this.subscribers) {
      this.updateVisibilityOf(comp);
    }
  }

  /**
   * Indicates that a {@link ComponentWithText} has finished loading the texts.
   *
   * @param comp The {@link ComponentWithText}
   */
  textLoaded(comp: ComponentWithText) {
    if (!this.toReload.get(comp)) {
      this.loaded.set(comp, true);
      this.loading.set(comp, false);
    } else {
      this.toReload.set(comp, false);
      this.loaded.set(comp, false);
      comp.updateTexts();
      this.loading.set(comp, true);
    }
  }

  /**
   * Wheter or not the text of a {@link ComponentWithText} has loaded.
   *
   * @param comp The {@link ComponentWithText}
   * @returns Whether or not the text as loaded
   */
  hasTextLoaded(comp: ComponentWithText) {
    return this.loaded.get(comp);
  }

  /**
   * Load new texts of a single {@link ComponentWithText} when appropriate.
   *
   * @param comp The {@link ComponentWithText}
   */
  loadNewTextsOf(comp: ComponentWithText) {
    if (
      (this.loading.get(comp) || this.loaded.get(comp)) &&
      this.onlyOnce.get(comp)
    )
      return;
    this.updateVisibilityOf(comp);
    if (
      this.visibility.get(comp) &&
      !this.loaded.get(comp) &&
      !this.loading.get(comp)
    ) {
      comp.updateTexts();
      this.loading.set(comp, true);
    }
  }

  /** Load new texts for all {@link ComponentWithText} when appropriate. */
  @debounce()
  loadNewTexts() {
    for (const comp of this.subscribers) {
      this.loadNewTextsOf(comp);
    }
  }

  /**
   * On language change, reset the loaded and loading status of the
   * {@link ComponentWithText} since everything has to be loaded again, and then
   * load the new texts.
   */
  languageChange() {
    for (const comp of this.subscribers) {
      // if the language change occurs during the loading of a component's text and
      // is not into view, the component should reload the texts with the correct language
      if (
        this.loading.get(comp) &&
        !this.loaded.get(comp) &&
        !this.onlyOnce.get(comp)
      ) {
        this.toReload.set(comp, true);
      }
      if (!this.onlyOnce.get(comp)) {
        this.loading.set(comp, false);
        this.loaded.set(comp, false);
      }
    }
    this.loadNewTexts();
  }
}
