import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { getUserData } from "./constants.js";

const USER_DATA = getUserData();
const DIR_EXERCISES = join(USER_DATA, "exercises");
const DIR_EXERCISE_DAY = join(USER_DATA, "exercise_of_day");

export const createDirectories = () => {
  existsSync(DIR_EXERCISES) || mkdirSync(DIR_EXERCISES);
  existsSync(DIR_EXERCISE_DAY) || mkdirSync(DIR_EXERCISE_DAY);
};
