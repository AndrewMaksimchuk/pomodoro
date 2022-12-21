const { app, BrowserWindow, Menu, Tray, ipcMain } = require("electron");
const { join } = require("node:path");

const toIcons = join(__dirname, "icons");
const iconApp = join(toIcons, "tomato.png");


const isDevToolsEnable = false;
let mainWindow = null;
let tray = null;
const oneMinute = 60 * 1000;
const longTime = oneMinute * 25;
const breakeTime = oneMinute * 5;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    fullscreen: true,
    transparent: true,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: iconApp,
  });
  mainWindow.setResizable(false);
  mainWindow.loadFile("index.html");
  mainWindow.hide();
  if (isDevToolsEnable) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
    tray = new Tray(iconApp);
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Take a break', type: 'normal', click: takeBreak },
      { label: 'Relaunch', type: 'normal', click: relaunchApp },
      { label: 'Exit', type: 'normal',  click: closeApp},
    ]);
    tray.setToolTip('POMODORO');
    tray.setContextMenu(contextMenu);
  
    createWindow();
    setTimeout(showLayout, longTime);
  });

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

///////////////////////////////////////////////////////////////////////////////
function hideLayout() {
  mainWindow.hide();
  setTimeout(showLayout, longTime);
}

function showLayout() {
  mainWindow.show();
  setTimeout(hideLayout, breakeTime);
}

function closeApp() {
  app.quit();
}

function relaunchApp() {
  app.relaunch();
  app.quit();
}

function takeBreak() {
  mainWindow.show();
  setTimeout(() => mainWindow.hide(), oneMinute);
}
