import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { getUserData } from "./constants.js";
const DEFAULT_VALUES = {
    showExercises: false,
    showExerciseOfDay: false,
    exerciseOfDay: "",
    soundVolume: 0.5, // Range 0..1
};
const SETTINGS_FILE = "pomodoro_settings.json";
const PATH_TO_SETTINGS = join(getUserData(), SETTINGS_FILE);
let showExercises = false;
let showExerciseOfDay = false;
let soundVolume = 0.5;
function createSettings() {
    if (existsSync(PATH_TO_SETTINGS))
        return;
    writeFileSync(PATH_TO_SETTINGS, JSON.stringify(DEFAULT_VALUES), {
        encoding: "utf-8",
    });
}
function getSettingsProperties() {
    const fileContent = readFileSync(PATH_TO_SETTINGS, { encoding: "utf-8" });
    return JSON.parse(fileContent);
}
function setSettingsProperties(updatedProperties = {}) {
    writeFileSync(PATH_TO_SETTINGS, JSON.stringify(updatedProperties), {
        encoding: "utf-8",
    });
}
function getSettingProperty(name = "") {
    return getSettingsProperties()[name];
}
function setSettingProperty(name, value) {
    const settingsProperties = getSettingsProperties();
    const updatedProperties = { ...settingsProperties, [name]: value };
    setSettingsProperties(updatedProperties);
    return updatedProperties;
}
function setShowExercises(newVal = false) {
    showExercises = newVal;
    setSettingProperty("showExercises", showExercises);
}
function getShowExercises() {
    return (showExercises = getSettingProperty("showExercises"));
}
function toggleShowExercises(updateContextMenu) {
    return (menuItem) => {
        setShowExercises(!showExercises);
        menuItem.checked = Boolean(showExercises);
        updateContextMenu(menuItem.position, menuItem);
    };
}
function setShowExerciseOfDay(newVal = false) {
    showExerciseOfDay = newVal;
    setSettingProperty("showExerciseOfDay", newVal);
}
function getShowExerciseOfDay() {
    return (showExerciseOfDay = getSettingProperty("showExerciseOfDay"));
}
function toggleShowExerciseOfDay(updateContextMenu) {
    return (menuItem) => {
        setShowExerciseOfDay(!showExerciseOfDay);
        menuItem.checked = Boolean(showExerciseOfDay);
        updateContextMenu(menuItem.position, menuItem);
    };
}
function setSoundVolume(newVal) {
    soundVolume = newVal;
    setSettingProperty("soundVolume", soundVolume);
}
function getSoundVolumn() {
    return (soundVolume = getSettingProperty("soundVolume"));
}
function toggleSoundVolume(updateContextMenu) {
    return (menuItem) => {
        Boolean(soundVolume) ? setSoundVolume(0) : setSoundVolume(0.5);
        menuItem.checked = !Boolean(soundVolume);
        updateContextMenu(menuItem.position, menuItem);
    };
}
createSettings();
export { getSettingsProperties, setSettingProperty, getSettingProperty, setShowExercises, getShowExercises, toggleShowExercises, setShowExerciseOfDay, getShowExerciseOfDay, toggleShowExerciseOfDay, getSoundVolumn, toggleSoundVolume, };
