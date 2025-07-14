export type CommandType = "earn" | "redeem" | "help";

export interface ParsedEarnCommand {
  type: "earn";
  customerId: string;
  points: number;
}

export interface ParsedRedeemCommand {
  type: "redeem";
  customerId: string;
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
