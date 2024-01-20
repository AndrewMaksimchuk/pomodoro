const { app } = require("electron");

app
  .whenReady()
  .then(() => {
    require("./constants").setOsConstants();
    require("./main_controller").mainController();
  })
  .catch((reason) => console.error(reason));

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
