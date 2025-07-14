export type CommandType = "earn" | "redeem" | "help";

export interface ParsedEarnCommand {
  type: "earn";
  customerID: string;
  points: number;
}

export interface ParsedRedeemCommand {
  type: "redeem";
  customerID: string;
  points: number;
}

export interface ParsedHelpCommand {
  type: "help";
}

export type ParsedCommand =
  | ParsedEarnCommand
  | ParsedRedeemCommand
  | ParsedHelpCommand;

export class ArgumentParsingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ArgumentParsingError";
  }
}

export class ArgumentParser {
  parse(args: string[]): ParsedCommand {
    if (args.length === 0 || args[0] === "help") {
      return { type: "help" };
    }

    const command = args[0];
    const customerID = args[1];
    const pointsString = args[2];

    if (command === "earn" || command === "redeem") {
      if (!customerID || customerID.trim() === "") {
        throw new ArgumentParsingError(
          `Missing customer ID for '${command}' command. Usage: ${command} <customerID> <points>`,
        );
      }
      if (!pointsString) {
        throw new ArgumentParsingError(
          `Missing points value for '${command}' command. Usage: ${command} <customerId> <points>`,
        );
      }

      let points: number;
      try {
        points = parseInt(pointsString, 10);
        if (isNaN(points) || !Number.isInteger(points) || points <= 0) {
          throw new ArgumentParsingError(
            `Invalid points value for '${command}' command. Points must be a positive integer.`,
          );
        }
      } catch (e) {
        throw new ArgumentParsingError(
          `Invalid points value for '${command}' command. Points must be a positive integer.`,
        );
      }

      if (args.length !== 3) {
        throw new ArgumentParsingError(
          `Invalid number of arguments for '${command}' command. Usage: ${command} <customerID> <points>`,
        );
      }
      if (command == "earn") {
        return { type: "earn", customerID, points };
      }
      return { type: "redeem", customerID, points };
    }

    throw new ArgumentParsingError(
      `Unknown command: '${command}'. Use 'help' for usage information.`,
    );
  }
}
