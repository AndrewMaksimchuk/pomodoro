import { access, constants } from "node:fs/promises"
import { join } from "node:path"
import { exec } from "node:child_process"

const desktopEntry = "pomodoro.autostart.desktop"
const file = join(import.meta.dirname, desktopEntry);
const autostartDirectory = "~/.config/autostart/"
const commandRemoveFile = `rm -rf ${join(autostartDirectory, desktopEntry)}`
const commandCreateDirectory = `mkdir -p ${autostartDirectory}`
const commandCopyFile = `cp -f ${file} ${autostartDirectory}`

function devlog(error: any) {
  console.error('error:', error);
}

async function isExist() {
  try {
    await access(join(autostartDirectory, desktopEntry), constants.F_OK);
    return true;
  } catch (error) {
    return false; 
  } 
}

async function copyFileIfNeed() {
  const fileExist = await isExist()

  if (!fileExist) {
    exec(commandCreateDirectory, (error) => {
      if (error) throw "Fail to create user systemd service directory";

      exec(commandCopyFile, (error) => {
        if (error) throw "Fail to copy service file";
      });
    });
  }
}

export async function toggleService(condition: boolean) {
  try {
    if (condition === false) {
      return exec(commandRemoveFile, devlog);
    }

    await copyFileIfNeed();
  } catch (error) {
    return error;
  }
}

