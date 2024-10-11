import { get } from "node:https";
import { join } from "node:path";
import { createWriteStream, existsSync } from "node:fs";
import { load } from "cheerio";
import {
  getShowExerciseOfDay,
  setSettingProperty,
  getSettingProperty,
} from "./settings.js";
import { getUserData } from "./constants.js";

const DIRECTORY = join(getUserData(), "exercise_of_day");
const URL_SOURCE = "https://www.darebee.com";

export const downloadExerciseOfDay = async () => {
  if (getShowExerciseOfDay() === false) return;

  try {
    const res = await fetch(URL_SOURCE);
    const data = await res.text();
    const $ = load(data);
    const urlWithName = $("#exercise").find("img").attr("src") ?? "";
    const name = urlWithName.split("/").at(-1);

    if (undefined === name) return "ERROR";

    if (
      getSettingProperty("exerciseOfDay") === name &&
      existsSync(join(DIRECTORY, name))
    ) {
      return;
    }

    setSettingProperty("exerciseOfDay", name);
    const url = URL_SOURCE + urlWithName;
    const file = createWriteStream(join(DIRECTORY, name));
    get(url, (response) => response.pipe(file));
  } catch (error) {
    console.error(error);
  }
};

export const getExerciseOfDay = () => {
  const file = join(DIRECTORY, getSettingProperty("exerciseOfDay"));
  return existsSync(file) ? file : undefined;
};
