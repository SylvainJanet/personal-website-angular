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
    _target: Object,
    // eslint-disable-next-line @typescript-eslint/ban-types
    _propertyKey: string | Symbol,
    _descriptor: PropertyDescriptor
  ) => {
    const original = _descriptor.value;
    const key = `__timeout__${_propertyKey}`;
    const keyTimeStarted = key + '__timeStarted';
    _descriptor[keyTimeStarted as keyof PropertyDescriptor] = false;

    _descriptor.value = function (...args: unknown[]) {
      if (type == DebounceType.IMMEDIATE) {
        if (!this[keyTimeStarted as keyof PropertyDescriptor])
          original.apply(this, args);
        this[keyTimeStarted as keyof PropertyDescriptor] = true;
        clearTimeout(this[key as keyof PropertyDescriptor]);
        this[key as keyof PropertyDescriptor] = setTimeout(
          () => (this[keyTimeStarted as keyof PropertyDescriptor] = false),
          delay
        );
      }

      if (type == DebounceType.END) {
        clearTimeout(this[key as keyof PropertyDescriptor]);
        this[key as keyof PropertyDescriptor] = setTimeout(
          () => original.apply(this, args),
          delay
        );
      }

      if (type == DebounceType.BOTH) {
        if (!this[keyTimeStarted as keyof PropertyDescriptor])
          original.apply(this, args);
        this[keyTimeStarted as keyof PropertyDescriptor] = true;
        clearTimeout(this[key as keyof PropertyDescriptor]);
        this[key as keyof PropertyDescriptor] = setTimeout(() => {
          this[keyTimeStarted as keyof PropertyDescriptor] = false;
          original.apply(this, args);
        }, delay);
      }

      if (type == DebounceType.PERIODIC) {
        if (!this[keyTimeStarted as keyof PropertyDescriptor]) {
          original.apply(this, args);
          this[key as keyof PropertyDescriptor] = setTimeout(() => {
            this[keyTimeStarted as keyof PropertyDescriptor] = false;
            original.apply(this, args);
          }, delay);
        }
        this[keyTimeStarted as keyof PropertyDescriptor] = true;
      }
    };

    return _descriptor;
  };
}
