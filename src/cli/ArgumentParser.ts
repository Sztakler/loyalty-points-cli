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
