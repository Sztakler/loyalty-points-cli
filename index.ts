import { PointsStore } from "./src/store/PointsStore";
import {
  ArgumentParser,
  ArgumentParsingError,
  type ParsedCommand,
} from "./src/cli/ArgumentParser";

const store = new PointsStore();
const args = process.argv.slice(2);
const parser = new ArgumentParser();

try {
  const command: ParsedCommand = parser.parse(args);

  switch (command.type) {
    case "earn":
      store.earn(command.customerId, command.points);
      console.log(
        `Successfully added ${command.points} points to ${command.customerId}.`,
      );
      console.log(
        `Current balance for ${command.customerId}: ${store.getBalance(command.customerId)} points.`,
      );
      break;
    case "redeem":
      const success = store.redeem(command.customerId, command.points);
      if (success) {
        console.log(
          `Successfully redeemed ${command.points} points from ${command.customerId}.`,
        );
        console.log(
          `Current balance for ${command.customerId}: ${store.getBalance(command.customerId)} points.`,
        );
      } else {
        console.error(
          `Failed to redeem ${command.points} from ${command.customerId}. Insufficient balance.`,
        );
      }
      break;
    case "help":
      printUsage();
      break;
  }
} catch (e: any) {
  if (e instanceof ArgumentParsingError) {
    console.error(`CLI Argument Error: ${e.message}`);
    console.log("For usage information, run: bun run index.ts help");
  } else if (e instanceof Error) {
    console.error(`Application Logic Error: ${e.message}`);
  } else {
    console.error(`An unexpected error occured: ${e}`);
  }
  process.exit(1);
}

function printUsage(): void {
  console.log("Loyalty Points Application CLI");
  console.log("\nUsage:");
  console.log(
    "  bun run index.ts earn <customerId> <points>   - Add points to a customer.",
  );
  console.log(
    "  bun run index.ts redeem <customerId> <points> - Redeem points from a customer.",
  );
  console.log(
    "  bun run index.ts help                         - Show this help message.",
  );
  console.log("\nExamples:");
  console.log("  bun run index.ts earn user123 100");
  console.log("  bun run index.ts redeem user456 25");
}
