import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { TypedAnimatedTextComponent } from './typed-animated-text.component';
import {
  ElementRef,
  Renderer2,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { of } from 'rxjs';

describe('TypedAnimatedTextComponent - unit', () => {
  let typedAnimatedTextComponent: TypedAnimatedTextComponent;
  let textElement: jasmine.SpyObj<ElementRef>;
  let blinkElement: jasmine.SpyObj<ElementRef>;
  const inputArrayPropName = 'inputArray';
  let renderer: Renderer2;
  const typingSpeed = 8;
  const deleteSpeed = 3;
  const deleteDelay = 11;

  beforeEach(() => {
    renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
    TestBed.configureTestingModule({
      providers: [
        TypedAnimatedTextComponent,
        { provide: Renderer2, useValue: renderer },
      ],
    });
    typedAnimatedTextComponent = TestBed.inject(TypedAnimatedTextComponent);
  });

  it('should have inputArray property', () => {
    expect(typedAnimatedTextComponent[inputArrayPropName]).toBeTruthy();
  });

  describe('constructor', () => {
    beforeEach(() => {
      textElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      blinkElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      typedAnimatedTextComponent.textElement = textElement;
      typedAnimatedTextComponent.blinkElement = blinkElement;
    });
    it('should create', () => {
      expect(typedAnimatedTextComponent).toBeTruthy();
    });

    it('should set default values', () => {
      expect(typedAnimatedTextComponent).toBeTruthy();

      expect(typedAnimatedTextComponent.textElement).toBeTruthy();
      expect(typedAnimatedTextComponent.blinkElement).toBeTruthy();
      expect(typedAnimatedTextComponent.inputArray).toBeTruthy();
      expect(typedAnimatedTextComponent.inputArray.length).toBe(1);
      expect(
        typedAnimatedTextComponent.inputArray[0].subscribe((s) =>
          expect(s).toBe('')
        )
      );
      expect(typedAnimatedTextComponent.textArray).toEqual(['']);
      expect(typedAnimatedTextComponent.textColor).toBe('black');
      expect(typedAnimatedTextComponent.fontSize).toBe('1em');
      expect(typedAnimatedTextComponent.blinkWidth).toBe('2px');
      expect(typedAnimatedTextComponent.typingSpeed).toBe(80);
      expect(typedAnimatedTextComponent.deleteSpeed).toBe(30);
      expect(typedAnimatedTextComponent.loop).toBe(true);
      expect(typedAnimatedTextComponent.deleteDelay).toBe(1100);
    });
  });
  describe('ngOnChanges', () => {
    beforeEach(() => {
      textElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      blinkElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      typedAnimatedTextComponent.textElement = textElement;
      typedAnimatedTextComponent.blinkElement = blinkElement;
    });
    it('should do nothing if the inputArray is not changed', () => {
      const oldValue = typedAnimatedTextComponent.textArray;

      const value = typedAnimatedTextComponent.inputArray;
      const change = new SimpleChange(value, value, false);
      const changes: SimpleChanges = {};
      changes[inputArrayPropName] = change;

      typedAnimatedTextComponent.ngOnChanges(changes);

      const newValue = typedAnimatedTextComponent.textArray;

      expect(newValue).toBe(oldValue);
    });
    it('should update the textArray if the inputArray is changed', () => {
      const value = typedAnimatedTextComponent.inputArray;
      const newValue = [of('this'), of('is'), of('a'), of('test')];
      const expected = ['this', 'is', 'a', 'test'];
      typedAnimatedTextComponent.inputArray = newValue;

      const change = new SimpleChange(value, newValue, false);
      const changes: SimpleChanges = {};
      changes[inputArrayPropName] = change;

      typedAnimatedTextComponent.ngOnChanges(changes);

      const actualValue = typedAnimatedTextComponent.textArray;

      expect(actualValue).toEqual(expected);
    });
  });
  describe('ngAfterViewInit', () => {
    it('should call the initVariables method', () => {
      spyOn(typedAnimatedTextComponent, 'initVariables');
      spyOn(typedAnimatedTextComponent, 'typingEffect');

      typedAnimatedTextComponent.ngAfterViewInit();

      expect(typedAnimatedTextComponent.initVariables).toHaveBeenCalledTimes(1);
    });
    it('should update the textArray', () => {
      spyOn(typedAnimatedTextComponent, 'initVariables');
      spyOn(typedAnimatedTextComponent, 'typingEffect');
      typedAnimatedTextComponent.textArray = [];
      typedAnimatedTextComponent.inputArray = [
        of('this'),
        of('is'),
        of('a'),
        of('test'),
      ];
      const expected = ['this', 'is', 'a', 'test'];

      typedAnimatedTextComponent.ngAfterViewInit();
      const actual = typedAnimatedTextComponent.textArray;

      expect(actual).toEqual(expected);
    });
    it('should initiate the typing effect once the textArray is updated', () => {
      spyOn(typedAnimatedTextComponent, 'initVariables');
      spyOn(typedAnimatedTextComponent, 'typingEffect');
      typedAnimatedTextComponent.textArray = [];
      typedAnimatedTextComponent.inputArray = [
        of('this'),
        of('is'),
        of('a'),
        of('test'),
      ];
      typedAnimatedTextComponent.ngAfterViewInit();

      expect(typedAnimatedTextComponent.typingEffect).toHaveBeenCalledTimes(1);
    });
  });
  describe('initVariables', () => {
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
    });
    it('should set the textElement color', () => {
      typedAnimatedTextComponent.initVariables();

      expect(renderer.setStyle).toHaveBeenCalledTimes(6);
      expect(renderer.setStyle).toHaveBeenCalledWith(
        textElement.nativeElement,
        'color',
        typedAnimatedTextComponent.textColor
      );
    });
    it('should set the textElement font-size', () => {
      typedAnimatedTextComponent.initVariables();

      expect(renderer.setStyle).toHaveBeenCalledTimes(6);
      expect(renderer.setStyle).toHaveBeenCalledWith(
        textElement.nativeElement,
        'font-size',
        typedAnimatedTextComponent.fontSize
      );
    });
    it('should set the textElement padding', () => {
      typedAnimatedTextComponent.initVariables();

      expect(renderer.setStyle).toHaveBeenCalledTimes(6);
      expect(renderer.setStyle).toHaveBeenCalledWith(
        textElement.nativeElement,
        'padding',
        '0.1em'
      );
    });
    it('should set the blinkElement border-right-width', () => {
      typedAnimatedTextComponent.initVariables();

      expect(renderer.setStyle).toHaveBeenCalledTimes(6);
      expect(renderer.setStyle).toHaveBeenCalledWith(
        blinkElement.nativeElement,
        'border-right-width',
        typedAnimatedTextComponent.blinkWidth
      );
    });
    it('should set the blinkElement border-right-color', () => {
      typedAnimatedTextComponent.initVariables();

      expect(renderer.setStyle).toHaveBeenCalledTimes(6);
      expect(renderer.setStyle).toHaveBeenCalledWith(
        blinkElement.nativeElement,
        'border-right-color',
        typedAnimatedTextComponent.textColor
      );
    });
    it('should set the blinkElement font-size', () => {
      typedAnimatedTextComponent.initVariables();

      expect(renderer.setStyle).toHaveBeenCalledTimes(6);
      expect(renderer.setStyle).toHaveBeenCalledWith(
        blinkElement.nativeElement,
        'font-size',
        typedAnimatedTextComponent.fontSize
      );
    });
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

      spyOn(typedAnimatedTextComponent, 'deletingEffect');

      typedAnimatedTextComponent.textArray = ['one', 'test'];
      typedAnimatedTextComponent['i'] = 0;
    });
    describe('should type the word letter by letter, and then call the deletingEffect method', () => {
      it('1 - first letter', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        const actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('o');
        flush();
      }));
      it('2 - second letter', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick(typingSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('o');

        tick(typingSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('on');
        flush();
      }));
      it('3 - third letter', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

        tick((typingSpeed * 3) / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('on');

        tick(typingSpeed / 2);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('one');
        flush();
      }));
      it('4 - call deletingEffect method', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

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
    });
  });
  describe('deletingEffect', () => {
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

      spyOn(typedAnimatedTextComponent, 'typingEffect');

      typedAnimatedTextComponent.textArray = ['one', 'test'];
      typedAnimatedTextComponent['i'] = 1;
      textElement.nativeElement.innerHTML = 'test';
    });
    it('should change index properly when the last word is being erased', fakeAsync(() => {
      typedAnimatedTextComponent.deletingEffect();

      tick((deleteSpeed * 7) / 2);
      let actualI = typedAnimatedTextComponent['i'];
      expect(actualI).toBe(1);

      tick(deleteSpeed);

      actualI = typedAnimatedTextComponent['i'];
      expect(actualI).toBe(0);
      flush();
    }));
    describe('should remove the word letter by letter, and then call the typingEffect method for the next word', () => {
      beforeEach(() => {
        typedAnimatedTextComponent['i'] = 0;
        textElement.nativeElement.innerHTML = 'one';
      });

      it('1 - delete first letter', fakeAsync(() => {
        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('one');

        typedAnimatedTextComponent.deletingEffect();

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('on');
        flush();
      }));
      it('2 - delete second letter', fakeAsync(() => {
        typedAnimatedTextComponent.deletingEffect();

        tick(deleteSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('on');

        tick(deleteSpeed / 2);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('o');
        flush();
      }));
      it('3 - delete third letter', fakeAsync(() => {
        typedAnimatedTextComponent.deletingEffect();

        tick((deleteSpeed * 3) / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('o');

        tick(deleteSpeed / 2);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('');
        flush();
      }));
      it('4 - change index', fakeAsync(() => {
        typedAnimatedTextComponent.deletingEffect();

        tick((deleteSpeed * 5) / 2);
        let actualI = typedAnimatedTextComponent['i'];
        expect(actualI).toBe(0);

        tick(deleteSpeed);

        actualI = typedAnimatedTextComponent['i'];
        expect(actualI).toBe(1);
        flush();
      }));
      it('5 - call typingEffect method', fakeAsync(() => {
        typedAnimatedTextComponent.deletingEffect();

        tick((deleteSpeed * 5) / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('');
        expect(typedAnimatedTextComponent.typingEffect).not.toHaveBeenCalled();

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).toBe('');
        expect(typedAnimatedTextComponent.typingEffect).toHaveBeenCalledTimes(
          1
        );
        flush();
      }));
    });
  });
});
