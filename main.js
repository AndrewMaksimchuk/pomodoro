import { app } from "electron";

app
  .whenReady()
  .then(async () => {
    const { setOsConstants } = await import("./constants.js");
    setOsConstants();
    const { mainController } = await import("./main_controller.js");
    mainController();
  })
  .catch((reason) => console.error(reason));

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
