import { dialog } from "electron";
import { readdirSync, copyFile } from "node:fs";
import { join, basename } from "node:path";
import { showNotification } from "./notification.js";
import { getUserData } from "./constants.js";

const DIR_PATH = join(getUserData(), "exercises");

function getExercise() {
  const dirContent = readdirSync(DIR_PATH, { encoding: "utf-8" });

  if (0 === dirContent.length) return;

  const index = Math.floor(Math.random() * dirContent.length);
  return join(DIR_PATH, dirContent[index]);
}

function addExercise() {
  dialog
    .showOpenDialog({
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }],
    })
    .then(({ canceled, filePaths }) => {
      if (true === canceled) return;

      const callback = (error: NodeJS.ErrnoException | null) => {
        if (error)
          return showNotification("Error", "Unable to add a new exercise");
        showNotification("Success", "A new exercise has been added");
      };

      const dest = (fpath: string) => join(DIR_PATH, basename(fpath));
      filePaths.forEach((path) => copyFile(path, dest(path), callback));
    })
    .catch((reason) => console.error(reason));
}

export { getExercise, addExercise };
