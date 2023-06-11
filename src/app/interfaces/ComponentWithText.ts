import { OnDestroy } from '@angular/core';

/**
 * Interface for components containing texts that are subject to language change
 * update. See {@link LanguageService}. It extends OnDestroy so that the
 * components unsubscribe before being destroyd and avoir having references to
 * destroyed component in the service.
 */
export interface ComponentWithText extends OnDestroy {
  /**
   * Method called by the {@link LanguageService} when the texts should be
   * updated after a language change.
   */
  updateTexts(): void;
}
