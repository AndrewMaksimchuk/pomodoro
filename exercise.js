const { readdirSync } = require("node:fs");
const { join } = require("node:path");

const DIR_PATH = join(__dirname, 'exercises');

function getExercise() {
  const dirContent = readdirSync(DIR_PATH, {encoding: 'utf-8'});

  if (0 ===dirContent.length) return;
  
  const index = Math.floor(Math.random() * dirContent.length);
  return join(DIR_PATH, dirContent[index]);
}

module.exports = {
  getExercise,
}
