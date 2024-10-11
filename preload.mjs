const { contextBridge, ipcRenderer } = require("electron");

const toggle = (callback) => {
  return ipcRenderer.on("index_page", callback);
};

contextBridge.exposeInMainWorld("indexAPI", {
  audioShow: import.meta.dirname + "/sound/sunrise.mp3",
  audioHide: import.meta.dirname + "/sound/hide.mp3",
  toggle,
});
