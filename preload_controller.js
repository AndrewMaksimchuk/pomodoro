import { getSettingsProperties } from "./settings.js";
import { getExercise } from "./exercise.js";
import { downloadExerciseOfDay, getExerciseOfDay } from "./exercise_of_day.js";
downloadExerciseOfDay();
const showBoth = () => {
    const arr = [getExerciseOfDay(), getExercise()];
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
};
export const exercise = () => {
    const { showExercises, showExerciseOfDay } = getSettingsProperties();
    if (showExerciseOfDay && showExercises)
        return showBoth();
    if (showExerciseOfDay)
        return getExerciseOfDay();
    if (showExercises)
        return getExercise();
};
