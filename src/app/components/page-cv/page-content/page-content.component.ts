import { Component } from '@angular/core';
import { CvAboutMeComponent } from '../cv-about-me/cv-about-me.component';
import { CvSkillsComponent } from '../cv-skills/cv-skills.component';
import { CvContactInfoComponent } from '../cv-contact-info/cv-contact-info.component';
import { CvImgComponent } from '../cv-img/cv-img.component';
import { CvTestimonialsComponent } from '../cv-testimonials/cv-testimonials.component';

/** Component displaying the entire CV page content. */
@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.css'],
  standalone: true,
  imports: [
    CvAboutMeComponent,
    CvSkillsComponent,
    CvContactInfoComponent,
    CvImgComponent,
    CvTestimonialsComponent,
  ],
})
export class PageContentComponent {}
