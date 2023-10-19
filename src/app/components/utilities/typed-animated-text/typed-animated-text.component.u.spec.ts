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
  let component: TypedAnimatedTextComponent;
  let textElement: jasmine.SpyObj<ElementRef>;
  let blinkElement: jasmine.SpyObj<ElementRef>;
  const inputArrayPropName = 'inputArray';
  let renderer: Renderer2;
  const typingSpeed = 8;
  const deleteSpeed = 3;
  const deleteDelay = 11;

  afterEach(() => {
    TypedAnimatedTextComponent.prototype.textElement = new ElementRef(
      document.createElement('div')
    );
    TypedAnimatedTextComponent.prototype.blinkElement = new ElementRef(
      document.createElement('div')
    );
  });

  it('should have inputArray property', () => {
    renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);

    textElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
    blinkElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
    TypedAnimatedTextComponent.prototype.textElement = textElement;
    TypedAnimatedTextComponent.prototype.blinkElement = blinkElement;

    TestBed.configureTestingModule({
      providers: [
        TypedAnimatedTextComponent,
        { provide: Renderer2, useValue: renderer },
      ],
    });

    component = TestBed.inject(TypedAnimatedTextComponent);

    expect(component[inputArrayPropName])
      .withContext('inputArray property should be defined')
      .toEqual(jasmine.anything());
  });

  describe('constructor', () => {
    beforeEach(() => {
      renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);

      textElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      blinkElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      TypedAnimatedTextComponent.prototype.textElement = textElement;
      TypedAnimatedTextComponent.prototype.blinkElement = blinkElement;
    });
    it('should create', () => {
      TestBed.configureTestingModule({
        providers: [
          TypedAnimatedTextComponent,
          { provide: Renderer2, useValue: renderer },
        ],
      });

      component = TestBed.inject(TypedAnimatedTextComponent);

      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });

    it('should set default values', () => {
      TestBed.configureTestingModule({
        providers: [
          TypedAnimatedTextComponent,
          { provide: Renderer2, useValue: renderer },
        ],
      });

      component = TestBed.inject(TypedAnimatedTextComponent);

      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      expect(component.textElement)
        .withContext('textElement should be set')
        .toEqual(jasmine.anything());
      expect(component.blinkElement)
        .withContext('blinkElement should be set')
        .toEqual(jasmine.anything());
      expect(component.inputArray)
        .withContext('inputArray should be set')
        .toEqual(jasmine.anything());
      expect(component.inputArray.length)
        .withContext('inputArray should be non empty')
        .toBe(1);
      component.inputArray[0].subscribe((s) =>
        expect(s).withContext('inputArray first element should be set').toBe('')
      );

      expect(component.textArray)
        .withContext('textArray should be set')
        .toEqual([]);
      expect(component.textColor)
        .withContext('textColor should be set')
        .toBe('black');
      expect(component.fontSize)
        .withContext('fontSize should be set')
        .toBe('1em');
      expect(component.blinkWidth)
        .withContext('blinkWidth should be set')
        .toBe('2px');
      expect(component.typingSpeed)
        .withContext('typingSpeed should be set')
        .toBe(80);
      expect(component.deleteSpeed)
        .withContext('deleteSpeed should be set')
        .toBe(30);
      expect(component.loop).withContext('loop should be set').toBe(true);
      expect(component.deleteDelay)
        .withContext('deleteDelay should be set')
        .toBe(1100);
    });

    it('should call initVariables', (done: DoneFn) => {
      spyOn(TypedAnimatedTextComponent.prototype, 'initVariables');

      TestBed.configureTestingModule({
        providers: [
          TypedAnimatedTextComponent,
          { provide: Renderer2, useValue: renderer },
        ],
      });

      component = TestBed.inject(TypedAnimatedTextComponent);

      setTimeout(() => {
        expect(component.initVariables)
          .withContext('should have been called')
          .toHaveBeenCalled();

        done();
      });
    });
  });
  describe('ngOnChanges', () => {
    beforeEach(() => {
      renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);

      textElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      blinkElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      TypedAnimatedTextComponent.prototype.textElement = textElement;
      TypedAnimatedTextComponent.prototype.blinkElement = blinkElement;

      TestBed.configureTestingModule({
        providers: [
          TypedAnimatedTextComponent,
          { provide: Renderer2, useValue: renderer },
        ],
      });

      component = TestBed.inject(TypedAnimatedTextComponent);

      textElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      blinkElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      component.textElement = textElement;
      component.blinkElement = blinkElement;
      spyOn(component, 'typingEffect');
    });
    it('should do nothing if the inputArray is not changed', () => {
      const oldValue = component.textArray;

      const value = component.inputArray;
      const change = new SimpleChange(value, value, false);
      const changes: SimpleChanges = {};
      changes[inputArrayPropName] = change;

      component.ngOnChanges(changes);

      const newValue = component.textArray;

      expect(newValue).withContext('textArray should be set').toBe(oldValue);
    });
    it('should update the textArray if the inputArray is changed', () => {
      const value = component.inputArray;
      const newValue = [of('this'), of('is'), of('a'), of('test')];
      const expected = ['this', 'is', 'a', 'test'];
      component.inputArray = newValue;

      const change = new SimpleChange(value, newValue, false);
      const changes: SimpleChanges = {};
      changes[inputArrayPropName] = change;

      component.ngOnChanges(changes);

      const actualValue = component.textArray;

      expect(actualValue)
        .withContext('textArray should be set')
        .toEqual(expected);
    });
  });

  describe('initVariables', () => {
    beforeEach(() => {
      renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);

      textElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      blinkElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      TypedAnimatedTextComponent.prototype.textElement = textElement;
      TypedAnimatedTextComponent.prototype.blinkElement = blinkElement;

      TestBed.configureTestingModule({
        providers: [
          TypedAnimatedTextComponent,
          { provide: Renderer2, useValue: renderer },
        ],
      });

      component = TestBed.inject(TypedAnimatedTextComponent);

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

      component.textElement = textElement;
      component.blinkElement = blinkElement;
    });
    it('should set the textElement color', () => {
      component.initVariables();

      expect(renderer.setStyle)
        .withContext('setStyle should have been called 6 times')
        .toHaveBeenCalledTimes(6);
      expect(renderer.setStyle)
        .withContext(
          'setStyle should have been called with the proper arguments'
        )
        .toHaveBeenCalledWith(
          textElement.nativeElement,
          'color',
          component.textColor
        );
    });
    it('should set the textElement font-size', () => {
      component.initVariables();

      expect(renderer.setStyle)
        .withContext('setStyle should have been called 6 times')
        .toHaveBeenCalledTimes(6);
      expect(renderer.setStyle)
        .withContext(
          'setStyle should have been called with the proper arguments'
        )
        .toHaveBeenCalledWith(
          textElement.nativeElement,
          'font-size',
          component.fontSize
        );
    });
    it('should set the textElement padding', () => {
      component.initVariables();

      expect(renderer.setStyle)
        .withContext('setStyle should have been called 6 times')
        .toHaveBeenCalledTimes(6);
      expect(renderer.setStyle)
        .withContext(
          'setStyle should have been called with the proper arguments'
        )
        .toHaveBeenCalledWith(textElement.nativeElement, 'padding', '0.1em');
    });
    it('should set the blinkElement border-right-width', () => {
      component.initVariables();

      expect(renderer.setStyle)
        .withContext('setStyle should have been called 6 times')
        .toHaveBeenCalledTimes(6);
      expect(renderer.setStyle)
        .withContext(
          'setStyle should have been called with the proper arguments'
        )
        .toHaveBeenCalledWith(
          blinkElement.nativeElement,
          'border-right-width',
          component.blinkWidth
        );
    });
    it('should set the blinkElement border-right-color', () => {
      component.initVariables();

      expect(renderer.setStyle)
        .withContext('setStyle should have been called 6 times')
        .toHaveBeenCalledTimes(6);
      expect(renderer.setStyle)
        .withContext(
          'setStyle should have been called with the proper arguments'
        )
        .toHaveBeenCalledWith(
          blinkElement.nativeElement,
          'border-right-color',
          component.textColor
        );
    });
    it('should set the blinkElement font-size', () => {
      component.initVariables();

      expect(renderer.setStyle)
        .withContext('setStyle should have been called 6 times')
        .toHaveBeenCalledTimes(6);
      expect(renderer.setStyle)
        .withContext(
          'setStyle should have been called with the proper arguments'
        )
        .toHaveBeenCalledWith(
          blinkElement.nativeElement,
          'font-size',
          component.fontSize
        );
    });
  });

  describe('typingEffect', () => {
    beforeEach(() => {
      renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);

      textElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      blinkElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      TypedAnimatedTextComponent.prototype.textElement = textElement;
      TypedAnimatedTextComponent.prototype.blinkElement = blinkElement;

      TestBed.configureTestingModule({
        providers: [
          TypedAnimatedTextComponent,
          { provide: Renderer2, useValue: renderer },
        ],
      });

      component = TestBed.inject(TypedAnimatedTextComponent);

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

      component.textElement = textElement;
      component.blinkElement = blinkElement;

      component.typingSpeed = typingSpeed;
      component.deleteSpeed = deleteSpeed;
      component.deleteDelay = deleteDelay;

      spyOn(component, 'deletingEffect');

      component.textArray = ['one', 'test'];
      component['i'] = 0;
    });
    describe('should type the word letter by letter, and then call the deletingEffect method', () => {
      it('1 - first letter', fakeAsync(() => {
        component.typingEffect();

        const actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).withContext('text should be set').toBe('o');
        flush();
      }));
      it('2 - second letter', fakeAsync(() => {
        component.typingEffect();

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
      it('3 - third letter', fakeAsync(() => {
        component.typingEffect();

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
      it('4 - call deletingEffect method', fakeAsync(() => {
        component.typingEffect();

        tick(typingSpeed * 3 + deleteDelay / 2);

        const actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).withContext('text should be set').toBe('one');
        expect(component.deletingEffect)
          .withContext('deletingEffect should not have been called before tick')
          .not.toHaveBeenCalled();

        tick(deleteDelay / 2);
        expect(component.deletingEffect)
          .withContext('deletingEffect should have been called after tick')
          .toHaveBeenCalledTimes(1);
        flush();
      }));
    });
  });

  describe('deletingEffect', () => {
    beforeEach(() => {
      renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);

      textElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      blinkElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      TypedAnimatedTextComponent.prototype.textElement = textElement;
      TypedAnimatedTextComponent.prototype.blinkElement = blinkElement;

      TestBed.configureTestingModule({
        providers: [
          TypedAnimatedTextComponent,
          { provide: Renderer2, useValue: renderer },
        ],
      });

      component = TestBed.inject(TypedAnimatedTextComponent);

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

      component.textElement = textElement;
      component.blinkElement = blinkElement;

      component.typingSpeed = typingSpeed;
      component.deleteSpeed = deleteSpeed;
      component.deleteDelay = deleteDelay;

      spyOn(component, 'typingEffect');

      component.textArray = ['one', 'test'];
      component['i'] = 1;
      textElement.nativeElement.innerHTML = 'test';
    });
    it('should change index properly when the last word is being erased', fakeAsync(() => {
      component.deletingEffect();

      tick((deleteSpeed * 7) / 2);
      let actualI = component['i'];
      expect(actualI).withContext('index should be set before tick').toBe(1);

      tick(deleteSpeed);

      actualI = component['i'];
      expect(actualI).withContext('index should be set after tick').toBe(0);
      flush();
    }));
    describe('should remove the word letter by letter, and then call the typingEffect method for the next word', () => {
      beforeEach(() => {
        component['i'] = 0;
        textElement.nativeElement.innerHTML = 'one';
      });

      it('1 - delete first letter', fakeAsync(() => {
        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before')
          .toBe('one');

        component.deletingEffect();

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after')
          .toBe('on');
        flush();
      }));
      it('2 - delete second letter', fakeAsync(() => {
        component.deletingEffect();

        tick(deleteSpeed / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('on');

        tick(deleteSpeed / 2);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('o');
        flush();
      }));
      it('3 - delete third letter', fakeAsync(() => {
        component.deletingEffect();

        tick((deleteSpeed * 3) / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('o');

        tick(deleteSpeed / 2);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('');
        flush();
      }));
      it('4 - change index', fakeAsync(() => {
        component.deletingEffect();

        tick((deleteSpeed * 5) / 2);
        let actualI = component['i'];
        expect(actualI).withContext('index should be set before tick').toBe(0);

        tick(deleteSpeed);

        actualI = component['i'];
        expect(actualI).withContext('index should be set after tick').toBe(1);
        flush();
      }));
      it('5 - call typingEffect method', fakeAsync(() => {
        component.deletingEffect();

        tick((deleteSpeed * 5) / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('');
        expect(component.typingEffect)
          .withContext('typingEffect should not have been called before tick')
          .not.toHaveBeenCalled();

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('');
        expect(component.typingEffect)
          .withContext('typingEffect should not have been called after tick')
          .toHaveBeenCalledTimes(1);
        flush();
      }));
    });
  });
});
