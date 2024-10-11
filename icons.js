const { join } = require("node:path");

const iconApp = join(__dirname, "icons", "tomato.png");
const iconNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((numberValue) =>
  join(__dirname, "icons", "numbers", numberValue + ".png"),
);

module.exports = {
  iconApp,
  iconNumbers,
};
