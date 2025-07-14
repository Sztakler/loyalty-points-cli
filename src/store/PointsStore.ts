export class PointsStore {
  private balances = new Map<string, number>();
  private lowBalanceThreshold = 10;

  getBalance(customerID: string): number {
    if (!customerID || customerID.trim() === "")
      throw new Error("Customer ID cannot be empty or null");
    return this.balances.get(customerID) ?? 0;
  }

  earn(customerID: string, points: number) {
    if (!customerID || customerID.trim() === "")
      throw new Error("Customer ID cannot be empty or null");
    const currentPoints = this.getBalance(customerID);
    this.balances.set(customerID, currentPoints + points);
  }

  redeem(customerID: string, points: number) {
    if (!customerID || customerID.trim() === "")
      throw new Error("Customer ID cannot be empty or null");
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
