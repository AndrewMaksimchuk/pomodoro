const { existsSync, mkdirSync } = require('node:fs');
const { join } = require('node:path');

const DIR_EXERCISES = join(__dirname, 'exercises');
const DIR_EXERCISE_DAY = join(__dirname, 'exercise_of_day');


const createDirectories = () => {
  existsSync(DIR_EXERCISES) || mkdirSync(DIR_EXERCISES);
  existsSync(DIR_EXERCISE_DAY) || mkdirSync(DIR_EXERCISE_DAY);
}

module.exports = {
  createDirectories,
}
