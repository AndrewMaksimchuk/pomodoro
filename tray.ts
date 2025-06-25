import { Menu, MenuItem, Tray } from "electron";
import { iconApp } from "./icons.js";
import {
  getShowExercises,
  toggleShowExercises,
  getShowExerciseOfDay,
  toggleShowExerciseOfDay,
  getSoundVolumn,
  toggleSoundVolume,
} from "./settings.js";
import { historyUserEvent } from "./history.js";

function actionWithHistry(
  action: (arg0?: any) => void,
  event: string,
  message?: string,
) {
  return () => {
    historyUserEvent(event, message);
    action();
  };
}

let tray: Tray, contextMenu: Menu;

const defaultClickAction = {
  takeBreak: () => {},
  skipBreak: () => {},
  relaunchApp: () => {},
  closeApp: () => {},
  addExercise: () => {},
};

function updateTray(newContextMenu: Menu) {
  tray.setContextMenu(newContextMenu);
}

function updateContextMenu(position: number | undefined, menuItem: MenuItem) {
  if (undefined === position) {
    return;
  }

  contextMenu.items[position] = menuItem;
  updateTray(contextMenu);
}

export type UpdateContextMenuFn = typeof updateContextMenu;

interface ContextMenuActions {
  takeBreak: () => void;
  skipBreak: () => void;
  relaunchApp: () => void;
  closeApp: () => void;
  addExercise: () => void;
}

function createContextMenu(actions: ContextMenuActions) {
  const todo = { ...defaultClickAction, ...actions };
  return Menu.buildFromTemplate([
    {
      label: "Take a break",
      type: "normal",
      click: actionWithHistry(todo.takeBreak, "take a break"),
    },
    {
      label: "Skip                     Ctrl+Alt+Q",
      type: "normal",
      click: actionWithHistry(todo.skipBreak, "skip"),
    },

    { type: "separator" },
    {
      label: "Add exercise",
      type: "normal",
      click: actionWithHistry(todo.addExercise, "add exercises"),
    },
    {
      position: 4,
      label: "Show exercises",
      type: "checkbox",
      checked: getShowExercises(),
      click: actionWithHistry(
        toggleShowExercises(updateContextMenu),
        "show exercises",
      ),
    },
    {
      position: 5,
      label: "Show exercise of the day",
      type: "checkbox",
      checked: getShowExerciseOfDay(),
      click: actionWithHistry(
        toggleShowExerciseOfDay(updateContextMenu),
        "show exercise of the day",
      ),
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

export function createTray(props: ContextMenuActions) {
  contextMenu = createContextMenu(props);
  tray = new Tray(iconApp);
  tray.setToolTip("POMODORO");
  tray.setContextMenu(contextMenu);
  return tray;
}
