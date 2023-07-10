declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jasmine {
    /** Jasmine custom matchers. */
    interface Matchers<T> {
      /**
       * Checks if an object matches a predicate given as a parameter.
       *
       * @param predicate The predicate
       */
      toSatisfy(predicate: (x: T) => boolean): void;
    }
  }
}

export {};
