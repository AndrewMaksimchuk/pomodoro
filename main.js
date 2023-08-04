const { app } = require("electron");
const { createWindow } = require("./window");
const { createTray } = require("./tray");
const { longTime, breakeTime } = require("./time");

let timerId = setTimeout(() => {})

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
    }

    function hideLayout() {
      mainWindow.hide();
      timerId = setTimeout(showLayout, longTime);
    }

    function showLayout() {
      mainWindow.show();
      timerId = setTimeout(hideLayout, breakeTime);
    }

    function skip() {
      clearTimeout(timerId);
      hideLayout();
    }

    setTimeout(showLayout, longTime);

    createTray({
      takeBreak,
      skip,
      relaunchApp,
      closeApp,
    });
  });

app
  .on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });
