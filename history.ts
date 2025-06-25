import { join } from "node:path";
import { getUserData } from "./constants.js";
import { writeFile } from "node:fs";

const HISTORY_FILE_NAME_USER = "pomodoro_history_user";
const HISTORY_FILE_NAME_APPLICATION = "pomodoro_history_application";
const PATH_TO_HISTORY_FILE_USER = join(getUserData(), HISTORY_FILE_NAME_USER);
const PATH_TO_HISTORY_FILE_APPLICATION = join(
  getUserData(),
  HISTORY_FILE_NAME_APPLICATION,
);

let currentdate = new Date(Date.now());
let historyApplicationLock = false;

function setCurrentDate() {
  currentdate = new Date(Date.now());
}

function setDate() {
  return new Intl.DateTimeFormat("uk-UA").format(currentdate);
}

function setTime() {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  } as const;
  return new Intl.DateTimeFormat("uk-UA", options).format(currentdate);
}

function setDateTimeText() {
  setCurrentDate();
  return `${setDate()}:${setTime()}`;
}

function setText(event: string, message?: string) {
  return `${setDateTimeText()}:${event}:${message ?? ""}\n`;
}

export function historyApplicationEvent(event: string, message?: string) {
  if (historyApplicationLock) return;

  writeFile(
    PATH_TO_HISTORY_FILE_APPLICATION,
    setText(event, message),
    { flag: "a" },
    () => {},
  );
}

export function historyUserEvent(event: string, message?: string) {
  historyApplicationLock = true;
  writeFile(
    PATH_TO_HISTORY_FILE_USER,
    setText(event, message),
    { flag: "a" },
    () => (historyApplicationLock = false),
  );
}
