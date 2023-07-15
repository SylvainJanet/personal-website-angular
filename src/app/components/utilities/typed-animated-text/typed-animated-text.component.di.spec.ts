import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { TypedAnimatedTextComponent } from './typed-animated-text.component';
import { Renderer2 } from '@angular/core';
import { of } from 'rxjs';

describe('TypedAnimatedTextComponent - dom integration', () => {
  let fixture: ComponentFixture<TypedAnimatedTextComponent>;
  let componentInstance: TypedAnimatedTextComponent;
  const typingSpeed = 8;
  const deleteSpeed = 3;
  const deleteDelay = 11;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TypedAnimatedTextComponent],
      providers: [DOMComputationService, Renderer2],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypedAnimatedTextComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('typingEffect', () => {
    beforeEach(() => {
      componentInstance.typingSpeed = typingSpeed;
      componentInstance.deleteSpeed = deleteSpeed;
      componentInstance.deleteDelay = deleteDelay;

      componentInstance.inputArray = [of('one'), of('test')];
      componentInstance['i'] = 0;
    });
    describe('should type the word letter by letter, and then call the deletingEffect method, then delete the word letter by letter, then repeat for the next word', () => {
      it('1 - type first letter - first word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();
        spyOn(componentInstance, 'deletingEffect').and.returnValue();

        const actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('o');
        flush();
      }));
      it('2 - type second letter - first word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();
        spyOn(componentInstance, 'deletingEffect').and.returnValue();

        tick(typingSpeed / 2);

        let actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('o');

        tick(typingSpeed);

        actualInnerHtml = componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('on');
        flush();
      }));
      it('3 - type third letter - first word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();
        spyOn(componentInstance, 'deletingEffect').and.returnValue();

        tick((typingSpeed * 3) / 2);

        let actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('on');

        tick(typingSpeed / 2);

        actualInnerHtml = componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('one');
        flush();
      }));
      it('4 - call deletingEffect method - first word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();
        spyOn(componentInstance, 'deletingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay / 2);

        const actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('one');
        expect(componentInstance.deletingEffect).not.toHaveBeenCalled();

        tick(deleteDelay / 2);
        expect(componentInstance.deletingEffect).toHaveBeenCalledTimes(1);
        flush();
      }));
      it('5 - delete first letter - first word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();
        spyOn(componentInstance, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay / 2);

        let actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('one');

        tick(deleteDelay / 2);

        actualInnerHtml = componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('on');
        flush();
      }));
      it('6 - delete second letter - first word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();
        spyOn(componentInstance, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed / 2);

        let actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('on');

        tick(deleteSpeed);

        actualInnerHtml = componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('o');
        flush();
      }));
      it('7 - delete third letter - first word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();
        spyOn(componentInstance, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay + (deleteSpeed * 3) / 2);

        let actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('o');

        tick(deleteSpeed);

        actualInnerHtml = componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('');
        flush();
      }));
      it('8 - change index - first word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();
        spyOn(componentInstance, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay + (deleteSpeed * 5) / 2);

        let actualI = componentInstance['i'];
        expect(actualI).toBe(0);

        tick(deleteSpeed);

        actualI = componentInstance['i'];
        expect(actualI).toBe(1);
        flush();
      }));
      it('9 - call typingEffect method - first word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();
        spyOn(componentInstance, 'typingEffect').and.returnValue();

        tick(typingSpeed * 3 + deleteDelay + (deleteSpeed * 5) / 2);

        expect(componentInstance.typingEffect).not.toHaveBeenCalled();

        tick(deleteSpeed);

        expect(componentInstance.typingEffect).toHaveBeenCalledTimes(1);
        flush();
      }));
      it('10 - type first letter - second word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();

        tick(typingSpeed * 3 + deleteDelay + (deleteSpeed * 5) / 2);

        let actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('');

        tick(deleteSpeed);
        spyOn(componentInstance, 'deletingEffect').and.returnValue();

        actualInnerHtml = componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('t');

        flush();
      }));
      it('11 - type second letter - second word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed * 3);
        spyOn(componentInstance, 'deletingEffect').and.returnValue();

        tick(typingSpeed / 2);

        let actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('t');

        tick(typingSpeed);

        actualInnerHtml = componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('te');

        flush();
      }));
      it('12 - type third letter - second word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed * 3 + typingSpeed);
        spyOn(componentInstance, 'deletingEffect').and.returnValue();

        tick(typingSpeed / 2);

        let actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('te');

        tick(typingSpeed);

        actualInnerHtml = componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('tes');

        flush();
      }));
      it('13 - type forth letter - second word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed * 3 + typingSpeed * 2);
        spyOn(componentInstance, 'deletingEffect').and.returnValue();

        tick(typingSpeed / 2);

        let actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('tes');

        tick(typingSpeed);

        actualInnerHtml = componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('test');

        flush();
      }));
      it('14 - call deletingEffect method - second word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();

        tick(typingSpeed * 3 + deleteDelay + deleteSpeed * 3 + typingSpeed * 4);
        spyOn(componentInstance, 'deletingEffect').and.returnValue();

        tick(deleteDelay / 2);

        expect(componentInstance.deletingEffect).not.toHaveBeenCalled();

        tick(deleteDelay);

        expect(componentInstance.deletingEffect).toHaveBeenCalledTimes(1);

        flush();
      }));
      it('15 - delete first letter - second word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay
        );

        spyOn(componentInstance, 'typingEffect').and.returnValue();

        tick(deleteSpeed / 2);

        const actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('tes');

        flush();
      }));
      it('16 - delete second letter - second word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay
        );

        spyOn(componentInstance, 'typingEffect').and.returnValue();

        tick(deleteSpeed / 2);

        let actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('tes');

        tick(deleteSpeed);

        actualInnerHtml = componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('te');

        flush();
      }));
      it('17 - delete third letter - second word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay +
            deleteSpeed
        );

        spyOn(componentInstance, 'typingEffect').and.returnValue();

        tick(deleteSpeed / 2);

        let actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('te');

        tick(deleteSpeed);

        actualInnerHtml = componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('t');

        flush();
      }));
      it('18 - delete forth letter - second word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay +
            deleteSpeed * 2
        );

        spyOn(componentInstance, 'typingEffect').and.returnValue();

        tick(deleteSpeed / 2);

        let actualInnerHtml =
          componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('t');

        tick(deleteSpeed);

        actualInnerHtml = componentInstance.textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('');

        flush();
      }));
      it('19 - change index - second word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay +
            (deleteSpeed * 7) / 2
        );
        spyOn(componentInstance, 'typingEffect').and.returnValue();

        let actualI = componentInstance['i'];
        expect(actualI).toBe(1);

        tick(deleteSpeed);

        actualI = componentInstance['i'];
        expect(actualI).toBe(0);
        flush();
      }));
      it('20 - call typingEffect method - first word', fakeAsync(() => {
        componentInstance.ngAfterViewInit();

        tick(
          typingSpeed * 3 +
            deleteDelay +
            deleteSpeed * 3 +
            typingSpeed * 4 +
            deleteDelay +
            (deleteSpeed * 7) / 2
        );
        spyOn(componentInstance, 'typingEffect').and.returnValue();

        expect(componentInstance.typingEffect).not.toHaveBeenCalled();

        tick(deleteSpeed);

        expect(componentInstance.typingEffect).toHaveBeenCalledTimes(1);
        flush();
      }));
    });
  });
});
