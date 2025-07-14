import { test, expect, beforeEach } from "bun:test";
import {
  ArgumentParser,
  ArgumentParsingError,
} from "../../src/cli/ArgumentParser";

let parser: ArgumentParser;

beforeEach(() => {
  parser = new ArgumentParser();
});

// help command

test("parse returns help command when no arguments are provided", () => {
  const command = parser.parse([]);
  expect(command).toEqual({ type: "help" });
});

test("parse returns help command when 'help' argument is provided", () => {
  const command = parser.parse(["help"]);
  expect(command).toEqual({ type: "help" });
});

test("parse returns help command even with extra arguments if 'help' is first", () => {
  const command = parser.parse(["help", "extra", "args"]);
  expect(command).toEqual({ type: "help" });
});

// earn command

test("parse returns earn command with correct customerId and points", () => {
  const command = parser.parse(["earn", "testUser1", "100"]);
  expect(command).toEqual({
    type: "earn",
    customerId: "testUser1",
    points: 100,
  });
});

test("earn throws ArgumentParsingError for missing customerId", () => {
  expect(() => parser.parse(["earn"])).toThrow(ArgumentParsingError);
  expect(() => parser.parse(["earn", "", "100"])).toThrow(ArgumentParsingError);
  expect(() => parser.parse(["earn", "   ", "100"])).toThrow(
    ArgumentParsingError,
  );
});

test("earn throws ArgumentParsingError for missing points", () => {
  expect(() => parser.parse(["earn", "testUser2"])).toThrow(
    ArgumentParsingError,
  );
});

test("earn throws ArgumentParsingError for non-numeric points", () => {
  expect(() => parser.parse(["earn", "testUser3", "abc"])).toThrow(
    ArgumentParsingError,
  );
});

test("earn throws ArgumentParsingError for non-integer points", () => {
  expect(() => parser.parse(["earn", "testUser4", "10.5"])).toThrow(
    ArgumentParsingError,
  );
});

test("earn throws ArgumentParsingError for zero points", () => {
  expect(() => parser.parse(["earn", "testUser5", "0"])).toThrow(
    ArgumentParsingError,
  );
});

test("earn throws ArgumentParsingError for negative points", () => {
  expect(() => parser.parse(["earn", "testUser6", "-50"])).toThrow(
    ArgumentParsingError,
  );
});

test("earn throws ArgumentParsingError for incorrect number of arguments (too many)", () => {
  expect(() => parser.parse(["earn", "testUser7", "100", "extra"])).toThrow(
    ArgumentParsingError,
  );
});

// redeem commands

test("parse returns redeem command with correct customerId and points", () => {
  const command = parser.parse(["redeem", "testUser8", "50"]);
  expect(command).toEqual({
    type: "redeem",
    customerId: "testUser8",
    points: 50,
  });
});

test("redeem throws ArgumentParsingError for missing customerId", () => {
  expect(() => parser.parse(["redeem"])).toThrow(ArgumentParsingError);
  expect(() => parser.parse(["redeem", "", "100"])).toThrow(
    ArgumentParsingError,
  );
  expect(() => parser.parse(["redeem", "   ", "100"])).toThrow(
    ArgumentParsingError,
  );
});

test("redeem throws ArgumentParsingError for missing points", () => {
  expect(() => parser.parse(["redeem", "testUser9"])).toThrow(
    ArgumentParsingError,
  );
});

test("redeem throws ArgumentParsingError for non-numeric points", () => {
  expect(() => parser.parse(["redeem", "testUser10", "xyz"])).toThrow(
    ArgumentParsingError,
  );
});

test("redeem throws ArgumentParsingError for non-integer points", () => {
  expect(() => parser.parse(["redeem", "testUser11", "25.7"])).toThrow(
    ArgumentParsingError,
  );
});

test("redeem throws ArgumentParsingError for zero points", () => {
  expect(() => parser.parse(["redeem", "testUser12", "0"])).toThrow(
    ArgumentParsingError,
  );
});

test("redeem throws ArgumentParsingError for negative points", () => {
  expect(() => parser.parse(["redeem", "testUser13", "-10"])).toThrow(
    ArgumentParsingError,
  );
});

test("redeem throws ArgumentParsingError for incorrect number of arguments (too many)", () => {
  expect(() => parser.parse(["redeem", "testUser14", "50", "extra"])).toThrow(
    ArgumentParsingError,
  );
});

// unknown command

test("parse throws ArgumentParsingError for an unknown command", () => {
  expect(() => parser.parse(["unknownCommand", "user", "10"])).toThrow(
    ArgumentParsingError,
  );
  expect(() => parser.parse(["foobar"])).toThrow(ArgumentParsingError);
});

// error messages

test("earn throws ArgumentParsingError with specific message for missing customer Id", () => {
  expect(() => parser.parse(["earn", "", "100"])).toThrow(
    "Missing customer Id for 'earn' command. Usage: earn <customerId> <points>",
  );
});

test("redeem throws ArgumentParsingError with specific message for invalid points", () => {
  expect(() => parser.parse(["redeem", "user", "invalid"])).toThrow(
    "Invalid points value for 'redeem' command. Points must be a positive integer.",
  );
});

test("throws ArgumentParsingError with specific message for unknown command", () => {
  expect(() => parser.parse(["someRandomCmd"])).toThrow(
    "Unknown command: 'someRandomCmd'. Use 'help' for usage information.",
  );
});
