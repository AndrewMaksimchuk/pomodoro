const { contextBridge, ipcRenderer } = require("electron");

const toggle = (callback) => {
  return ipcRenderer.on("index_page", callback);
};

contextBridge.exposeInMainWorld("indexAPI", {
  audioShow: __dirname + "/sound/sunrise.mp3",
  audioHide: __dirname + "/sound/hide.mp3",
  toggle,
});
