const { app, ipcMain } = require("electron");
const { createWindow } = require("./window");
const { createTray } = require("./tray");
const { longTime, breakeTime, oneMinute } = require("./time");

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
      setTimeout(() => mainWindow.hide(), oneMinute);
    }

    function hideLayout() {
      mainWindow.hide();
      setTimeout(showLayout, longTime);
    }

    function showLayout() {
      mainWindow.show();
      setTimeout(hideLayout, breakeTime);
    }

    setTimeout(showLayout, longTime);

    createTray({
      takeBreak,
      relaunchApp,
      closeApp,
    });
  });

app
  .on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });
