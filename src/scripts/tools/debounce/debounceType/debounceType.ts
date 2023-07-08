/**
 * The debounce type
 *
 * IMMEDIATE : the function should be called immediately, and then not anymore
 * until the delay has passed without a call.
 *
 * END : the function should not be called immediately, and will only be called
 * once the delay has passed without a call.
 *
 * BOTH : IMMEDIATE and END : the function should be called immediately, has
 * well as when the delay has passed without a call, but never in between.
 *
 * PERIODIC : the function should be called immediately, has well as when the
 * delay has passed without a call, and periodically in between, with the delay
 * as the period.
 */
export enum DebounceType {
  IMMEDIATE,
  END,
  BOTH,
  PERIODIC,
}
