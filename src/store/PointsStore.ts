export class PointsStore {
  private balances = new Map<string, number>();
  private lowBalanceThreshold = 10;

  private validateCustomerID(customerID: string) {
    if (!customerID || customerID.trim() === "")
      throw new Error("Customer ID cannot be empty or null.");
  }

  private validatePoints(points: number) {
    if (
      points <= 0 ||
      typeof points !== "number" ||
      isNaN(points) ||
      !Number.isInteger(points)
    )
      throw new Error("Number of points must be a positive integer.");
  }

  getBalance(customerID: string): number {
    this.validateCustomerID(customerID);
    return this.balances.get(customerID) ?? 0;
  }

  earn(customerID: string, points: number) {
    this.validateCustomerID(customerID);
    this.validatePoints(points);

    const currentPoints = this.getBalance(customerID);
    this.balances.set(customerID, currentPoints + points);
  }

  redeem(customerID: string, points: number) {
    this.validateCustomerID(customerID);
    this.validatePoints(points);

    const currentPoints = this.getBalance(customerID);

    if (currentPoints < points) return false;

    this.balances.set(customerID, currentPoints - points);

    const currentBalance = this.getBalance(customerID);
    if (currentBalance < this.lowBalanceThreshold)
      console.warn(
        `Warning: Customer ${customerID} has a low balance: ${currentBalance} points`,
      );
    return true;
  }
}
