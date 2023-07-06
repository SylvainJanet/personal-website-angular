import { Observable, tap } from 'rxjs';

/**
 * Operator that will run some predicate only for the first emission, once
 * across all subscribers.
 *
 * @param predicateNext The predicate to run if the first emission is successful
 * @param predicateError The predicate to run if the first emission is an error.
 *   If none specified, the one used when the first emission is successful will
 *   be used
 * @returns The operator
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ifFirst = (predicateNext: any, predicateError?: any) => {
  if (predicateError === undefined) {
    predicateError = predicateNext;
  }
  let first = true;
  return <T>(source: Observable<T>) => {
    return source.pipe(
      tap({
        next: () => {
          if (first) {
            predicateNext();
            first = false;
          }
        },
        error: () => {
          if (first) {
            predicateError();
            first = false;
          }
        },
      })
    );
  };
};
