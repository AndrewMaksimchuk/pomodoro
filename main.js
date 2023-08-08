const { app } = require("electron");
require("./constants");
const { mainController } = require("./main_controller");

app
  .whenReady()
  .then(mainController)
  .catch((reason) => console.error(reason));

app
  .on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });
