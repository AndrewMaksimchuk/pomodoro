import { BrowserWindow, screen } from "electron";
import { join } from "node:path";
import { iconApp } from "./icons.js";

const isDevToolsEnable = process.env.POMODORO_DEV;

export function createWindowHistory() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { height } = primaryDisplay.workAreaSize;

  const historyWindow = new BrowserWindow({
    width: 800,
    height: Math.round(height * 0.9),
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: join(import.meta.dirname, "preload_history.mjs"),
    },
    icon: iconApp,
  });

  historyWindow.loadFile("./history_ui/dist/index.html");
  historyWindow.removeMenu();
  historyWindow.hide();

  if (isDevToolsEnable) {
    historyWindow.webContents.openDevTools();
  }

  return historyWindow;
}
