const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('indexAPI', {
  audioShow: __dirname + "/sound/sunrise.mp3",
  audioHide: __dirname + "/sound/hide.mp3",
  playAudio: (callback) => ipcRenderer.on('index_page', callback),
});
