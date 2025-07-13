import { PointsStore } from "./src/store/PointsStore";

const store = new PointsStore();
store.earn("user123", 50);
console.log(store.getBalance("user123"));
