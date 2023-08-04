const { writeFileSync, readFileSync } = require("node:fs");
const { join } = require("node:path");

const SETTINGS_FILE = 'settings.json';
const PATH_TO_SETTINGS = join(__dirname, SETTINGS_FILE);

let showExercises = undefined;
let showExerciseOfDay = undefined;

function getSettingsProperties() {
  const fileContent = readFileSync(PATH_TO_SETTINGS, { encoding: 'utf-8' });
  return JSON.parse(fileContent);
}

function setSettingsProperties(updatedProperties = {}) {
  writeFileSync(PATH_TO_SETTINGS, JSON.stringify(updatedProperties), { encoding: 'utf-8' });
}

function getSettingProperty(name = '') {
  return getSettingsProperties()[name];
}

function setSettingProperty(name = '', value = false) {
  const settingsProperties = getSettingsProperties();
  const updatedProperties = { ...settingsProperties, [name]: value };
  setSettingsProperties(updatedProperties);
  return updatedProperties;
}

function setShowExercises(newVal = false) {
  showExercises = newVal;
  setSettingProperty('showExercises', showExercises);
}

function getShowExercises() {
  return showExercises = getSettingProperty('showExercises');
}

function toggleShowExercises() {
  setShowExercises(!showExercises);
}

function setShowExerciseOfDay(newVal = false) {
  showExerciseOfDay = newVal;
  setSettingProperty('showExerciseOfDay', newVal);
}

function getShowExerciseOfDay() {
  return showExerciseOfDay = getSettingProperty('showExerciseOfDay');
}

function toggleShowExerciseOfDay() {
  setShowExerciseOfDay(!showExerciseOfDay);
}

module.exports = {
  setShowExercises,
  getShowExercises,
  toggleShowExercises,
  setShowExerciseOfDay,
  getShowExerciseOfDay,
  toggleShowExerciseOfDay,
}
