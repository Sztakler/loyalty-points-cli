import { test, expect } from "bun:test";
import { PointsStore } from "../src/store/PointsStore.ts";

test("earn adds points to the balance", () => {
  const store = new PointsStore();
  store.earn("user123", 50);
  expect(store.getBalance("user123")).toBe(50);
});

test("redeem subtracts points and shows warning if < 10", () => {
  const store = new PointsStore();
  store.earn("user456", 20);
  const result = store.redeem("user456", 15);
  expect(result).toBe(true);

  expect(store.getBalance("user456")).toBe(5);
});
