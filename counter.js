const { iconNumbers } = require("./icons")

let counter = 0;

function createCounterDown(start = 9) {
  counter = start;
  return () => counter--;
}

function getCounterNumberImage(numberValue) {
  return iconNumbers[numberValue];
}

module.exports = {
  createCounterDown,
  getCounterNumberImage,
}
