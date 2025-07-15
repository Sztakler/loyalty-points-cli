/**
 * @typedef {'earn' | 'redeem' | 'help'} CommandType
 * @description Represents the types of CLI commands supported by the application.
 */
export type CommandType = "earn" | "redeem" | "help";

/**
 * @interface ParsedEarnCommand
 * @description Defines the structure for a parsed 'earn' command.
 * @property {'earn'} type - The type of the command, always 'earn'.
 * @property {string} customerId - The unique identifier for the customer.
 * @property {number} points - The number of points to be added.
 */
export interface ParsedEarnCommand {
  type: "earn";
  customerId: string;
  points: number;
}

/**
 * @interface ParsedRedeemCommand
 * @description Defines the structure for a parsed 'redeem' command.
 * @property {'redeem'} type - The type of the command, always 'redeem'.
 * @property {string} customerId - The unique identifier for the customer.
 * @property {number} points - The number of points to be redeemed.
 */
export interface ParsedRedeemCommand {
  type: "redeem";
  customerId: string;
  points: number;
}

/**
 * @interface ParsedHelpCommand
 * @description Defines the structure for a parsed 'help' command.
 * @property {'help'} type - The type of the command, always 'help'.
 */
export interface ParsedHelpCommand {
  type: "help";
}

/**
 * @typedef {ParsedEarnCommand | ParsedRedeemCommand | ParsedHelpCommand} ParsedCommand
 * @description A union type representing any of the possible parsed command structures.
 * This allows for type-safe handling of different command types.
 */
export type ParsedCommand =
  | ParsedEarnCommand
  | ParsedRedeemCommand
  | ParsedHelpCommand;

/**
 * @class ArgumentParsingError
 * @extends Error
 * @description Custom error class used to signal issues encountered during CLI argument parsing.
 * This allows for specific error handling in the main application logic.
 */
export class ArgumentParsingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ArgumentParsingError";
  }
}

/**
 * @class ArgumentParser
 * @description A class responsible for parsing command-line arguments
 * and converting them into structured command objects. It handles validation
 * of argument format and presence.
 */
export class ArgumentParser {
  /**
   * @method parse
   * @description Parses an array of command-line arguments into a ParsedCommand object.
   * This method validates the command name, the presence and format of customer ID and points,
   * and the correct number of arguments for each command.
   * @param {string[]} args - An array of command-line arguments (e.g., `process.argv.slice(2)`).
   * @returns {ParsedCommand} An object representing the parsed command.
   * @throws {ArgumentParsingError} If the arguments are invalid, missing, or the command is unknown.
   */
  parse(args: string[]): ParsedCommand {
    if (args.length === 0 || args[0] === "help") {
      return { type: "help" };
    }

    const command = args[0];
    const customerId = args[1];
    const pointsString = args[2];

    if (command === "earn" || command === "redeem") {
      if (!customerId || customerId.trim() === "") {
        throw new ArgumentParsingError(
          `Missing customer Id for '${command}' command. Usage: ${command} <customerId> <points>`,
        );
      }
      if (!pointsString) {
        throw new ArgumentParsingError(
          `Missing points value for '${command}' command. Usage: ${command} <customerId> <points>`,
        );
      }

      let points = Number(pointsString);

      if (isNaN(points) || !Number.isInteger(points) || points <= 0) {
        throw new ArgumentParsingError(
          `Invalid points value for '${command}' command. Points must be a positive integer.`,
        );
      }

      if (args.length !== 3) {
        throw new ArgumentParsingError(
          `Invalid number of arguments for '${command}' command. Usage: ${command} <customerId> <points>`,
        );
      }
      if (command == "earn") {
        return { type: "earn", customerId, points };
      }
      return { type: "redeem", customerId, points };
    }

    throw new ArgumentParsingError(
      `Unknown command: '${command}'. Use 'help' for usage information.`,
    );
  }
}
