import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CvContactInfoComponent } from './cv-contact-info.component';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';

describe('CvContactInfoComponent - dom unit', () => {
  let fixture: ComponentFixture<CvContactInfoComponent>;
  let componentInstance: CvContactInfoComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  const expectedName = 'test name';
  const expectedSj = 'test sj';
  const expectedProfile = 'test profile';
  const expectedFsDev = 'test fsDev';
  const expectedEmail = 'test email';
  const expectedPhone = 'test phone';
  const expectedEmailAddress = 'contact@sylvainjanet.fr';
  const expectedPhoneNumber = '06&nbsp;62&nbsp;02&nbsp;14&nbsp;12';

  beforeEach(waitForAsync(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);

    const expectedMessages = of([
      expectedName,
      expectedSj,
      expectedProfile,
      expectedFsDev,
      expectedEmail,
      expectedPhone,
    ]);
    textServiceSpy.getMulti.and.returnValues(expectedMessages);
    TestBed.configureTestingModule({
      imports: [CvContactInfoComponent],
      providers: [
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvContactInfoComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance)
      .withContext('component should create')
      .toBeTruthy();
  });

  it('should have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).withContext('1 child at root').toBe(1);
    expect(debugEl.children[0].nativeElement.tagName)
      .withContext('child 1 at root is DIV')
      .toBe('DIV');

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.children.length)
      .withContext('div should have 4 children')
      .toBe(4);
    expect(firstDivEl.children[0].nativeElement.tagName)
      .withContext('child 1 of div should be P')
      .toBe('P');
    expect(firstDivEl.children[1].nativeElement.tagName)
      .withContext('child 2 of div should be P')
      .toBe('P');
    expect(firstDivEl.children[2].nativeElement.tagName)
      .withContext('child 3 of div should be P')
      .toBe('P');
    expect(firstDivEl.children[3].nativeElement.tagName)
      .withContext('child 4 of div should be P')
      .toBe('P');

    let pEl: DebugElement = firstDivEl.children[0];
    expect(pEl.children.length)
      .withContext('P 1 should have 2 children')
      .toBe(2);
    expect(pEl.children[0].nativeElement.tagName)
      .withContext('child 1 of P 1 should have be STRONG')
      .toBe('STRONG');
    expect(pEl.children[1].nativeElement.tagName)
      .withContext('child 2 of P 1 should have be SPAN')
      .toBe('SPAN');

    pEl = firstDivEl.children[1];
    expect(pEl.children.length)
      .withContext('P 2 should have 2 children')
      .toBe(2);
    expect(pEl.children[0].nativeElement.tagName)
      .withContext('child 1 of P 2 should have be STRONG')
      .toBe('STRONG');
    expect(pEl.children[1].nativeElement.tagName)
      .withContext('child 2 of P 2 should have be SPAN')
      .toBe('SPAN');

    pEl = firstDivEl.children[2];
    expect(pEl.children.length)
      .withContext('P 3 should have 2 children')
      .toBe(2);
    expect(pEl.children[0].nativeElement.tagName)
      .withContext('child 1 of P 3 should have be STRONG')
      .toBe('STRONG');
    expect(pEl.children[1].nativeElement.tagName)
      .withContext('child 2 of P 3 should have be A')
      .toBe('A');

    pEl = firstDivEl.children[3];
    expect(pEl.children.length)
      .withContext('P 4 should have 2 children')
      .toBe(2);
    expect(pEl.children[0].nativeElement.tagName)
      .withContext('child 1 of P 4 should have be STRONG')
      .toBe('STRONG');
    expect(pEl.children[1].nativeElement.tagName)
      .withContext('child 2 of P 4 should have be SPAN')
      .toBe('SPAN');
  });

  it('should have content set by textService', () => {
    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];

    let pEl: DebugElement = firstDivEl.children[0];
    expect(pEl.children[0].nativeElement.innerHTML)
      .withContext('name should be set')
      .toBe(expectedName + ': ');
    expect(pEl.children[1].nativeElement.innerHTML)
      .withContext('sj should be set')
      .toBe(expectedSj);

    pEl = firstDivEl.children[1];
    expect(pEl.children[0].nativeElement.innerHTML)
      .withContext('profile should be set')
      .toBe(expectedProfile + ': ');
    expect(pEl.children[1].nativeElement.innerHTML)
      .withContext('fsdev should be set')
      .toBe(expectedFsDev);

    pEl = firstDivEl.children[2];
    expect(pEl.children[0].nativeElement.innerHTML)
      .withContext('email should be set')
      .toBe(expectedEmail + ': ');
    expect(pEl.children[1].nativeElement.innerHTML)
      .withContext('email address should be set')
      .toBe(expectedEmailAddress);

    pEl = firstDivEl.children[3];
    expect(pEl.children[0].nativeElement.innerHTML)
      .withContext('phone should be set')
      .toBe(expectedPhone + ': ');
    expect(pEl.children[1].nativeElement.innerHTML)
      .withContext('phone number should be set')
      .toBe(expectedPhoneNumber);
  });
});
