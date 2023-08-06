interface PlayAudio {
  (callback: (event: IpcRendererEvent, ...args: any[]) => void): Electron.IpcRenderer.on;
}

interface IndexAPI {
  audioShow: string;
  audioHide: string;
  playAudio: PlayAudio;
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
