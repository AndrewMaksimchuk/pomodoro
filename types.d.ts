interface IndexAPI {
  audioShow: string;
  audioHide: string;
  toggle: function;
}

interface Window {
  indexAPI: IndexAPI;
}

interface MapAPI {
  'indexAPI': IndexAPI;
}

declare namespace Electron {
  interface ContextBridge {
    exposeInMainWorld<T extends keyof MapAPI>(apiKey: T, api: MapAPI[T]): void;
  }
}

interface Settings {
  showExercises: boolean;
  showExerciseOfDay: boolean;
  exerciseOfDay: string | undefined;
}
