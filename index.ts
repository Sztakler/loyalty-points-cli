import { PointsStore } from "./src/store/PointsStore";
import {
  ArgumentParser,
  ArgumentParsingError,
  type ParsedCommand,
} from "./src/cli/ArgumentParser";
import * as logger from "./src/utils/logger";

const store = new PointsStore();
const args = process.argv.slice(2);
const parser = new ArgumentParser();

try {
  const command: ParsedCommand = parser.parse(args);

  switch (command.type) {
    case "earn":
      store.earn(command.customerId, command.points);
      logger.success(
        `Successfully added ${command.points} points to ${command.customerId}.`,
      );
      logger.info(
        `Current balance for ${command.customerId}: ${store.getBalance(command.customerId)} points.`,
      );
      break;
    case "redeem":
      const success = store.redeem(command.customerId, command.points);
      if (success) {
        logger.success(
          `Successfully redeemed ${command.points} points from ${command.customerId}.`,
        );
        logger.info(
          `Current balance for ${command.customerId}: ${store.getBalance(command.customerId)} points.`,
        );
      } else {
        logger.error(
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
    logger.error(`CLI Argument Error: ${e.message}`);
    logger.info("For usage information, run: bun run index.ts help");
  } else if (e instanceof Error) {
    logger.error(`Application Logic Error: ${e.message}`);
  } else {
    logger.error(`An unexpected error occured: ${e}`);
  }
  process.exit(1);
}

function printUsage(): void {
  logger.info("Loyalty Points Application CLI");
  logger.info("\nUsage:");
  logger.info(
    "  bun run index.ts earn <customerId> <points>   - Add points to a customer.",
  );
  logger.info(
    "  bun run index.ts redeem <customerId> <points> - Redeem points from a customer.",
  );
  logger.info(
    "  bun run index.ts help                         - Show this help message.",
  );
  logger.info("\nExamples:");
  logger.info("  bun run index.ts earn user123 100");
  logger.info("  bun run index.ts redeem user456 25");
}
