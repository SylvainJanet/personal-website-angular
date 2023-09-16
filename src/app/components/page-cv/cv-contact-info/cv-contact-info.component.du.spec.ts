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
  const expectedEmailAdress = 'contact@sylvainjanet.fr';
  const expectedPhoneNumber = '06&nbsp;62&nbsp;02&nbsp;14&nbsp;12';

  beforeEach(waitForAsync(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['get']);

    const nameObs = of(expectedName);
    const sjObs = of(expectedSj);
    const profileObs = of(expectedProfile);
    const fsDevObs = of(expectedFsDev);
    const emailObs = of(expectedEmail);
    const phoneObs = of(expectedPhone);
    textServiceSpy.get.and.returnValues(
      nameObs,
      sjObs,
      profileObs,
      fsDevObs,
      emailObs,
      phoneObs
    );
    TestBed.configureTestingModule({
      declarations: [CvContactInfoComponent],
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
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  });

  it('should have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).toBe(1);
    expect(debugEl.children[0].nativeElement.tagName).toBe('DIV');

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.children.length).toBe(4);
    expect(firstDivEl.children[0].nativeElement.tagName).toBe('P');
    expect(firstDivEl.children[1].nativeElement.tagName).toBe('P');
    expect(firstDivEl.children[2].nativeElement.tagName).toBe('P');
    expect(firstDivEl.children[3].nativeElement.tagName).toBe('P');

    let pEl: DebugElement = firstDivEl.children[0];
    expect(pEl.children.length).toBe(2);
    expect(pEl.children[0].nativeElement.tagName).toBe('STRONG');
    expect(pEl.children[1].nativeElement.tagName).toBe('SPAN');

    pEl = firstDivEl.children[1];
    expect(pEl.children.length).toBe(2);
    expect(pEl.children[0].nativeElement.tagName).toBe('STRONG');
    expect(pEl.children[1].nativeElement.tagName).toBe('SPAN');

    pEl = firstDivEl.children[2];
    expect(pEl.children.length).toBe(2);
    expect(pEl.children[0].nativeElement.tagName).toBe('STRONG');
    expect(pEl.children[1].nativeElement.tagName).toBe('A');

    pEl = firstDivEl.children[3];
    expect(pEl.children.length).toBe(2);
    expect(pEl.children[0].nativeElement.tagName).toBe('STRONG');
    expect(pEl.children[1].nativeElement.tagName).toBe('SPAN');
  });

  it('should have content set by textService', () => {
    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];

    let pEl: DebugElement = firstDivEl.children[0];
    expect(pEl.children.length).toBe(2);
    expect(pEl.children[0].nativeElement.innerHTML).toBe(expectedName + ': ');
    expect(pEl.children[1].nativeElement.innerHTML).toBe(expectedSj);

    pEl = firstDivEl.children[1];
    expect(pEl.children.length).toBe(2);
    expect(pEl.children[0].nativeElement.innerHTML).toBe(
      expectedProfile + ': '
    );
    expect(pEl.children[1].nativeElement.innerHTML).toBe(expectedFsDev);

    pEl = firstDivEl.children[2];
    expect(pEl.children.length).toBe(2);
    expect(pEl.children[0].nativeElement.innerHTML).toBe(expectedEmail + ': ');
    expect(pEl.children[1].nativeElement.innerHTML).toBe(expectedEmailAdress);

    pEl = firstDivEl.children[3];
    expect(pEl.children.length).toBe(2);
    expect(pEl.children[0].nativeElement.innerHTML).toBe(expectedPhone + ': ');
    expect(pEl.children[1].nativeElement.innerHTML).toBe(expectedPhoneNumber);
  });
});
