const { app, globalShortcut } = require("electron");
const { LONGTIME, BREAKETIME, TRAYCOUNTERTIME } = require("./constants");
const { getSoundVolumn } = require("./settings");

let tray;
let trayConterId;
let timerId = setTimeout(() => {});

function mainController() {
  const { createWindow } = require("./window");
  const { createTray } = require("./tray");
  const { createDirectories } = require("./directory");
  const { addExercise } = require("./exercise");
  const { exercise } = require("./preload_controller");
  const { trayCounterStart, trayCounterEnd } = require("./tray_counter");

  createDirectories();

  const mainWindow = createWindow();

  const onShow = () => {
    const pageData = {
      value: "show",
      exercise: exercise(),
      volume: getSoundVolumn(),
    };
    mainWindow.webContents.send("index_page", pageData);
  };

  const onHide = () => {
    const pageData = {
      value: "hide",
      exercise: "",
      volume: getSoundVolumn(),
    };
    mainWindow.webContents.send("index_page", pageData);
  };

  function closeApp() {
    app.quit();
  }

  function relaunchApp() {
    app.relaunch();
    app.quit();
  }

  function takeBreak() {
    trayCounterEnd(tray);
    mainWindow.show();
    timerId = setTimeout(() => mainWindow.hide(), BREAKETIME);
    onShow();
  }

  function hideLayout() {
    mainWindow.hide();
    trayConterId = setTimeout(() => trayCounterStart(tray), TRAYCOUNTERTIME);
    timerId = setTimeout(showLayout, LONGTIME);
    onHide();
  }

  function showLayout() {
    mainWindow.show();
    trayCounterEnd(tray);
    timerId = setTimeout(hideLayout, BREAKETIME);
    onShow();
  }

  function skipBreak() {
    clearTimeout(timerId);
    clearTimeout(trayConterId);
    hideLayout();
  }

  globalShortcut.register("Alt+Control+Q", () => {
    skipBreak();
  });

  tray = createTray({
    takeBreak,
    skipBreak,
    relaunchApp,
    closeApp,
    addExercise,
  });

  setTimeout(showLayout, LONGTIME);
  trayConterId = setTimeout(() => trayCounterStart(tray), TRAYCOUNTERTIME);
}

module.exports = {
  mainController,
};
