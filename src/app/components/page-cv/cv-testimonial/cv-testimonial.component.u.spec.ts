import { TestBed } from '@angular/core/testing';
import { CvTestimonialComponent } from './cv-testimonial.component';

describe('CvTestimonialComponent - unit', () => {
  let component: CvTestimonialComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CvTestimonialComponent],
    });
    component = TestBed.inject(CvTestimonialComponent);
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

      expect(component.name).withContext('name should be set').toBe('');
      expect(component.comment).withContext('comment should be set').toBe('');
      expect(component.grade).withContext('grade should be set').toBe(5);
      expect(component.date)
        .withContext('date should be set')
        .toBeCloseTo(new Date().getTime(), -2);
      expect(component.course).withContext('course should be set').toBe('');
      expect(component.opacity).withContext('opacity should be set').toBe(1);
    });
  });
});
