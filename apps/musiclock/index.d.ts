export {};

declare global {
  interface MusicStateEventType {
    t: "musicstate";
    state: "play" | "pause";
    position: number;
    shuffle: number;
    repeat: number;
  }
  interface MusicInfoEventType {
    t: "musicinfo" | "modify";
    artist: string;
    album: string;
    track: string;
    dur: number;
  }

  interface MusiclockGlobalState {
    artist?: string;
    album?: string;
    track?: string;
    duration?: number;
    state?: "play" | "pause";
    position?: number;
    shuffle?: number;
    repeat?: number;

    lastTouchEvent: number;
    mode: "clockinfo" | "music";

    clockInfoOptions: ClockInfo.Menu[] | undefined;
    clockInfos: ClockInfo.InteractiveOptions[] | undefined;
  }

  var musiclock: MusiclockGlobalState;
}
