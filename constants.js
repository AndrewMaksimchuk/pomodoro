const { app } = require("electron");

const ONEMINUTE = 60 * 1000;
const LONGTIME = ONEMINUTE * 25;
const BREAKETIME = ONEMINUTE * 5;
let USER_DATA = undefined;

function setOsConstants() {
  USER_DATA = app.getPath("userData");
}

function getUserData() {
  return USER_DATA;
}

module.exports = {
  ONEMINUTE,
  LONGTIME,
  BREAKETIME,
  setOsConstants,
  getUserData,
};
