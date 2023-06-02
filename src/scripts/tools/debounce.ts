// https://stackoverflow.com/questions/44634992/debounce-hostlistener-event

export enum DebounceType {
  IMMEDIATE,
  END,
  BOTH,
  PERIODIC,
}

export function debounce(
  delay = 200,
  type = DebounceType.PERIODIC
): MethodDecorator {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: Object,
    // eslint-disable-next-line @typescript-eslint/ban-types
    propertyKey: string | Symbol,
    descriptor: PropertyDescriptor
  ) => {
    const original = descriptor.value;
    const key = `__timeout__${propertyKey}`;
    const keyTimeStarted = key + '__timeStarted';
    descriptor[keyTimeStarted as keyof PropertyDescriptor] = false;

    descriptor.value = function (...args: unknown[]) {
      switch (type) {
        case DebounceType.IMMEDIATE:
          immediate(this, key, keyTimeStarted, original, delay, args);
          break;
        case DebounceType.END:
          end(this, key, keyTimeStarted, original, delay, args);
          break;
        case DebounceType.BOTH:
          both(this, key, keyTimeStarted, original, delay, args);
          break;
        case DebounceType.PERIODIC:
          periodic(this, key, keyTimeStarted, original, delay, args);
          break;
      }
    };

    return descriptor;
  };
}

function immediate(
  descriptor: PropertyDescriptor,
  key: string,
  keyTimeStarted: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  original: any,
  delay: number,
  args: unknown[]
) {
  if (!descriptor[keyTimeStarted as keyof PropertyDescriptor])
    original.apply(descriptor, args);
  descriptor[keyTimeStarted as keyof PropertyDescriptor] = true;
  clearTimeout(descriptor[key as keyof PropertyDescriptor]);
  descriptor[key as keyof PropertyDescriptor] = setTimeout(
    () => (descriptor[keyTimeStarted as keyof PropertyDescriptor] = false),
    delay
  );
}

function end(
  descriptor: PropertyDescriptor,
  key: string,
  _keyTimeStarted: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  original: any,
  delay: number,
  args: unknown[]
) {
  clearTimeout(descriptor[key as keyof PropertyDescriptor]);
  descriptor[key as keyof PropertyDescriptor] = setTimeout(
    () => original.apply(descriptor, args),
    delay
  );
}

function both(
  descriptor: PropertyDescriptor,
  key: string,
  keyTimeStarted: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  original: any,
  delay: number,
  args: unknown[]
) {
  if (!descriptor[keyTimeStarted as keyof PropertyDescriptor])
    original.apply(descriptor, args);
  descriptor[keyTimeStarted as keyof PropertyDescriptor] = true;
  clearTimeout(descriptor[key as keyof PropertyDescriptor]);
  descriptor[key as keyof PropertyDescriptor] = setTimeout(() => {
    descriptor[keyTimeStarted as keyof PropertyDescriptor] = false;
    original.apply(descriptor, args);
  }, delay);
}

function periodic(
  descriptor: PropertyDescriptor,
  key: string,
  keyTimeStarted: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  original: any,
  delay: number,
  args: unknown[]
) {
  if (!descriptor[keyTimeStarted as keyof PropertyDescriptor]) {
    original.apply(descriptor, args);
    descriptor[key as keyof PropertyDescriptor] = setTimeout(() => {
      descriptor[keyTimeStarted as keyof PropertyDescriptor] = false;
      original.apply(descriptor, args);
    }, delay);
  }
  descriptor[keyTimeStarted as keyof PropertyDescriptor] = true;
}
