import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CvTestimonialRatingComponent } from './cv-testimonial-rating.component';
import { DebugElement } from '@angular/core';

describe('CvTestimonialRatingComponent - dom unit', () => {
  let fixture: ComponentFixture<CvTestimonialRatingComponent>;
  let componentInstance: CvTestimonialRatingComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CvTestimonialRatingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTestimonialRatingComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance)
      .withContext('component should create')
      .toEqual(jasmine.anything());
  });

  it('should have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).withContext('1 child at root').toBe(1);
    expect(debugEl.children[0].nativeElement.tagName)
      .withContext('child 1 at root is DIV')
      .toBe('DIV');

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.children.length)
      .withContext('child 1 at root should have 1 child')
      .toBe(1);
    expect(firstDivEl.children[0].nativeElement.tagName)
      .withContext('child 1 of child 1 at root should be DIV')
      .toBe('DIV');

    // stars
    const starDiv: DebugElement = firstDivEl.children[0];

    expect(starDiv.children.length)
      .withContext('child 1 of child 1 at root should have no children')
      .toBe(0);
  });

  it('should set percent width', () => {
    const nbrInput = 3;
    const expected = '60%';

    componentInstance.rating = nbrInput;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];
    const starDiv: DebugElement = firstDivEl.children[0];

    const actual = starDiv.styles['width'];

    expect(actual).withContext('percent width should be set').toBe(expected);
  });
});
