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

module.exports = {
  exercise,
}
