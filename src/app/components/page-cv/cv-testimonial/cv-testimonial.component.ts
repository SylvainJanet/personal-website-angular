import { Component, Input } from '@angular/core';
import { CvTestimonialRatingComponent } from '../cv-testimonial-rating/cv-testimonial-rating.component';
import { LocalizedDatePipe } from 'src/app/pipes/localizedDatePipe/localized-date-pipe';

/**
 * Component used to represent a client testimonial. Displays the client name,
 * their comment, their grade, the date the testimonial was given, the course
 * taken, and an opacity parameter used for transitioning from one testimonial
 * to another. It uses the {@link CvTestimonialRatingComponent} to display stars,
 * and {@link LocalizedDatePipe} to display the date properly.
 */
@Component({
  selector: 'app-cv-testimonial',
  templateUrl: './cv-testimonial.component.html',
  styleUrls: ['./cv-testimonial.component.css'],
  standalone: true,
  imports: [CvTestimonialRatingComponent, LocalizedDatePipe],
})
export class CvTestimonialComponent {
  /** The name of the client who left the comment. */
  @Input() name = '';
  /** The comment left by the client. */
  @Input() comment = '';
  /** The grade given by the client. */
  @Input() grade = 5;
  /** The date of the course. */
  @Input() date = new Date();
  /** The course's name. */
  @Input() course = '';
  /** The opacity, used for trhansitioning from one testimonial to another. */
  @Input() opacity = 1;
}
