export class PointsStore {
  private balances = new Map<string, number>();

  getBalance(customerID: string): number {
    return this.balances.get(customerID) ?? 0;
  }

  earn(customerID: string, points: number) {
    const currentPoints = this.getBalance(customerID);
    this.balances.set(customerID, currentPoints + points);
  }

  redeem(customerID: string, points: number) {
    const currentPoints = this.getBalance(customerID);

    if (currentPoints < points) return false;

    this.balances.set(customerID, currentPoints - points);
    return true;
  }
}
