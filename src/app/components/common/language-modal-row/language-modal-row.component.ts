import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * Language modal row component, displaying the language name and corresponding
 * flags (even though than can be problematic for some languages if one were to
 * develop an app in many languages since there is not a one-to-one
 * correspondance between flags and languages)
 */
@Component({
  selector: 'app-language-modal-row',
  templateUrl: './language-modal-row.component.html',
  styleUrls: ['./language-modal-row.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class LanguageModalRowComponent {
  /** Language name */
  @Input() languageName = 'NO LANGUAGE';
  /** Flag selector to be used for the flag icon class */
  @Input() flagSelectors = ['xx'];
  /** Whether or not the row represents the current language */
  @Input() isCurrent = false;
  /** Whether or not the row is the first row */
  @Input() isFirstRow = false;
  /** Whether or not the row is the last row */
  @Input() isLastRow = false;
}
