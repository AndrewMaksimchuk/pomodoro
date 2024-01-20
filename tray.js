const { Menu, Tray } = require("electron");
const { iconApp } = require("./icons");
const {
  getShowExercises,
  toggleShowExercises,
  getShowExerciseOfDay,
  toggleShowExerciseOfDay,
  getSoundVolumn,
  toggleSoundVolume,
} = require("./settings");

let tray, contextMenu;

const defaultClickAction = {
  takeBreak: () => {},
  skipBreak: () => {},
  relaunchApp: () => {},
  closeApp: () => {},
  addExercise: () => {},
};

function updateTray(newContextMenu) {
  tray.setContextMenu(newContextMenu);
}

function updateContextMenu(position, menuItem) {
  contextMenu.items[position] = menuItem;
  updateTray(contextMenu);
}

function createContextMenu(actions) {
  const todo = { ...defaultClickAction, ...actions };
  return Menu.buildFromTemplate([
    { label: "Take a break", type: "normal", click: todo.takeBreak },
    { label: "Skip", type: "normal", click: todo.skipBreak },

    { type: "separator" },
    { label: "Add exercise", type: "normal", click: todo.addExercise },
    {
      position: 4,
      label: "Show exercises",
      type: "checkbox",
      checked: getShowExercises(),
      click: toggleShowExercises(updateContextMenu),
    },
    {
      position: 5,
      label: "Show exercise of the day",
      type: "checkbox",
      checked: getShowExerciseOfDay(),
      click: toggleShowExerciseOfDay(updateContextMenu),
    },

    { type: "separator" },
    {
      position: 7,
      label: "Mute sound",
      type: "checkbox",
      checked: !Boolean(getSoundVolumn()),
      click: toggleSoundVolume(updateContextMenu),
    },
    { label: "Relaunch", type: "normal", click: todo.relaunchApp },
    { label: "Exit", type: "normal", click: todo.closeApp },
  ]);
}

function createTray(props = {}) {
  contextMenu = createContextMenu(props);
  tray = new Tray(iconApp);
  tray.setToolTip("POMODORO");
  tray.setContextMenu(contextMenu);
  return tray;
}

module.exports = {
  createTray,
};
