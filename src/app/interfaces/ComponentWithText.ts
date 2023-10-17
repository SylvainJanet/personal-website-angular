import { ElementRef, OnDestroy } from '@angular/core';

/**
 * Interface for components containing texts that are subject to language change
 * update. See {@link VisibleToLoadTextService}. It extends OnDestroy so that the
 * components unsubscribe before being destroyed and avoid having references to
 * destroyed components in the service.
 */
export interface ComponentWithText extends OnDestroy {
  /**
   * Method called by the {@link VisibleToLoadTextService} when the texts should
   * be updated after a language change.
   */
  updateTexts(): void;

  /**
   * Get the main {@link ElementRef<HTMLElement>}. This element visibility will
   * be checked by the {@link VisibleToLoadTextService}.
   */
  getElement(): ElementRef<HTMLElement>;
}
