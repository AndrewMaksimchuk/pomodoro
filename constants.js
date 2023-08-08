const { app } = require("electron");

const ONEMINUTE = 60 * 1000;
const LONGTIME = ONEMINUTE * 25;
const BREAKETIME = ONEMINUTE * 5;
const USER_DATA = app.getPath("userData");

module.exports = {
  ONEMINUTE,
  LONGTIME,
  BREAKETIME,
  USER_DATA,
}
