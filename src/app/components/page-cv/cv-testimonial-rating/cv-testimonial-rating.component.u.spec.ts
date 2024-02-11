import { TestBed } from '@angular/core/testing';
import { CvTestimonialRatingComponent } from './cv-testimonial-rating.component';

describe('CvTestimonialRatingComponent - unit', () => {
  let component: CvTestimonialRatingComponent;

  const defaultNbr = 5;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CvTestimonialRatingComponent],
    });
    component = TestBed.inject(CvTestimonialRatingComponent);
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });

    it('should set default values', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      expect(component.rating)
        .withContext('nbr should be set')
        .toBe(defaultNbr);
    });
  });

  describe('getPercent method', () => {
    it('should compute the percentage', () => {
      component.rating = 3;

      const expected = '60%';
      const actual = component.getPercent();

      expect(actual)
        .withContext('the percentage should be correct')
        .toBe(expected);
    });
  });
});
