import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { TypedAnimatedTextComponent } from './typed-animated-text.component';
import { ElementRef, Renderer2 } from '@angular/core';

describe('TypedAnimatedTextComponent - integration', () => {
  let typedAnimatedTextComponent: TypedAnimatedTextComponent;
  let textElement: jasmine.SpyObj<ElementRef>;
  let blinkElement: jasmine.SpyObj<ElementRef>;
  const typingSpeed = 8;
  const deleteSpeed = 3;
  const deleteDelay = 11;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypedAnimatedTextComponent, Renderer2],
    });
    typedAnimatedTextComponent = TestBed.inject(TypedAnimatedTextComponent);
  });

  describe('typingEffect', () => {
    beforeEach(() => {
      textElement = jasmine.createSpyObj(
        'ElementRef',
        {},
        { nativeElement: document.createElement('DIV') }
      );
      blinkElement = jasmine.createSpyObj(
        'ElementRef',
        {},
        { nativeElement: document.createElement('DIV') }
      );

      typedAnimatedTextComponent.textElement = textElement;
      typedAnimatedTextComponent.blinkElement = blinkElement;

      typedAnimatedTextComponent.typingSpeed = typingSpeed;
      typedAnimatedTextComponent.deleteSpeed = deleteSpeed;
      typedAnimatedTextComponent.deleteDelay = deleteDelay;

      typedAnimatedTextComponent.textArray = ['one', 'test'];
      typedAnimatedTextComponent['i'] = 0;
    });
    describe('should type the word letter by letter, and then call the deletingEffect method, then delete the word letter by letter, then repeat for the next word', () => {
      it('1 - type first letter - first word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();
        spyOn(typedAnimatedTextComponent, 'deletingEffect').and.returnValue();

        const actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('o');
        flush();
      }));
      it('2 - type second letter - first word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();
        spyOn(typedAnimatedTextComponent, 'deletingEffect').and.returnValue();

        tick(typingSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('o');

        tick(typingSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('on');
        flush();
      }));
      it('3 - type third letter - first word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();
        spyOn(typedAnimatedTextComponent, 'deletingEffect').and.returnValue();

        tick((typingSpeed * 3) / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('on');

        tick(typingSpeed / 2);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('one');
        flush();
      }));
      it('4 - call deletingEffect method - first word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();
        spyOn(typedAnimatedTextComponent, 'deletingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay / 2);

        const actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('one');
        expect(
          typedAnimatedTextComponent.deletingEffect
        ).not.toHaveBeenCalled();

        tick(deleteDelay / 2);
        expect(typedAnimatedTextComponent.deletingEffect).toHaveBeenCalledTimes(
          1
        );
        flush();
      }));
      it('5 - delete first letter - first word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();
        spyOn(typedAnimatedTextComponent, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('one');

        tick(deleteDelay / 2);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('on');
        flush();
      }));
      it('6 - delete second letter - first word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();
        spyOn(typedAnimatedTextComponent, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('on');

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('o');
        flush();
      }));
      it('7 - delete third letter - first word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();
        spyOn(typedAnimatedTextComponent, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay + (deleteSpeed * 3) / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('o');

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('');
        flush();
      }));
      it('8 - change index - first word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();
        spyOn(typedAnimatedTextComponent, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay + (deleteSpeed * 5) / 2);

        let actualI = typedAnimatedTextComponent['i'];
        expect(actualI).toBe(0);

        tick(deleteSpeed);

        actualI = typedAnimatedTextComponent['i'];
        expect(actualI).toBe(1);
        flush();
      }));
      it('9 - call typingEffect method - first word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();
        spyOn(typedAnimatedTextComponent, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay + (deleteSpeed * 5) / 2);

        expect(typedAnimatedTextComponent.typingEffect).not.toHaveBeenCalled();

        tick(deleteSpeed);

        expect(typedAnimatedTextComponent.typingEffect).toHaveBeenCalledTimes(
          1
        );
        flush();
      }));
      it('10 - type first letter - second word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick(typingSpeed * 3 + deleteDelay + (deleteSpeed * 5) / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('');

        tick(deleteSpeed);
        spyOn(typedAnimatedTextComponent, 'deletingEffect').and.returnValue();

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('t');

        flush();
      }));
      it('11 - type second letter - second word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed * 3);
        spyOn(typedAnimatedTextComponent, 'deletingEffect').and.returnValue();

        tick(typingSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('t');

        tick(typingSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('te');

        flush();
      }));
      it('12 - type third letter - second word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed * 3 + typingSpeed);
        spyOn(typedAnimatedTextComponent, 'deletingEffect').and.returnValue();

        tick(typingSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('te');

        tick(typingSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('tes');

        flush();
      }));
      it('13 - type forth letter - second word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed * 3 + typingSpeed * 2);
        spyOn(typedAnimatedTextComponent, 'deletingEffect').and.returnValue();

        tick(typingSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('tes');

        tick(typingSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('test');

        flush();
      }));
      it('14 - call deletingEffect method - second word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed * 3 + typingSpeed * 4);
        spyOn(typedAnimatedTextComponent, 'deletingEffect').and.returnValue();

        tick(deleteDelay / 2);

        expect(
          typedAnimatedTextComponent.deletingEffect
        ).not.toHaveBeenCalled();

        tick(deleteDelay);

        expect(typedAnimatedTextComponent.deletingEffect).toHaveBeenCalledTimes(
          1
        );

        flush();
      }));
      it('15 - delete first letter - second word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay
        );

        spyOn(typedAnimatedTextComponent, 'typingEffect').and.returnValue();

        tick(deleteSpeed / 2);

        const actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('tes');

        flush();
      }));
      it('16 - delete second letter - second word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay
        );

        spyOn(typedAnimatedTextComponent, 'typingEffect').and.returnValue();

        tick(deleteSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('tes');

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('te');

        flush();
      }));
      it('17 - delete third letter - second word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay +
            deleteSpeed
        );

        spyOn(typedAnimatedTextComponent, 'typingEffect').and.returnValue();

        tick(deleteSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('te');

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('t');

        flush();
      }));
      it('18 - delete forth letter - second word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay +
            deleteSpeed * 2
        );

        spyOn(typedAnimatedTextComponent, 'typingEffect').and.returnValue();

        tick(deleteSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('t');

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('');

        flush();
      }));
      it('19 - change index - second word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay +
            (deleteSpeed * 7) / 2
        );
        spyOn(typedAnimatedTextComponent, 'typingEffect').and.returnValue();

        let actualI = typedAnimatedTextComponent['i'];
        expect(actualI).toBe(1);

        tick(deleteSpeed);

        actualI = typedAnimatedTextComponent['i'];
        expect(actualI).toBe(0);
        flush();
      }));
      it('20 - call typingEffect method - first word', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay +
            (deleteSpeed * 7) / 2
        );
        spyOn(typedAnimatedTextComponent, 'typingEffect').and.returnValue();

        expect(typedAnimatedTextComponent.typingEffect).not.toHaveBeenCalled();

        tick(deleteSpeed);

        expect(typedAnimatedTextComponent.typingEffect).toHaveBeenCalledTimes(
          1
        );
        flush();
      }));
    });
  });
});
