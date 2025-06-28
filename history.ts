import type { BrowserWindow } from "electron";
import { join } from "node:path";
import { getUserData } from "./constants.js";
import { readFile, writeFile } from "node:fs";
import { createWindowHistory } from "./window_history.js";
import { ipcMain } from "electron/main";

const HISTORY_FILE_NAME_USER = "pomodoro_history_user";
const HISTORY_FILE_NAME_APPLICATION = "pomodoro_history_application";
export const PATH_TO_HISTORY_FILE_USER = join(
  getUserData(),
  HISTORY_FILE_NAME_USER,
);
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

const separator = "#";
function setText(event: string, message?: string) {
  setCurrentDate();
  return `${setDate()}${separator}${setTime()}${separator}${event}${separator}${message ?? ""}\n`;
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

function onHistoryOnData(
  historyWindow: BrowserWindow,
  historyText: { value: HistoryItem[] },
) {
  return () => {
    historyWindow.webContents.send("history_send_data", historyText.value);
  };
}

export interface HistoryItem {
  date: string;
  time: string;
  event: string;
  message: string;
}

export function historyShowPage() {
  const historyText: { value: HistoryItem[] } = {
    value: [],
  };
  const historyWindow = createWindowHistory();
  const ipcMainOnHandler = onHistoryOnData(historyWindow, historyText);

  ipcMain.on("history_on_data", ipcMainOnHandler);

  historyWindow.on("close", () =>
    ipcMain.off("history_on_data", ipcMainOnHandler),
  );

  readFile(PATH_TO_HISTORY_FILE_USER, {}, (err, data) => {
    if (err) return;

    historyText.value = data
      .toString()
      .split("\n")
      .map((row) => {
        const [date, time, event, message] = row.split(separator);
        return {
          date,
          time,
          event,
          message,
        };
      });
    historyWindow.show();
  });
}
