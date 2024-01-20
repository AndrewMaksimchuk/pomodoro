const { dialog } = require('electron');
const { readdirSync, copyFile } = require("node:fs");
const { join, basename } = require("node:path");
const { showNotification } = require('./notification');
const { getUserData } = require("./constants");

const DIR_PATH = join(getUserData(), 'exercises');

function getExercise() {
  const dirContent = readdirSync(DIR_PATH, { encoding: 'utf-8' });

  if (0 === dirContent.length) return;

  const index = Math.floor(Math.random() * dirContent.length);
  return join(DIR_PATH, dirContent[index]);
}

function addExercise() {
  dialog
    .showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
      ],
    })
    .then(({ canceled, filePaths }) => {
      if (true === canceled) return;

      const callback = (error) => {
        if (error) return showNotification('Error', 'Unable to add a new exercise');
        showNotification('Success', 'A new exercise has been added');
      }

      const dest = (fpath) => join(DIR_PATH, basename(fpath));
      filePaths.forEach((path) => copyFile(path, dest(path), callback));
    })
    .catch((reason) => console.error(reason));
}

module.exports = {
  getExercise,
  addExercise,
}
