const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("historyAPI", {
  getData: () => {
    ipcRenderer.send("history_on_data");
  },
  onHistorySendData: (callback) =>
    ipcRenderer.on("history_send_data", (_event, args) => callback(args)),
});
