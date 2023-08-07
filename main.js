const { app, globalShortcut } = require("electron");
const { longTime, breakeTime } = require("./time");
const { createWindow } = require("./window");
const { createTray } = require("./tray");
const { createDirectories } = require("./directory");
const { addExercise } = require("./exercise");

createDirectories();
let timerId = setTimeout(() => { });

function closeApp() {
  app.quit();
}

function relaunchApp() {
  app.relaunch();
  app.quit();
}

app
  .whenReady()
  .then(() => {
    const mainWindow = createWindow();

    function takeBreak() {
      mainWindow.show();
      timerId = setTimeout(() => mainWindow.hide(), breakeTime);
      mainWindow.webContents.send('index_page', 'show');
    }

    function hideLayout() {
      mainWindow.hide();
      timerId = setTimeout(showLayout, longTime);
      mainWindow.webContents.send('index_page', 'hide');
    }

    function showLayout() {
      mainWindow.show();
      timerId = setTimeout(hideLayout, breakeTime);
      mainWindow.webContents.send('index_page', 'show');
    }

    function skipBreak() {
      clearTimeout(timerId);
      hideLayout();
    }

    globalShortcut.register('Alt+Control+Q', () => {
      skipBreak();
    });

    setTimeout(showLayout, longTime);

    createTray({
      takeBreak,
      skipBreak,
      relaunchApp,
      closeApp,
      addExercise,
    });
  });

app
  .on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });
