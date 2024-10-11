const { nativeImage } = require("electron");
const { TRAYCOUNTER, ONEMINUTE } = require("./constants");
const { iconApp } = require("./icons");
const { createCounterDown, getCounterNumberImage } = require("./counter");

let intervalId;

function trayCounterEnd(tray) {
  clearInterval(intervalId);
  tray.setImage(nativeImage.createFromPath(iconApp));
}

function trayCounterStart(tray) {
  const counter = createCounterDown(TRAYCOUNTER);
  intervalId = setInterval(() => {
    const nextNumber = counter();

    if (0 === nextNumber) {
      return trayCounterEnd(tray);
    }

    const counterImage = getCounterNumberImage(nextNumber);
    tray.setImage(nativeImage.createFromPath(counterImage));
  }, ONEMINUTE);
}

module.exports = {
  trayCounterStart,
  trayCounterEnd,
};
