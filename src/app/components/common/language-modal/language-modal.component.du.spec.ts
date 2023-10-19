import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { LanguageModalComponent } from './language-modal.component';
import { ImageService } from 'src/app/services/image/image.service';
import { DebugElement } from '@angular/core';
import { LanguageModalRowComponent } from '../language-modal-row/language-modal-row.component';

describe('LanguageModalComponent - dom unit', () => {
  let fixture: ComponentFixture<LanguageModalComponent>;
  let componentInstance: LanguageModalComponent;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;

  const expectedEnglishName = 'test english';
  const expectedFrenchName = 'test french';

  beforeEach(waitForAsync(() => {
    preloaderServiceSpy = jasmine.createSpyObj(
      'PreloaderService',
      ['isLoading'],
      []
    );
    imageServiceSpy = jasmine.createSpyObj('ImageService', [
      'imageLoading',
      'imageLoadedOrError',
    ]);
    visibleToLoadTextServiceSpy = jasmine.createSpyObj(
      'VisibleToLoadTextServiceSpy',
      ['hasTextLoaded', 'subscribe', 'unsubscribe', 'textLoaded'],
      []
    );
    textServiceSpy = jasmine.createSpyObj('TextService', ['getTextInLanguage']);

    const expectedMessage1 = of(expectedEnglishName);
    const expectedMessage2 = of(expectedFrenchName);
    textServiceSpy.getTextInLanguage.and.returnValues(
      expectedMessage1,
      expectedMessage2
    );
    TestBed.configureTestingModule({
      providers: [
        { provide: TextService, useValue: textServiceSpy },
        { provide: PreloaderService, useValue: preloaderServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy },
        {
          provide: VisibleToLoadTextService,
          useValue: visibleToLoadTextServiceSpy,
        },
      ],
    }).compileComponents();
  }));

  describe('constructor', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(LanguageModalComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(componentInstance)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });
  });

  describe('DOM', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(LanguageModalComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have proper dom structure', () => {
      // loaded
      componentInstance.updateTexts();
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).withContext('5 children at root').toBe(5);
      expect(debugEl.children[0].nativeElement.tagName)
        .withContext('child 1 at root is DIV')
        .toBe('DIV');
      expect(debugEl.children[1].nativeElement.tagName)
        .withContext('child 2 at root is DIV')
        .toBe('DIV');
      expect(debugEl.children[2].nativeElement.tagName)
        .withContext('child 3 at root is DIV')
        .toBe('DIV');
      expect(debugEl.children[3].nativeElement.tagName)
        .withContext('child 4 at root is DIV')
        .toBe('DIV');
      expect(debugEl.children[4].nativeElement.tagName)
        .withContext('child 5 at root is DIV')
        .toBe('DIV');

      // imgs

      let imgDivEl = debugEl.children[0];
      expect(imgDivEl.children.length)
        .withContext('child 1 at root has 2 children')
        .toBe(2);
      expect(imgDivEl.children[0].nativeElement.tagName)
        .withContext('child 1 of child 1 at root is IMG')
        .toBe('IMG');
      expect(imgDivEl.children[1].nativeElement.tagName)
        .withContext('child 2 of child 1 at root is SPAN')
        .toBe('SPAN');
      expect(imgDivEl.children[1].children.length)
        .withContext('child 2 of child 1 at root should have no children')
        .toBe(0);

      imgDivEl = debugEl.children[1];
      expect(imgDivEl.children.length)
        .withContext('child 2 at root has 2 children')
        .toBe(2);
      expect(imgDivEl.children[0].nativeElement.tagName)
        .withContext('child 1 of child 2 at root is IMG')
        .toBe('IMG');
      expect(imgDivEl.children[1].nativeElement.tagName)
        .withContext('child 2 of child 2 at root is SPAN')
        .toBe('SPAN');
      expect(imgDivEl.children[1].children.length)
        .withContext('child 2 of child 2 at root should have no children')
        .toBe(0);

      imgDivEl = debugEl.children[2];
      expect(imgDivEl.children.length)
        .withContext('child 3 at root has 2 children')
        .toBe(2);
      expect(imgDivEl.children[0].nativeElement.tagName)
        .withContext('child 3 of child 1 at root is IMG')
        .toBe('IMG');
      expect(imgDivEl.children[1].nativeElement.tagName)
        .withContext('child 2 of child 3 at root is SPAN')
        .toBe('SPAN');
      expect(imgDivEl.children[1].children.length)
        .withContext('child 2 of child 3 at root should have no children')
        .toBe(0);

      imgDivEl = debugEl.children[3];
      expect(imgDivEl.children.length)
        .withContext('child 4 at root has 2 children')
        .toBe(2);
      expect(imgDivEl.children[0].nativeElement.tagName)
        .withContext('child 1 of child 4 at root is IMG')
        .toBe('IMG');
      expect(imgDivEl.children[1].nativeElement.tagName)
        .withContext('child 2 of child 4 at root is SPAN')
        .toBe('SPAN');
      expect(imgDivEl.children[1].children.length)
        .withContext('child 2 of child 4 at root should have no children')
        .toBe(0);

      const modalDivEl: DebugElement = debugEl.children[4];

      expect(modalDivEl.children.length)
        .withContext('modal should have 1 child')
        .toBe(1);

      expect(modalDivEl.children[0].nativeElement.tagName)
        .withContext('child 1 of modal should be DIV')
        .toBe('DIV');

      const modalContent = modalDivEl.children[0];

      expect(modalContent.children.length)
        .withContext('modal content should have 1 child')
        .toBe(1);

      expect(modalDivEl.children[0].nativeElement.tagName)
        .withContext('child 1 of modal content should be DIV')
        .toBe('DIV');

      const modalConainer = modalContent.children[0];

      expect(modalConainer.children.length)
        .withContext('modal container should have 2 children')
        .toBe(2);

      expect(modalConainer.children[0].nativeElement.tagName)
        .withContext(
          'child 1 of modal container should be APP-LANGUAGE-MODAL-ROW'
        )
        .toBe('APP-LANGUAGE-MODAL-ROW');
      expect(modalConainer.children[1].nativeElement.tagName)
        .withContext(
          'child 2 of modal container should be APP-LANGUAGE-MODAL-ROW'
        )
        .toBe('APP-LANGUAGE-MODAL-ROW');

      //loading
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(false);
      preloaderServiceSpy.isLoading.and.returnValue(true);
      fixture.detectChanges();

      const debugElLoading: DebugElement = fixture.debugElement;

      expect(debugElLoading.children.length)
        .withContext('5 children at root')
        .toBe(5);
      expect(debugElLoading.children[0].nativeElement.tagName)
        .withContext('child 1 at root is DIV')
        .toBe('DIV');
      expect(debugElLoading.children[1].nativeElement.tagName)
        .withContext('child 2 at root is DIV')
        .toBe('DIV');
      expect(debugElLoading.children[2].nativeElement.tagName)
        .withContext('child 3 at root is DIV')
        .toBe('DIV');
      expect(debugElLoading.children[3].nativeElement.tagName)
        .withContext('child 4 at root is DIV')
        .toBe('DIV');
      expect(debugElLoading.children[4].nativeElement.tagName)
        .withContext('child 5 at root is DIV')
        .toBe('DIV');

      // imgs

      let imgDivElLoading = debugEl.children[0];
      expect(imgDivElLoading.children.length)
        .withContext('child 1 at root has 2 children')
        .toBe(2);
      expect(imgDivElLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of child 1 at root is IMG')
        .toBe('IMG');
      expect(imgDivElLoading.children[1].nativeElement.tagName)
        .withContext('child 2 of child 1 at root is SPAN')
        .toBe('SPAN');
      expect(imgDivElLoading.children[1].children.length)
        .withContext('child 2 of child 1 at root should have no children')
        .toBe(0);

      imgDivElLoading = debugEl.children[1];
      expect(imgDivElLoading.children.length)
        .withContext('child 2 at root has 2 children')
        .toBe(2);
      expect(imgDivElLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of child 2 at root is IMG')
        .toBe('IMG');
      expect(imgDivElLoading.children[1].nativeElement.tagName)
        .withContext('child 2 of child 2 at root is SPAN')
        .toBe('SPAN');
      expect(imgDivElLoading.children[1].children.length)
        .withContext('child 2 of child 2 at root should have no children')
        .toBe(0);

      imgDivElLoading = debugEl.children[2];
      expect(imgDivElLoading.children.length)
        .withContext('child 3 at root has 2 children')
        .toBe(2);
      expect(imgDivElLoading.children[0].nativeElement.tagName)
        .withContext('child 3 of child 1 at root is IMG')
        .toBe('IMG');
      expect(imgDivElLoading.children[1].nativeElement.tagName)
        .withContext('child 2 of child 3 at root is SPAN')
        .toBe('SPAN');
      expect(imgDivElLoading.children[1].children.length)
        .withContext('child 2 of child 3 at root should have no children')
        .toBe(0);

      imgDivElLoading = debugEl.children[3];
      expect(imgDivElLoading.children.length)
        .withContext('child 4 at root has 2 children')
        .toBe(2);
      expect(imgDivElLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of child 4 at root is IMG')
        .toBe('IMG');
      expect(imgDivElLoading.children[1].nativeElement.tagName)
        .withContext('child 2 of child 4 at root is SPAN')
        .toBe('SPAN');
      expect(imgDivElLoading.children[1].children.length)
        .withContext('child 2 of child 4 at root should have no children')
        .toBe(0);

      const modalDivElLoading: DebugElement = debugEl.children[4];

      expect(modalDivElLoading.children.length)
        .withContext('modal should have 1 child')
        .toBe(1);

      expect(modalDivElLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of modal should be DIV')
        .toBe('DIV');

      const modalContentLoading = modalDivEl.children[0];

      expect(modalContentLoading.children.length)
        .withContext('modal content should have 1 child')
        .toBe(1);

      expect(modalDivElLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of modal content should be DIV')
        .toBe('DIV');

      const modalConainerLoading = modalContent.children[0];

      expect(modalConainerLoading.children.length)
        .withContext('modal container should have 4 children')
        .toBe(4);

      expect(modalConainerLoading.children[0].nativeElement.tagName)
        .withContext(
          'child 1 of modal container should be MAT-PROGRESS-SPINNER'
        )
        .toBe('MAT-PROGRESS-SPINNER');
      expect(modalConainerLoading.children[1].nativeElement.tagName)
        .withContext(
          'child 2 of modal container should be APP-LANGUAGE-MODAL-ROW'
        )
        .toBe('APP-LANGUAGE-MODAL-ROW');

      expect(modalConainerLoading.children[2].nativeElement.tagName)
        .withContext(
          'child 3 of modal container should be MAT-PROGRESS-SPINNER'
        )
        .toBe('MAT-PROGRESS-SPINNER');
      expect(modalConainerLoading.children[3].nativeElement.tagName)
        .withContext(
          'child 4 of modal container should be APP-LANGUAGE-MODAL-ROW'
        )
        .toBe('APP-LANGUAGE-MODAL-ROW');
    });

    it('should have content set by textService', async () => {
      componentInstance.updateTexts();
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      const modalDivEl: DebugElement = debugEl.children[4];
      const modalContent = modalDivEl.children[0];
      const modalConainer = modalContent.children[0];

      const row1El = modalConainer.children[0];
      const row2El = modalConainer.children[1];

      const row1Comp = row1El.componentInstance as LanguageModalRowComponent;
      const row2Comp = row2El.componentInstance as LanguageModalRowComponent;

      expect(row1Comp.languageName)
        .withContext('english should be set')
        .toBe(expectedEnglishName);
      expect(row2Comp.languageName)
        .withContext('french should be set')
        .toBe(expectedFrenchName);
    });
  });
});
