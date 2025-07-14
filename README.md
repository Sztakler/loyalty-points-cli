# loyalty-points-cli

This is a very simple CLI application used for managing loyalty points between users written using TypeScript and Bun.js. It allows for running commands in terminal or writing scripts using code API.

## Installing dependencies

```bash
bun install
```

## Running the application

```bash
bun run index.ts <command> <argument>
```

### Commands

Application supports three commands:
- `earn` -- adding specified number of points to user's balance.
- `redeem` -- subtracting specified number of points from user's balance.
- `earn` -- displaying usage information.

### Display help information

To see available commands and their usage:

```
bun run index.ts help
```

or simply:

```
bun run index.ts
```

### Earn loyalty points

To add points to customer's balance:

```
bun run index.ts earn <customerId> <points>
```

- Replace `<customerId>` with a unique identifier for the customer (e.g., `user123`).
- Replace `<points>` with a positive integer representing the points to add (e.g., `100`).

Example:

```
bun run index.ts earn customerA 100
```

### Redeem loyalty points

```
bun run index.ts redeem<customerId> <points>
```

- Replace `<customerId>` with a unique identifier for the customer (e.g., `user123`).
- Replace `<points>` with a positive integer representing the points to redeem (e.g., `100`).

Example:

```
bun run index.ts redeem customerA 100
```

## Error handling

The application includes robust error handling for invalid commands or arguments. If provided with incorrect input, it responds with a descriptive error message.

Examples of invalid commands:
```
bun run index.ts earn customerB      # Missing points
bun run index.ts redeem customerC abc # Non-numeric points
bun run index.ts invalidCommand      # Unknown command
```

## Running tests

Comprehensive unit tests are defined to ensure that business logic and argument parsing work as expected. Tests are configured to run automatically via GitHub Actions on each `push` and `pull request`, providing a basic CI.

To run all tests locally using Bun:
```
  bun test
```

This project was created using `bun init` in bun v1.2.11. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

