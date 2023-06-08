import { OnDestroy } from '@angular/core';

export interface ComponentWithText extends OnDestroy {
  updateTexts(): void;
}
