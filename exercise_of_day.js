const { get } = require('node:https');
const { join } = require('node:path');
const { createWriteStream, existsSync } = require('node:fs');
const { setSettingProperty, getSettingProperty } = require('./settings')
const cheerio = require('cheerio');

const DIRECTORY = join(__dirname, 'exercise_of_day')

const downloadExerciseOfDay = async () => {
  const URL_SOURCE = 'https://www.darebee.com';
  const res = await fetch(URL_SOURCE);
  const data = await res.text();
  const $ = cheerio.load(data);
  const urlWithName = $('#exercise').find('img').attr('src') ?? '';
  const name = urlWithName.split('/').at(-1);

  if (undefined === name) return 'ERROR';

  if (getSettingProperty('exerciseOfDay') === name && existsSync(join(DIRECTORY, name))) {
    return;
  }

  setSettingProperty('exerciseOfDay', name);
  const url = URL_SOURCE + urlWithName;
  const file = createWriteStream(join(DIRECTORY, name));
  get(url, (response) => response.pipe(file));
}

const getExerciseOfDay = () => {
  const file = join(DIRECTORY, getSettingProperty('exerciseOfDay'));
  return existsSync(file) ? file : undefined;
}

module.exports = {
  downloadExerciseOfDay,
  getExerciseOfDay,
}
