import { test, expect, spyOn, afterEach, beforeEach } from "bun:test";
import { PointsStore } from "../../src/store/PointsStore.ts";
import * as logger from "../../src/utils/logger";

let store: PointsStore;

beforeEach(() => {
  store = new PointsStore();
});

afterEach(() => {
  store = new PointsStore();
});

test("getBalance returns 0 for non-existent customer", () => {
  expect(store.getBalance("nonExistentUser")).toBe(0);
});

test("getBalance throws an error for an empty customerID", () => {
  expect(() => store.getBalance("")).toThrow(
    "Customer ID cannot be empty or null.",
  );
});

test("getBalance throws an error for customer ID with only whitespace", () => {
  expect(() => store.getBalance("   ")).toThrow(
    "Customer ID cannot be empty or null.",
  );
});

test("earn adds points to the balance", () => {
  store.earn("user123", 50);
  expect(store.getBalance("user123")).toBe(50);
});

test("earn accumulates points for the same user", () => {
  store.earn("user123", 50);
  store.earn("user123", 60);
  expect(store.getBalance("user123")).toBe(110);
});

test("earn throws an error for empty customer ID", () => {
  expect(() => store.earn("", 100)).toThrow(
    "Customer ID cannot be empty or null.",
  );
});

test("earn throws an error for customer ID with only whitespace", () => {
  expect(() => store.earn("   ", 100)).toThrow(
    "Customer ID cannot be empty or null.",
  );
});

test("earn throws an error for zero points", () => {
  expect(() => store.earn("user123", 0)).toThrow(
    "Number of points must be a positive integer.",
  );
});

test("earn throws an error for negative points", () => {
  expect(() => store.earn("user123", -12)).toThrow(
    "Number of points must be a positive integer.",
  );
});
test("earn throws an error for non-integer points", () => {
  expect(() => store.earn("user123", 3.14)).toThrow(
    "Number of points must be a positive integer.",
  );
});
test("earn throws an error for non-number points (string)", () => {
  expect(() => store.earn("user123", "123" as any)).toThrow(
    "Number of points must be a positive integer.",
  );
});
test("earn throws an error for NaN points", () => {
  expect(() => store.earn("user123", NaN)).toThrow(
    "Number of points must be a positive integer.",
  );
});

test("redeem subtracts points and shows warning if < 10", () => {
  store.earn("user456", 20);
  const result = store.redeem("user456", 15);

  expect(result).toBe(true);
  expect(store.getBalance("user456")).toBe(5);
});

test("redeem returns false if not enough points", () => {
  store.earn("user789", 15);
  const result = store.redeem("user789", 100);

  expect(result).toBe(false);
  expect(store.getBalance("user789")).toBe(15);
});

test("redeem throws an error for empty customer ID", () => {
  expect(() => store.redeem("", 10)).toThrow(
    "Customer ID cannot be empty or null.",
  );
});
test("redeem throws an error for customer ID with only whitespaces", () => {
  expect(() => store.redeem("   ", 10)).toThrow(
    "Customer ID cannot be empty or null.",
  );
});
test("redeem throws an error for zero points", () => {
  expect(() => store.redeem("user123", 0)).toThrow(
    "Number of points must be a positive integer.",
  );
});
test("redeem throws an error for negative points", () => {
  expect(() => store.redeem("user123", -12)).toThrow(
    "Number of points must be a positive integer.",
  );
});
test("redeem throws an error for non-integer points", () => {
  expect(() => store.redeem("user123", 3.14)).toThrow(
    "Number of points must be a positive integer.",
  );
});
test("redeem throws an error for non-number points (string)", () => {
  expect(() => store.redeem("user123", "123" as any)).toThrow(
    "Number of points must be a positive integer.",
  );
});
test("redeem throws an error for NaN points", () => {
  expect(() => store.redeem("user123", NaN)).toThrow(
    "Number of points must be a positive integer.",
  );
});

test("warns when balance drops below 10 after redemption", () => {
  const warnSpy = spyOn(logger, "warning");

  store.earn("user789", 15);
  store.redeem("user789", 10);

  expect(warnSpy).toHaveBeenCalledWith(
    "Warning: Customer user789 has a low balance: 5 points",
  );

  warnSpy.mockRestore();
});

test("does not warn when balance is 10 or above after redemption", () => {
  const warnSpy = spyOn(logger, "warning");

  store.earn("user789", 50);
  store.redeem("user789", 40);

  expect(store.getBalance("user789")).toBe(10);
  expect(warnSpy).not.toHaveBeenCalled();

  warnSpy.mockRestore();
});

test("does not warn when initial balance is already below 10 and no redemption", () => {
  const warnSpy = spyOn(logger, "warning");

  store.earn("user123", 5);

  expect(store.getBalance("user123")).toBe(5);
  expect(warnSpy).not.toHaveBeenCalled();

  warnSpy.mockRestore();
});
