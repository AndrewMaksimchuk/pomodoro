const { existsSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");
const { getUserData } = require("./constants");

const USER_DATA = getUserData();
const DIR_EXERCISES = join(USER_DATA, "exercises");
const DIR_EXERCISE_DAY = join(USER_DATA, "exercise_of_day");

const createDirectories = () => {
  existsSync(DIR_EXERCISES) || mkdirSync(DIR_EXERCISES);
  existsSync(DIR_EXERCISE_DAY) || mkdirSync(DIR_EXERCISE_DAY);
};

module.exports = {
  createDirectories,
};
