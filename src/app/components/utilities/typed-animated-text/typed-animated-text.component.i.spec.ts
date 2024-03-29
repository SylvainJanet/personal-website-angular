import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { TypedAnimatedTextComponent } from './typed-animated-text.component';
import { ElementRef } from '@angular/core';

describe('TypedAnimatedTextComponent - integration', () => {
  let component: TypedAnimatedTextComponent;
  let textElement: jasmine.SpyObj<ElementRef>;
  let blinkElement: jasmine.SpyObj<ElementRef>;
  const typingSpeed = 8;
  const deleteSpeed = 3;
  const deleteDelay = 11;

  beforeEach(() => {
    textElement = jasmine.createSpyObj('ElementRef', [], {
      nativeElement: document.createElement('DIV'),
    });
    blinkElement = jasmine.createSpyObj('ElementRef', [], {
      nativeElement: document.createElement('DIV'),
    });

    TestBed.configureTestingModule({
      imports: [TypedAnimatedTextComponent],
      providers: [TypedAnimatedTextComponent],
    }).compileComponents();

    TypedAnimatedTextComponent.prototype.textElement = textElement;
    TypedAnimatedTextComponent.prototype.blinkElement = blinkElement;

    component = TestBed.createComponent(
      TypedAnimatedTextComponent
    ).componentInstance;
  });

  afterEach(() => {
    TypedAnimatedTextComponent.prototype.textElement = new ElementRef(
      document.createElement('div')
    );
    TypedAnimatedTextComponent.prototype.blinkElement = new ElementRef(
      document.createElement('div')
    );
  });

  describe('typingEffect', () => {
    beforeEach(() => {
      component.typingSpeed = typingSpeed;
      component.deleteSpeed = deleteSpeed;
      component.deleteDelay = deleteDelay;
      component.textArray = ['one', 'test'];
      component['i'] = 0;
    });
    describe('should type the word letter by letter, and then call the deletingEffect method, then delete the word letter by letter, then repeat for the next word', () => {
      it('1 - type first letter - first word', fakeAsync(() => {
        component.typingEffect();
        spyOn(component, 'deletingEffect').and.returnValue();

        const actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).withContext('text should be set').toBe('o');
        flush();
      }));
      it('2 - type second letter - first word', fakeAsync(() => {
        component.typingEffect();
        spyOn(component, 'deletingEffect').and.returnValue();

        tick(typingSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('o');

        tick(typingSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('on');
        flush();
      }));
      it('3 - type third letter - first word', fakeAsync(() => {
        component.typingEffect();
        spyOn(component, 'deletingEffect').and.returnValue();

        tick((typingSpeed * 3) / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('on');

        tick(typingSpeed / 2);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('one');
        flush();
      }));
      it('4 - call deletingEffect method - first word', fakeAsync(() => {
        component.typingEffect();
        spyOn(component, 'deletingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay / 2);

        const actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).withContext('text should be set').toBe('one');
        expect(component.deletingEffect)
          .withContext(
            'deleting effect should not have been called before tick'
          )
          .not.toHaveBeenCalled();

        tick(deleteDelay / 2);
        expect(component.deletingEffect)
          .withContext('deleting effect should have been called after tick')
          .toHaveBeenCalledTimes(1);
        flush();
      }));
      it('5 - delete first letter - first word', fakeAsync(() => {
        component.typingEffect();
        spyOn(component, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('one');

        tick(deleteDelay / 2);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('on');
        flush();
      }));
      it('6 - delete second letter - first word', fakeAsync(() => {
        component.typingEffect();
        spyOn(component, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('on');

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('o');
        flush();
      }));
      it('7 - delete third letter - first word', fakeAsync(() => {
        component.typingEffect();
        spyOn(component, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay + (deleteSpeed * 3) / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('o');

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('');
        flush();
      }));
      it('8 - change index - first word', fakeAsync(() => {
        component.typingEffect();
        spyOn(component, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay + (deleteSpeed * 5) / 2);

        let actualI = component['i'];
        expect(actualI).withContext('index should be set before tick').toBe(0);

        tick(deleteSpeed);

        actualI = component['i'];
        expect(actualI).withContext('index should be set after tick').toBe(1);
        flush();
      }));
      it('9 - call typingEffect method - first word', fakeAsync(() => {
        component.typingEffect();
        spyOn(component, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay + (deleteSpeed * 5) / 2);

        expect(component.typingEffect)
          .withContext('typingEffect should not have been called before tick')
          .not.toHaveBeenCalled();

        tick(deleteSpeed);

        expect(component.typingEffect)
          .withContext('typingEffect should have been called after tick')
          .toHaveBeenCalledTimes(1);
        flush();
      }));
      it('10 - type first letter - second word', fakeAsync(() => {
        component.typingEffect();

        tick(typingSpeed * 3 + deleteDelay + (deleteSpeed * 5) / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('');

        tick(deleteSpeed);
        spyOn(component, 'deletingEffect').and.returnValue();

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('t');

        flush();
      }));
      it('11 - type second letter - second word', fakeAsync(() => {
        component.typingEffect();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed * 3);
        spyOn(component, 'deletingEffect').and.returnValue();

        tick(typingSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('t');

        tick(typingSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('te');

        flush();
      }));
      it('12 - type third letter - second word', fakeAsync(() => {
        component.typingEffect();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed * 3 + typingSpeed);
        spyOn(component, 'deletingEffect').and.returnValue();

        tick(typingSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('te');

        tick(typingSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('tes');

        flush();
      }));
      it('13 - type forth letter - second word', fakeAsync(() => {
        component.typingEffect();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed * 3 + typingSpeed * 2);
        spyOn(component, 'deletingEffect').and.returnValue();

        tick(typingSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('tes');

        tick(typingSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('test');

        flush();
      }));
      it('14 - call deletingEffect method - second word', fakeAsync(() => {
        component.typingEffect();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed * 3 + typingSpeed * 4);
        spyOn(component, 'deletingEffect').and.returnValue();

        tick(deleteDelay / 2);

        expect(component.deletingEffect)
          .withContext('deletingEffect should not have been called before tick')
          .not.toHaveBeenCalled();

        tick(deleteDelay);

        expect(component.deletingEffect)
          .withContext('deletingEffect should have been called after tick')
          .toHaveBeenCalledTimes(1);

        flush();
      }));
      it('15 - delete first letter - second word', fakeAsync(() => {
        component.typingEffect();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay
        );

        spyOn(component, 'typingEffect').and.returnValue();

        tick(deleteSpeed / 2);

        const actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).withContext('text should be set').toBe('tes');

        flush();
      }));
      it('16 - delete second letter - second word', fakeAsync(() => {
        component.typingEffect();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay
        );

        spyOn(component, 'typingEffect').and.returnValue();

        tick(deleteSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('tes');

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('te');

        flush();
      }));
      it('17 - delete third letter - second word', fakeAsync(() => {
        component.typingEffect();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay +
            deleteSpeed
        );

        spyOn(component, 'typingEffect').and.returnValue();

        tick(deleteSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('te');

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('t');

        flush();
      }));
      it('18 - delete forth letter - second word', fakeAsync(() => {
        component.typingEffect();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay +
            deleteSpeed * 2
        );

        spyOn(component, 'typingEffect').and.returnValue();

        tick(deleteSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('t');

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('');

        flush();
      }));
      it('19 - change index - second word', fakeAsync(() => {
        component.typingEffect();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay +
            (deleteSpeed * 7) / 2
        );
        spyOn(component, 'typingEffect').and.returnValue();

        let actualI = component['i'];
        expect(actualI).withContext('index should be set before tick').toBe(1);

        tick(deleteSpeed);

        actualI = component['i'];
        expect(actualI).withContext('index should be set after tick').toBe(0);
        flush();
      }));
      it('20 - call typingEffect method - first word', fakeAsync(() => {
        component.typingEffect();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay +
            (deleteSpeed * 7) / 2
        );
        spyOn(component, 'typingEffect').and.returnValue();

        expect(component.typingEffect)
          .withContext('typingEffect should not have been called before tick')
          .not.toHaveBeenCalled();

        tick(deleteSpeed);

        expect(component.typingEffect)
          .withContext('typingEffect should not have been called after tick')
          .toHaveBeenCalledTimes(1);
        flush();
      }));
    });
  });
});
