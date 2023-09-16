/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DebounceType } from './debounceType/debounceType';

/**
 * Debounce decorator. Inspired by
 * https://stackoverflow.com/questions/44634992/debounce-hostlistener-event.
 *
 * When a function is decorated with this, it won't be executed excessively
 * repeatidly. There are multiple {@link DebounceType} that govern the
 * behaviour.
 *
 * @param delay The acceptable delay between function calls
 * @param type The {@link DebounceType}
 * @returns The `MethodDecorator`
 */
export function debounce(
  delay = 200,
  type = DebounceType.PERIODIC
): MethodDecorator {
  return (
    target: Object,
    propertyKey: string | Symbol,
    descriptor: PropertyDescriptor
  ) => {
    const original = descriptor.value;
    const key = `__timeout__${propertyKey}`;
    const keyTimeStarted = key + '__timeStarted';

    descriptor[keyTimeStarted as keyof PropertyDescriptor] = false;

    descriptor.value = function (...args: unknown[]) {
      //https://stackoverflow.com/questions/59034388/jasmine-spying-an-exported-function-that-is-called-by-an-another-function-does
      //https://medium.com/@DavideRama/mock-spy-exported-functions-within-a-single-module-in-jest-cdf2b61af642
      switch (type) {
        case DebounceType.IMMEDIATE:
          exportedForTesting.immediate(
            this,
            key,
            keyTimeStarted,
            original,
            delay,
            args
          );
          break;
        case DebounceType.END:
          exportedForTesting.end(
            this,
            key,
            keyTimeStarted,
            original,
            delay,
            args
          );
          break;
        case DebounceType.BOTH:
          exportedForTesting.both(
            this,
            key,
            keyTimeStarted,
            original,
            delay,
            args
          );
          break;
        case DebounceType.PERIODIC:
          exportedForTesting.periodic(
            this,
            key,
            keyTimeStarted,
            original,
            delay,
            args
          );
          break;
      }
    };

    return descriptor;
  };
}

/**
 * Method used for {@link DebounceType} immediate behaviour
 *
 * @param target The instance calling the decorated method
 * @param key The key used as a field to track the elpased time
 * @param keyTimeStarted The key used as a field to track whether the debouncing
 *   process has started
 * @param original The decorated method
 * @param delay The delay
 * @param args The method args
 */
function immediate(
  target: Object,
  key: string,
  keyTimeStarted: string,
  original: any,
  delay: number,
  args: unknown[]
) {
  if (!(target as any)[keyTimeStarted]) original.apply(target, args);
  (target as any)[keyTimeStarted] = true;
  clearTimeout((target as any)[key]);
  (target as any)[key] = setTimeout(
    () => ((target as any)[keyTimeStarted] = false),
    delay
  );
}

/**
 * Method used for {@link DebounceType} end behaviour
 *
 * @param target The instance calling the decorated method
 * @param key The key used as a field to track the elpased time
 * @param keyTimeStarted The key used as a field to track whether the debouncing
 *   process has started
 * @param original The decorated method
 * @param delay The delay
 * @param args The method args
 */
function end(
  target: Object,
  key: string,
  _keyTimeStarted: string,
  original: any,
  delay: number,
  args: unknown[]
) {
  clearTimeout((target as any)[key]);
  (target as any)[key] = setTimeout(() => original.apply(target, args), delay);
}

/**
 * Method used for {@link DebounceType} both behaviour
 *
 * @param target The instance calling the decorated method
 * @param key The key used as a field to track the elpased time
 * @param keyTimeStarted The key used as a field to track whether the debouncing
 *   process has started
 * @param original The decorated method
 * @param delay The delay
 * @param args The method args
 */
function both(
  target: Object,
  key: string,
  keyTimeStarted: string,
  original: any,
  delay: number,
  args: unknown[]
) {
  if (!(target as any)[keyTimeStarted]) original.apply(target, args);
  (target as any)[keyTimeStarted] = true;
  clearTimeout((target as any)[key]);
  (target as any)[key] = setTimeout(() => {
    (target as any)[keyTimeStarted] = false;
    original.apply(target, args);
  }, delay);
}

/**
 * Method used for {@link DebounceType} periodic behaviour
 *
 * @param target The instance calling the decorated method
 * @param key The key used as a field to track the elpased time
 * @param keyTimeStarted The key used as a field to track whether the debouncing
 *   process has started
 * @param original The decorated method
 * @param delay The delay
 * @param args The method args
 */
function periodic(
  target: Object,
  key: string,
  keyTimeStarted: string,
  original: any,
  delay: number,
  args: unknown[]
) {
  if (!(target as any)[keyTimeStarted]) {
    original.apply(target, args);
    (target as any)[key] = setTimeout(() => {
      (target as any)[keyTimeStarted] = false;
      original.apply(target, args);
    }, delay);
  }
  (target as any)[keyTimeStarted] = true;
}

/**
 * Functions exported for unit testing purposes.
 * https://stackoverflow.com/questions/59034388/jasmine-spying-an-exported-function-that-is-called-by-an-another-function-does
 * https://medium.com/@DavideRama/mock-spy-exported-functions-within-a-single-module-in-jest-cdf2b61af642
 */
export const exportedForTesting = { immediate, end, both, periodic };
