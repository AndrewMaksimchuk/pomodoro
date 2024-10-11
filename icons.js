import { join } from "node:path";
const iconApp = join(import.meta.dirname, "icons", "tomato.png");
const iconNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((numberValue) => join(import.meta.dirname, "icons", "numbers", numberValue + ".png"));
export { iconApp, iconNumbers };
