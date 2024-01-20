const { app, globalShortcut } = require("electron");
const { LONGTIME, BREAKETIME } = require("./constants");
const { getSoundVolumn } = require("./settings");

let timerId = setTimeout(() => { });

function mainController() {
  const { createWindow } = require("./window");
  const { createTray } = require("./tray");
  const { createDirectories } = require("./directory");
  const { addExercise } = require("./exercise");
  const { exercise } = require("./preload_controller");

  createDirectories();

  const mainWindow = createWindow();

  const onShow = () => {
    const pageData = {
      value: 'show',
      exercise: exercise(),
      volume: getSoundVolumn(),
    }
    mainWindow.webContents.send('index_page', pageData);
  }

  const onHide = () => {
    const pageData = {
      value: 'hide',
      exercise: '',
      volume: getSoundVolumn(),
    }
    mainWindow.webContents.send('index_page', pageData);
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
    timerId = setTimeout(() => mainWindow.hide(), BREAKETIME);
    onShow();
  }

  function hideLayout() {
    mainWindow.hide();
    timerId = setTimeout(showLayout, LONGTIME);
    onHide();
  }

  function showLayout() {
    mainWindow.show();
    timerId = setTimeout(hideLayout, BREAKETIME);
    onShow();
  }

  function skipBreak() {
    clearTimeout(timerId);
    hideLayout();
  }

  globalShortcut.register('Alt+Control+Q', () => {
    skipBreak();
  });

  setTimeout(showLayout, LONGTIME);

  createTray({
    takeBreak,
    skipBreak,
    relaunchApp,
    closeApp,
    addExercise,
  });
}

module.exports = {
  mainController,
}
