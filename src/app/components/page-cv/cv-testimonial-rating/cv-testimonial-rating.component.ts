import { Component, Input } from '@angular/core';

/**
 * Component responsible for displaying a rating with stars. Has a number input,
 * expected to be from 0 to 5, and will display the appropriate amount of stars
 * for that rating. Non integers are supported.
 */
@Component({
  selector: 'app-cv-testimonial-rating',
  templateUrl: './cv-testimonial-rating.component.html',
  styleUrls: ['./cv-testimonial-rating.component.css'],
  standalone: true,
})
export class CvTestimonialRatingComponent {
  /** The rating from 0 to 5. */
  @Input() rating = 5;

  /**
   * Get the percentage of stars to be displayed.
   *
   * @returns The percentage
   */
  getPercent() {
    const percent = (this.rating / 5) * 100;
    return percent + '%';
  }
}
