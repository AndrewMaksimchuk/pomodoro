import { HistoryItem } from "./history.ts";

interface Settings {
  showExercises: boolean;
  showExerciseOfDay: boolean;
  exerciseOfDay: string | undefined;
  soundVolume: number;
}

interface PageData {
  value: "show" | "hide";
  exercise: string | undefined;
  volume: number;
}

type toggleCallback = (event: unknown, params: PageData) => unknown;

interface IndexAPI {
  audioShow: string;
  audioHide: string;
  toggle: (toggleCallback: toggleCallback) => Electron.IpcRenderer;
}

export interface HistoryAPI {
  getData: () => void;
  onHistorySendData: (
    callback: (args: HistoryItem[]) => void,
  ) => Electron.IpcRenderer;
}

interface Window {
  indexAPI: IndexAPI;
  historyAPI: HistoryAPI;
}

interface MapAPI {
  indexAPI: IndexAPI;
}

declare namespace Electron {
  interface ContextBridge {
    exposeInMainWorld<T extends keyof MapAPI>(apiKey: T, api: MapAPI[T]): void;
  }

  interface MenuItem {
    position?: number;
  }
}
