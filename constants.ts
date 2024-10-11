import { app } from "electron";

export const ONEMINUTE = 60 * 1000;
export const LONGTIME = ONEMINUTE * 25;
export const BREAKETIME = ONEMINUTE * 5;
export const TRAYCOUNTER = 5;
export const TRAYCOUNTERTIME = LONGTIME - ONEMINUTE * (TRAYCOUNTER + 1);
let USER_DATA: string | undefined = undefined;

export function setOsConstants() {
  USER_DATA = app.getPath("userData");
}

export function getUserData() {
  return USER_DATA;
}
