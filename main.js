const { app } = require("electron");
const { createWindow } = require("./window");
const { createTray } = require("./tray");
const { longTime, breakeTime } = require("./time");
const { createDirectories } = require("./directory");

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

    setTimeout(showLayout, longTime);

    createTray({
      takeBreak,
      skipBreak,
      relaunchApp,
      closeApp,
    });
  });

app
  .on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });
