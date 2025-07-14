import chalk from "chalk";

/**
 * Symbols for different log levels.
 * These are Unicode characters that provide visual cues.
 */
const SYMBOLS = {
  SUCCESS: "✔",
  ERROR: "✖",
  WARNING: "⚠",
  INFO: "ℹ",
};

/**
 * Logs a success message to the console with green color and a checkmark symbol.
 * @param message The message to log.
 */
export function success(message: string): void {
  console.log(chalk.green(`${SYMBOLS.SUCCESS} ${message}`));
}

/**
 * Logs an error message to the console with red color and a cross mark symbol.
 * @param message The message to log.
 */
export function error(message: string): void {
  console.error(chalk.red(`${SYMBOLS.ERROR} ${message}`));
}

/**
 * Logs a warning message to the console with yellow color and a warning sign symbol.
 * @param message The message to log.
 */
export function warning(message: string): void {
  console.warn(chalk.yellow(`${SYMBOLS.WARNING} ${message}`));
}

/**
 * Logs an informational message to the console with blue color and an info sign symbol.
 * This is for general output that isn't a success, error, or warning.
 * @param message The message to log.
 */
export function info(message: string): void {
  console.info(chalk.cyan(`${SYMBOLS.INFO} ${message}`));
}

/**
 * Logs a general message to the console without special formatting.
 * This can be used for regular output that doesn't fit other categories.
 * @param message The message to log.
 */
export function log(message: string): void {
  console.log(message);
}
