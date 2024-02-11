import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

/**
 * DatePipe formats a value according to the locale associated with
 * {@link LanguageService} by the {@link locales} enum.
 */
@Pipe({
  name: 'localizedDate',
  pure: false,
  standalone: true,
})
export class LocalizedDatePipe implements PipeTransform {
  /**
   * Constructor.
   *
   * @param languageService The {@link LanguageService}.
   */
  constructor(private languageService: LanguageService) {}

  /**
   * Transforms a date expression to a string according to a pattern, in a
   * locale given by the {@link locales} associated with the language given by
   * the {@link LanguageService}.
   *
   * @param value The date expression: a Date object, a number (milliseconds
   *   since UTC epoch), or an ISO string
   *   (https://www.w3.org/TR/NOTE-datetime).
   * @param pattern The date/time components to include, using predefined
   *   options or a custom format string. When not provided, the mediumDate is
   *   used as a value.
   * @returns — A date string in the desired format.
   */
  transform(value: string | number | Date, pattern = 'mediumDate'): unknown {
    const datePipe: DatePipe = new DatePipe(
      this.languageService.currentLocale()
    );
    return datePipe.transform(value, pattern);
  }
}
