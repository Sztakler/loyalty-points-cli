import * as logger from "../utils/logger";

/**
 * @class PointsStore
 * @description Manages customer loyalty points.
 * Stores point balances in memory and handles operations for adding (earn) and redeeming (redeem) points.
 */
export class PointsStore {
  private balances = new Map<string, number>();
  private lowBalanceThreshold = 10;

  /**
   * @private
   * @method validateCustomerId
   * @description Private method to validate a customer identifier.
   * Throws an error if the customerId is empty, null, or consists only of whitespace.
   * @param {string} customerId - The customer identifier to validate.
   * @throws {Error} If the customerId is invalid.
   */
  private validateCustomerId(customerId: string) {
    if (!customerId || customerId.trim() === "")
      throw new Error("Customer id cannot be empty or null.");
  }

  /**
   * @private
   * @method validatePoints
   * @description Private method to validate point values.
   * Throws an error if the points are invalid (e.g., not a positive integer).
   * @param {number} points - The number of points to validate.
   * @throws {Error} If the points are invalid.
   */
  private validatePoints(points: number) {
    if (
      points <= 0 ||
      typeof points !== "number" ||
      isNaN(points) ||
      !Number.isInteger(points)
    )
      throw new Error("Number of points must be a positive integer.");
  }

  /**
   * @method getBalance
   * @description Retrieves the current point balance for a given customer.
   * @param {string} customerId - The customer identifier.
   * @returns {number} The customer's current point balance. Returns 0 if the customer does not exist.
   * @throws {Error} If the customerId is invalid.
   */
  getBalance(customerId: string): number {
    this.validateCustomerId(customerId);
    return this.balances.get(customerId) ?? 0;
  }

  /**
   * @method earn
   * @description Adds a specified number of points to a customer's balance.
   * @param {string} customerId - The customer identifier.
   * @param {number} points - The number of points to add. Must be a positive integer.
   * @throws {Error} If customerId or points are invalid.
   */
  earn(customerId: string, points: number) {
    this.validateCustomerId(customerId);
    this.validatePoints(points);

    const currentPoints = this.getBalance(customerId);
    this.balances.set(customerId, currentPoints + points);
  }

  /**
   * @method redeem
   * @description Subtracts a specified number of points from a customer's balance.
   * The operation will fail (return false) if the customer does not have enough points.
   * Displays a warning if the customer's balance falls below the lowBalanceThreshold.
   * @param {string} customerId - The customer identifier.
   * @param {number} points - The number of points to redeem. Must be a positive integer.
   * @returns {boolean} True if points were successfully redeemed; false otherwise (insufficient points).
   * @throws {Error} If customerId or points are invalid.
   */
  redeem(customerId: string, points: number) {
    this.validateCustomerId(customerId);
    this.validatePoints(points);

    const currentPoints = this.getBalance(customerId);

    if (currentPoints < points) return false;

    this.balances.set(customerId, currentPoints - points);

    const currentBalance = this.getBalance(customerId);
    if (currentBalance < this.lowBalanceThreshold)
      logger.warning(
        `Warning: Customer ${customerId} has a low balance: ${currentBalance} points`,
      );
    return true;
  }
}
