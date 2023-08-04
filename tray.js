const { Menu, Tray } = require("electron");
const { iconApp } = require("./icons");
const {
  getShowExercises,
  toggleShowExercises,
  getShowExerciseOfDay,
  toggleShowExerciseOfDay,
} = require("./settings");

const defaultClickAction = {
  takeBreak: () => {},
  skipBreak: () => {},
  relaunchApp: () => {},
  closeApp: () => {},
}

function createTray(todo = defaultClickAction) {
  const tray = new Tray(iconApp);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Take a break', type: 'normal', click: todo.takeBreak },
    { label: 'Skip', type: 'normal', click: todo.skipBreak },

    { type: 'separator' },
    { label: "Show exercise", type: 'checkbox', checked: getShowExercises(), click: toggleShowExercises },
    { label: "Show exercise of the day", type: 'checkbox', checked: getShowExerciseOfDay(), click: toggleShowExerciseOfDay },

    { type: 'separator' },
    { label: 'Relaunch', type: 'normal', click: todo.relaunchApp },
    { label: 'Exit', type: 'normal', click: todo.closeApp },
  ]);
  tray.setToolTip('POMODORO');
  tray.setContextMenu(contextMenu);
  return tray;
}

module.exports = {
  createTray,
}
