import { nativeImage } from "electron";
import { TRAYCOUNTER, ONEMINUTE } from "./constants.js";
import { iconApp } from "./icons.js";
import { createCounterDown, getCounterNumberImage } from "./counter.js";

let intervalId;

export function trayCounterEnd(tray) {
  clearInterval(intervalId);
  tray.setImage(nativeImage.createFromPath(iconApp));
}

export function trayCounterStart(tray) {
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
