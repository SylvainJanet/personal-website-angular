import { LogLevel } from "./template/logging/logLevel.js";

/**
 * Environment variables for production..
 * This file replaces environment.js during CD workflow
 * for production.
 */
export const env = {
  env: "prod",
  logLevel: LogLevel.Warn,
  logWithDate: true,
};
