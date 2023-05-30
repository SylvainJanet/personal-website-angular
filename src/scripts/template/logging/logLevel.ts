/**
 * LogLevel used by our loggers, sorted by priority and urgency.
 * If a level is logged, every level above is also logged.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LogLevel: any = {
  All: 0,
  Debug: 1,
  Info: 2,
  Warn: 3,
  Error: 4,
  Fatal: 5,
  Off: 6,

  0: 'All',
  1: 'Debug',
  2: 'Info',
  3: 'Warn',
  4: 'Error',
  5: 'Fatal',
  6: 'Off',
};
