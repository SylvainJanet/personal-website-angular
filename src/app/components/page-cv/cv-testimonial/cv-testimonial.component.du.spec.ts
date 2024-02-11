import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CvTestimonialComponent } from './cv-testimonial.component';
import { LocalizedDatePipe } from 'src/app/pipes/localizedDatePipe/localized-date-pipe';
import { LanguageService } from 'src/app/services/language/language.service';
import { locales } from 'src/app/enums/locales';
import { Languages } from 'src/app/enums/languages';
import { DebugElement } from '@angular/core';
import { CvTestimonialRatingComponent } from '../cv-testimonial-rating/cv-testimonial-rating.component';

describe('CvTestimonialComponent - dom unit', () => {
  let fixture: ComponentFixture<CvTestimonialComponent>;
  let componentInstance: CvTestimonialComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;

  beforeEach(waitForAsync(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'currentLocale',
    ]);
    languageServiceSpy.currentLocale.and.returnValue(locales[Languages.FRENCH]);
    TestBed.configureTestingModule({
      imports: [CvTestimonialComponent, LocalizedDatePipe],
      providers: [{ provide: LanguageService, useValue: languageServiceSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTestimonialComponent);
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

    const containerEl: DebugElement = debugEl.children[0];
    expect(containerEl.children.length)
      .withContext('container should have 3 children')
      .toBe(3);
    expect(containerEl.children[0].nativeElement.tagName)
      .withContext('children 1 of container is DIV')
      .toBe('DIV');
    expect(containerEl.children[1].nativeElement.tagName)
      .withContext('children 2 of container is DIV')
      .toBe('DIV');
    expect(containerEl.children[2].nativeElement.tagName)
      .withContext('children 3 of container is DIV')
      .toBe('DIV');

    // first row
    const firstRowEl: DebugElement = containerEl.children[0];

    expect(firstRowEl.children.length)
      .withContext('first row should have 1 child')
      .toBe(1);
    expect(firstRowEl.children[0].nativeElement.tagName)
      .withContext('child 1 of first row should be DIV')
      .toBe('DIV');

    const firstColOfFirstRowEl: DebugElement = firstRowEl.children[0];
    expect(firstColOfFirstRowEl.children.length)
      .withContext('first col of first row should have 1 child')
      .toBe(1);
    expect(firstColOfFirstRowEl.children[0].nativeElement.tagName)
      .withContext('first col of first row child should be P')
      .toBe('P');

    const nameParagraphEl: DebugElement = firstColOfFirstRowEl.children[0];
    expect(nameParagraphEl.children.length)
      .withContext('name paragraph should have no children')
      .toBe(0);

    // second row
    const secondRowEl: DebugElement = containerEl.children[1];

    expect(secondRowEl.children.length)
      .withContext('second row should have 1 child')
      .toBe(1);
    expect(secondRowEl.children[0].nativeElement.tagName)
      .withContext('child 1 of second row should be DIV')
      .toBe('DIV');

    const firstColOfSecondRowEl: DebugElement = secondRowEl.children[0];
    expect(firstColOfSecondRowEl.children.length)
      .withContext('first col of second row should have 1 child')
      .toBe(2);
    expect(firstColOfSecondRowEl.children[0].nativeElement.tagName)
      .withContext('child 1 of first col of second row should be P')
      .toBe('P');
    expect(firstColOfSecondRowEl.children[1].nativeElement.tagName)
      .withContext(
        'child 2 of first col of second row should be APP-CV-TESTIMONIAL-RATING'
      )
      .toBe('APP-CV-TESTIMONIAL-RATING');

    const commentEl: DebugElement = firstColOfSecondRowEl.children[0];
    expect(commentEl.children.length)
      .withContext('comment paragraph should have no children')
      .toBe(0);

    // third row
    const thirdRowEl: DebugElement = containerEl.children[2];

    expect(thirdRowEl.children.length)
      .withContext('third row should have 4 children')
      .toBe(4);
    expect(thirdRowEl.children[0].nativeElement.tagName)
      .withContext('child 1 of third row should be DIV')
      .toBe('DIV');
    expect(thirdRowEl.children[1].nativeElement.tagName)
      .withContext('child 2 of third row should be DIV')
      .toBe('DIV');
    expect(thirdRowEl.children[2].nativeElement.tagName)
      .withContext('child 3 of third row should be DIV')
      .toBe('DIV');
    expect(thirdRowEl.children[3].nativeElement.tagName)
      .withContext('child 4 of third row should be DIV')
      .toBe('DIV');

    // cols of third row

    const firstColOfThirdRowEl: DebugElement = thirdRowEl.children[0];
    expect(firstColOfThirdRowEl.children.length)
      .withContext('first col of third row should have no children')
      .toBe(0);

    const secondColOfThirdRowEl: DebugElement = thirdRowEl.children[1];
    expect(secondColOfThirdRowEl.children.length)
      .withContext('second col of third row should have 1 child')
      .toBe(1);
    expect(secondColOfThirdRowEl.children[0].nativeElement.tagName)
      .withContext('')
      .toBe('I');
    const dateEl: DebugElement = secondColOfThirdRowEl.children[0];
    expect(dateEl.children.length)
      .withContext('date should have no children')
      .toBe(0);

    const thirdColOfThirdRowEl: DebugElement = thirdRowEl.children[2];
    expect(thirdColOfThirdRowEl.children.length)
      .withContext('third col of third row should have 1 child')
      .toBe(1);
    expect(thirdColOfThirdRowEl.children[0].nativeElement.tagName)
      .withContext('')
      .toBe('I');
    const courseEl: DebugElement = thirdColOfThirdRowEl.children[0];
    expect(courseEl.children.length)
      .withContext('course should have no children')
      .toBe(0);

    const fourthColOfThirdRowEl: DebugElement = thirdRowEl.children[3];
    expect(fourthColOfThirdRowEl.children.length)
      .withContext('fourth col of third row should have no children')
      .toBe(0);
  });

  it('should set name', () => {
    const expected = 'THIS IS A TEST';
    componentInstance.name = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const containerEl: DebugElement = debugEl.children[0];

    // first row
    const firstRowEl: DebugElement = containerEl.children[0];
    const firstColOfFirstRowEl: DebugElement = firstRowEl.children[0];
    const nameParagraphEl: DebugElement = firstColOfFirstRowEl.children[0];

    const actual = nameParagraphEl.nativeElement.innerHTML;

    expect(actual).withContext('name should be set').toBe(expected);
  });

  it('should set comment', () => {
    const expected = 'THIS IS A TEST';
    componentInstance.comment = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const containerEl: DebugElement = debugEl.children[0];

    // second row
    const secondRowEl: DebugElement = containerEl.children[1];
    const firstColOfSecondRowEl: DebugElement = secondRowEl.children[0];
    const commentEl: DebugElement = firstColOfSecondRowEl.children[0];

    const actual = commentEl.nativeElement.innerHTML;

    expect(actual).withContext('comment should be set').toBe(expected);
  });

  it('should set grade', () => {
    const expected = 2.75;
    componentInstance.grade = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const containerEl: DebugElement = debugEl.children[0];

    // second row
    const secondRowEl: DebugElement = containerEl.children[1];
    const firstColOfSecondRowEl: DebugElement = secondRowEl.children[0];
    const ratingComponent: CvTestimonialRatingComponent =
      firstColOfSecondRowEl.children[1].componentInstance;

    const actual = ratingComponent.rating;

    expect(actual).withContext('grade should be set').toBe(expected);
  });

  it('should set date', () => {
    const expectedDate = new Date();
    const expected = new LocalizedDatePipe(languageServiceSpy).transform(
      expectedDate,
      'shortDate'
    );
    componentInstance.date = expectedDate;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const containerEl: DebugElement = debugEl.children[0];

    // third row
    const thirdRowEl: DebugElement = containerEl.children[2];

    // cols of third row
    const secondColOfThirdRowEl: DebugElement = thirdRowEl.children[1];

    const actual = secondColOfThirdRowEl.nativeElement.innerHTML;

    expect(actual).withContext('date should be set').toContain(expected);
  });

  it('should set course', () => {
    const expected = 'THIS IS A TEST';
    componentInstance.course = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const containerEl: DebugElement = debugEl.children[0];

    // third row
    const thirdRowEl: DebugElement = containerEl.children[2];

    // cols of third row
    const thirdColOfThirdRowEl: DebugElement = thirdRowEl.children[2];

    const actual = thirdColOfThirdRowEl.nativeElement.innerHTML;

    expect(actual).withContext('course should be set').toContain(expected);
  });

  it('should set opacity', () => {
    const expected = 0.42;
    componentInstance.opacity = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const containerEl: DebugElement = debugEl.children[0];

    // first row
    const firstRowEl: DebugElement = containerEl.children[0];
    const firstColOfFirstRowEl: DebugElement = firstRowEl.children[0];
    const nameParagraphEl: DebugElement = firstColOfFirstRowEl.children[0];

    const actualNameOpacity = nameParagraphEl.styles['opacity'];
    expect(actualNameOpacity)
      .withContext('name opacity should be set')
      .toBe(expected.toString());

    // second row
    const secondRowEl: DebugElement = containerEl.children[1];
    const firstColOfSecondRowEl: DebugElement = secondRowEl.children[0];
    const commentEl: DebugElement = firstColOfSecondRowEl.children[0];
    const actualCommentOpacity = commentEl.styles['opacity'];
    expect(actualCommentOpacity)
      .withContext('coment opacity should be set')
      .toBe(expected.toString());

    const actualTestimonialOpacity =
      firstColOfSecondRowEl.children[1].styles['opacity'];
    expect(actualTestimonialOpacity)
      .withContext('testimonial opacity should be set')
      .toBe(expected.toString());

    // third row
    const thirdRowEl: DebugElement = containerEl.children[2];

    // cols of third row
    const secondColOfThirdRowEl: DebugElement = thirdRowEl.children[1];
    const actualDateOpacity = secondColOfThirdRowEl.styles['opacity'];
    expect(actualDateOpacity)
      .withContext('date opacity should be set')
      .toBe(expected.toString());

    const thirdColOfThirdRowEl: DebugElement = thirdRowEl.children[2];
    const actualCourseOpacity = thirdColOfThirdRowEl.styles['opacity'];
    expect(actualCourseOpacity)
      .withContext('course opacity should be set')
      .toBe(expected.toString());
  });
});
