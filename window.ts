import { BrowserWindow } from "electron";
import { join } from "node:path";
import { iconApp } from "./icons.js";
import { historyApplicationEvent } from "./history.js";

const isDevToolsEnable = process.env.POMODORO_DEV;

export function createWindow() {
  historyApplicationEvent("createWindow");
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    fullscreen: true,
    transparent: true,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: join(import.meta.dirname, "preload.mjs"),
    },
    icon: iconApp,
  });

  mainWindow.setResizable(false);
  mainWindow.loadFile("index.html");
  mainWindow.hide();

  if (isDevToolsEnable) {
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
}
