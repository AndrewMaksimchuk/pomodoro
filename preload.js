const { contextBridge, ipcRenderer } = require('electron');
const { getSettingsProperties } = require("./settings");
const { getExercise } = require("./exercise");
const { downloadExerciseOfDay, getExerciseOfDay } = require("./exercise_of_day");

downloadExerciseOfDay();

const showBoth = () => {
  const arr = [getExerciseOfDay(), getExercise()];
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

const exercise = () => {
  const { showExercises, showExerciseOfDay } = getSettingsProperties();
  if (showExerciseOfDay && showExercises) return showBoth();
  if (showExerciseOfDay) return getExerciseOfDay();
  if (showExercises) return getExercise();
}

const toggle = (callback) => {
  return ipcRenderer.on('index_page', (event, ...args) => callback(exercise(), event, ...args))
}

contextBridge.exposeInMainWorld('indexAPI', {
  audioShow: __dirname + "/sound/sunrise.mp3",
  audioHide: __dirname + "/sound/hide.mp3",
  toggle,
});
