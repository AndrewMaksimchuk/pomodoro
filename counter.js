import { iconNumbers } from "./icons.js";

let counter = 0;

export function createCounterDown(start = 9) {
  counter = start;
  return () => counter--;
}

export function getCounterNumberImage(numberValue) {
  return iconNumbers[numberValue];
}
