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
      store.earn(command.customerID, command.points);
      console.log(
        `Successfully added ${command.points} points to ${command.customerID}.`,
      );
      console.log(
        `Current balance for ${command.customerID}: ${store.getBalance(command.customerID)} points.`,
      );
      break;
    case "redeem":
      const success = store.redeem(command.customerID, command.points);
      if (success) {
      } else {
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
