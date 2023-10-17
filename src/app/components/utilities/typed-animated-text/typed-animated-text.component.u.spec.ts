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

    typedAnimatedTextComponent = TestBed.inject(TypedAnimatedTextComponent);

    expect(typedAnimatedTextComponent[inputArrayPropName])
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

      typedAnimatedTextComponent = TestBed.inject(TypedAnimatedTextComponent);

      expect(typedAnimatedTextComponent)
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

      typedAnimatedTextComponent = TestBed.inject(TypedAnimatedTextComponent);

      expect(typedAnimatedTextComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      expect(typedAnimatedTextComponent.textElement)
        .withContext('textElement should be set')
        .toEqual(jasmine.anything());
      expect(typedAnimatedTextComponent.blinkElement)
        .withContext('blinkElement should be set')
        .toEqual(jasmine.anything());
      expect(typedAnimatedTextComponent.inputArray)
        .withContext('inputArray should be set')
        .toEqual(jasmine.anything());
      expect(typedAnimatedTextComponent.inputArray.length)
        .withContext('inputArray should be non empty')
        .toBe(1);
      typedAnimatedTextComponent.inputArray[0].subscribe((s) =>
        expect(s).withContext('inputArray first element should be set').toBe('')
      );

      expect(typedAnimatedTextComponent.textArray)
        .withContext('textArray should be set')
        .toEqual([]);
      expect(typedAnimatedTextComponent.textColor)
        .withContext('textColor should be set')
        .toBe('black');
      expect(typedAnimatedTextComponent.fontSize)
        .withContext('fontSize should be set')
        .toBe('1em');
      expect(typedAnimatedTextComponent.blinkWidth)
        .withContext('blinkWidth should be set')
        .toBe('2px');
      expect(typedAnimatedTextComponent.typingSpeed)
        .withContext('typingSpeed should be set')
        .toBe(80);
      expect(typedAnimatedTextComponent.deleteSpeed)
        .withContext('deleteSpeed should be set')
        .toBe(30);
      expect(typedAnimatedTextComponent.loop)
        .withContext('loop should be set')
        .toBe(true);
      expect(typedAnimatedTextComponent.deleteDelay)
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

      typedAnimatedTextComponent = TestBed.inject(TypedAnimatedTextComponent);

      setTimeout(() => {
        expect(typedAnimatedTextComponent.initVariables)
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

      typedAnimatedTextComponent = TestBed.inject(TypedAnimatedTextComponent);

      textElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      blinkElement = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
      typedAnimatedTextComponent.textElement = textElement;
      typedAnimatedTextComponent.blinkElement = blinkElement;
      spyOn(typedAnimatedTextComponent, 'typingEffect');
    });
    it('should do nothing if the inputArray is not changed', () => {
      const oldValue = typedAnimatedTextComponent.textArray;

      const value = typedAnimatedTextComponent.inputArray;
      const change = new SimpleChange(value, value, false);
      const changes: SimpleChanges = {};
      changes[inputArrayPropName] = change;

      typedAnimatedTextComponent.ngOnChanges(changes);

      const newValue = typedAnimatedTextComponent.textArray;

      expect(newValue).withContext('textArray should be set').toBe(oldValue);
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

      typedAnimatedTextComponent = TestBed.inject(TypedAnimatedTextComponent);

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
          typedAnimatedTextComponent.textColor
        );
    });
    it('should set the textElement font-size', () => {
      typedAnimatedTextComponent.initVariables();

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
          typedAnimatedTextComponent.fontSize
        );
    });
    it('should set the textElement padding', () => {
      typedAnimatedTextComponent.initVariables();

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
      typedAnimatedTextComponent.initVariables();

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
          typedAnimatedTextComponent.blinkWidth
        );
    });
    it('should set the blinkElement border-right-color', () => {
      typedAnimatedTextComponent.initVariables();

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
          typedAnimatedTextComponent.textColor
        );
    });
    it('should set the blinkElement font-size', () => {
      typedAnimatedTextComponent.initVariables();

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
          typedAnimatedTextComponent.fontSize
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

      typedAnimatedTextComponent = TestBed.inject(TypedAnimatedTextComponent);

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
        expect(actualInnerHtml).withContext('text should be set').toBe('o');
        flush();
      }));
      it('2 - second letter', fakeAsync(() => {
        typedAnimatedTextComponent.typingEffect();

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
        typedAnimatedTextComponent.typingEffect();

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
        typedAnimatedTextComponent.typingEffect();

        tick(typingSpeed * 3 + deleteDelay / 2);

        const actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml).withContext('text should be set').toBe('one');
        expect(typedAnimatedTextComponent.deletingEffect)
          .withContext('deletingEffect should not have been called before tick')
          .not.toHaveBeenCalled();

        tick(deleteDelay / 2);
        expect(typedAnimatedTextComponent.deletingEffect)
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

      typedAnimatedTextComponent = TestBed.inject(TypedAnimatedTextComponent);

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
      expect(actualI).withContext('index should be set before tick').toBe(1);

      tick(deleteSpeed);

      actualI = typedAnimatedTextComponent['i'];
      expect(actualI).withContext('index should be set after tick').toBe(0);
      flush();
    }));
    describe('should remove the word letter by letter, and then call the typingEffect method for the next word', () => {
      beforeEach(() => {
        typedAnimatedTextComponent['i'] = 0;
        textElement.nativeElement.innerHTML = 'one';
      });

      it('1 - delete first letter', fakeAsync(() => {
        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before')
          .toBe('one');

        typedAnimatedTextComponent.deletingEffect();

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after')
          .toBe('on');
        flush();
      }));
      it('2 - delete second letter', fakeAsync(() => {
        typedAnimatedTextComponent.deletingEffect();

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
        typedAnimatedTextComponent.deletingEffect();

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
        typedAnimatedTextComponent.deletingEffect();

        tick((deleteSpeed * 5) / 2);
        let actualI = typedAnimatedTextComponent['i'];
        expect(actualI).withContext('index should be set before tick').toBe(0);

        tick(deleteSpeed);

        actualI = typedAnimatedTextComponent['i'];
        expect(actualI).withContext('index should be set after tick').toBe(1);
        flush();
      }));
      it('5 - call typingEffect method', fakeAsync(() => {
        typedAnimatedTextComponent.deletingEffect();

        tick((deleteSpeed * 5) / 2);

        let actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set before tick')
          .toBe('');
        expect(typedAnimatedTextComponent.typingEffect)
          .withContext('typingEffect should not have been called before tick')
          .not.toHaveBeenCalled();

        tick(deleteSpeed);

        actualInnerHtml = textElement.nativeElement.innerHTML;
        expect(actualInnerHtml)
          .withContext('text should be set after tick')
          .toBe('');
        expect(typedAnimatedTextComponent.typingEffect)
          .withContext('typingEffect should not have been called after tick')
          .toHaveBeenCalledTimes(1);
        flush();
      }));
    });
  });
});
