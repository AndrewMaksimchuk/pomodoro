import type { Tray } from "electron/main";
import { app, globalShortcut } from "electron";
import { LONGTIME, BREAKETIME, TRAYCOUNTERTIME } from "./constants.js";
import { getSoundVolumn } from "./settings.js";

let tray: Tray;
let trayConterId: NodeJS.Timeout;
let timerId = setTimeout(() => { });

export async function mainController() {
  const { createWindow } = await import("./window.js");
  const { createTray } = await import("./tray.js");
  const { createDirectories } = await import("./directory.js");
  const { addExercise } = await import("./exercise.js");
  const { exercise } = await import("./preload_controller.js");
  const { trayCounterStart, trayCounterEnd } = await import(
    "./tray_counter.js"
  );

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
