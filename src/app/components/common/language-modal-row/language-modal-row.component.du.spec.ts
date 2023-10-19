import { LogService } from 'src/app/services/log/log.service';
import { DebugElement } from '@angular/core';
import { LanguageModalRowComponent } from './language-modal-row.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('ButtonBarOnHoverComponent - dom unit', () => {
  let fixture: ComponentFixture<LanguageModalRowComponent>;
  let componentInstance: LanguageModalRowComponent;
  let logServiceGlobalSpy: jasmine.SpyObj<LogService>;
  let logServiceSpy: jasmine.SpyObj<LogService>;

  beforeEach(waitForAsync(() => {
    logServiceGlobalSpy = jasmine.createSpyObj('LogService', ['withClassName']);
    logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
    logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

    TestBed.configureTestingModule({
      imports: [LanguageModalRowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageModalRowComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance)
      .withContext('component should create')
      .toEqual(jasmine.anything());
  });

  it('should have languageName', () => {
    const expected = 'this is a test';

    componentInstance.languageName = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.children[0].children[0].nativeElement.innerHTML)
      .withContext('language name should be set')
      .toBe(expected);
  });
  it('should have flagSelectors - 1', () => {
    const expectedSelector = 'test';

    // 1 flag
    componentInstance.flagSelectors = [expectedSelector];
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl1: DebugElement = debugEl.children[0];

    expect(
      firstDivEl1.children[2].children[0].classes['fi-' + expectedSelector]
    )
      .withContext('should have expected class')
      .toBeTrue();
  });
  it('should have flagSelectors - 2', () => {
    const expectedSelector1 = 'test';
    const expectedSelector2 = 'other-test';

    // 2 flags
    componentInstance.flagSelectors = [expectedSelector1, expectedSelector2];
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl1: DebugElement = debugEl.children[0];

    expect(
      firstDivEl1.children[1].children[0].classes['fi-' + expectedSelector1]
    )
      .withContext('should have expected class - 1')
      .toBeTrue();

    expect(
      firstDivEl1.children[2].children[0].classes['fi-' + expectedSelector2]
    )
      .withContext('should have expected class - 2')
      .toBeTrue();
  });
  it('should have isCurrent', () => {
    // true
    componentInstance.isCurrent = true;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.classes['selected-row'])
      .withContext('should have css class - isCurrent true')
      .toBeTrue();
    expect(firstDivEl.classes['unselected-row'])
      .withContext('should not have css class - isCurrent true')
      .toBeUndefined();

    // false
    componentInstance.isCurrent = false;
    fixture.detectChanges();

    expect(firstDivEl.classes['selected-row'])
      .withContext('should not have css class - isCurrent false')
      .toBeUndefined();
    expect(firstDivEl.classes['unselected-row'])
      .withContext('should have css class - isCurrent false')
      .toBeTrue();
  });
  it('should have isFirstRow', () => {
    // true
    componentInstance.isFirstRow = true;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.classes['first-row'])
      .withContext('should have css class - isFirstRow true')
      .toBeTrue();

    // false
    componentInstance.isFirstRow = false;
    fixture.detectChanges();

    expect(firstDivEl.classes['first-row'])
      .withContext('should not have css class - isFirstRow false')
      .toBeUndefined();
  });
  it('should have isLastRow', () => {
    // true
    componentInstance.isLastRow = true;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.classes['last-row'])
      .withContext('should have css class - isLastRow true')
      .toBeTrue();

    // false
    componentInstance.isLastRow = false;
    fixture.detectChanges();

    expect(firstDivEl.classes['last-row'])
      .withContext('should not have css class - isLastRow false')
      .toBeUndefined();
  });
  it('sould have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).withContext('1 child at root').toBe(1);
    expect(debugEl.children[0].nativeElement.tagName)
      .withContext('child 1 at root is DIV')
      .toBe('DIV');

    // 1 flag
    componentInstance.flagSelectors = ['xx'];
    fixture.detectChanges();

    const firstDivEl1: DebugElement = debugEl.children[0];

    expect(firstDivEl1.children.length)
      .withContext('div should have 3 children')
      .toBe(3);
    expect(firstDivEl1.children[0].nativeElement.tagName)
      .withContext('child 1 of div should be DIV')
      .toBe('DIV');
    expect(firstDivEl1.children[1].nativeElement.tagName)
      .withContext('child 2 of div should be DIV')
      .toBe('DIV');
    expect(firstDivEl1.children[2].nativeElement.tagName)
      .withContext('child 3 of div should be DIV')
      .toBe('DIV');

    expect(firstDivEl1.children[0].children.length)
      .withContext('child 1 of of div should have 1 child')
      .toBe(1);
    expect(firstDivEl1.children[0].children[0].nativeElement.tagName)
      .withContext('child 1 of child 1 of div should be SPAN')
      .toBe('SPAN');
    expect(firstDivEl1.children[0].children[0].children.length)
      .withContext('child 1 of child 1 of div should have no children')
      .toBe(0);

    expect(firstDivEl1.children[1].children.length)
      .withContext('child 2 of of div should have no children')
      .toBe(0);

    expect(firstDivEl1.children[2].children.length)
      .withContext('child 3 of of div should have no children')
      .toBe(1);
    expect(firstDivEl1.children[2].children[0].nativeElement.tagName)
      .withContext('child 1 of child 3 of div should be SPAN')
      .toBe('SPAN');
    expect(firstDivEl1.children[2].children[0].children.length)
      .withContext('child 1 of child 3 of div should have no children')
      .toBe(0);

    // 2 flags
    componentInstance.flagSelectors = ['xx', 'xx'];
    fixture.detectChanges();

    const firstDivEl2: DebugElement = debugEl.children[0];

    expect(firstDivEl2.children.length)
      .withContext('div should have 3 children')
      .toBe(3);
    expect(firstDivEl2.children[0].nativeElement.tagName)
      .withContext('child 1 of div should be DIV')
      .toBe('DIV');
    expect(firstDivEl2.children[1].nativeElement.tagName)
      .withContext('child 2 of div should be DIV')
      .toBe('DIV');
    expect(firstDivEl2.children[2].nativeElement.tagName)
      .withContext('child 3 of div should be DIV')
      .toBe('DIV');

    expect(firstDivEl2.children[0].children.length)
      .withContext('child 1 of of div should have 1 child')
      .toBe(1);
    expect(firstDivEl2.children[0].children[0].nativeElement.tagName)
      .withContext('child 1 of child 1 of div should be SPAN')
      .toBe('SPAN');
    expect(firstDivEl2.children[0].children[0].children.length)
      .withContext('child 1 of child 1 of div should have no children')
      .toBe(0);

    expect(firstDivEl2.children[1].children.length)
      .withContext('child 2 of of div should have no children')
      .toBe(1);
    expect(firstDivEl2.children[1].children[0].nativeElement.tagName)
      .withContext('child 1 of child 2 of div should be SPAN')
      .toBe('SPAN');
    expect(firstDivEl2.children[1].children[0].children.length)
      .withContext('child 1 of child 2 of div should have no children')
      .toBe(0);

    expect(firstDivEl2.children[2].children.length)
      .withContext('child 3 of of div should have no children')
      .toBe(1);
    expect(firstDivEl2.children[2].children[0].nativeElement.tagName)
      .withContext('child 1 of child 3 of div should be SPAN')
      .toBe('SPAN');
    expect(firstDivEl2.children[2].children[0].children.length)
      .withContext('child 1 of child 3 of div should have no children')
      .toBe(0);
  });
});
