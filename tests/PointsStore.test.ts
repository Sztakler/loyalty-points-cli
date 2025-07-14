import { test, expect, spyOn, beforeAll, afterEach } from "bun:test";
import { PointsStore } from "../src/store/PointsStore.ts";

let store: PointsStore;

beforeAll(() => {
  store = new PointsStore();
});

test("earn adds points to the balance", () => {
  store.earn("user123", 50);
  expect(store.getBalance("user123")).toBe(50);
});

test("redeem subtracts points and shows warning if < 10", () => {
  store.earn("user456", 20);
  const result = store.redeem("user456", 15);
  expect(result).toBe(true);

  expect(store.getBalance("user456")).toBe(5);
});

test("warns when balance drops below 10", () => {
  store.earn("user789", 15);

  const warnSpy = spyOn(console, "warn");

  store.redeem("user789", 10);

  expect(warnSpy).toHaveBeenCalledWith(
    "Warning: Customer user789 has a low balance: 5 points",
  );

  warnSpy.mockRestore();
});
