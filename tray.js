const { Menu, Tray } = require("electron");
const {iconApp} = require("./icons")

function createTray(todo = {}) {
  const tray = new Tray(iconApp);
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Take a break', type: 'normal', click: todo.takeBreak },
      { label: 'Skip', type: 'normal', click: todo.skip },
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
