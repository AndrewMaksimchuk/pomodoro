const { BrowserWindow } = require("electron");
const { join } = require("node:path");
const { iconApp } = require("./icons");

const isDevToolsEnable = process.env.POMODORO_DEV;

function createWindow() {
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
      preload: join(__dirname, "preload.js"),
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

module.exports = {
  createWindow,
};
