// Add gadget bridge event listener on boot that stores the current music info so that up to date
// info can be shown even when the clock is closed and an event happens.
(() => {
  globalThis.musiclock = globalThis.musiclock || {};

  globalThis.musiclock.lastTouchEvent = 0;
  globalThis.musiclock.mode = "clockinfo";

  const handleGadgetBridgeEvent = (
    event: MusicInfoEventType | MusicStateEventType
  ) => {
    if (
      event.t === "musicinfo" ||
      // Handle mutated version of music info event
      (event.t === "modify" &&
        event.artist &&
        event.album &&
        event.track &&
        event.dur)
    ) {
      globalThis.musiclock.artist = event.artist;
      globalThis.musiclock.album = event.album;
      globalThis.musiclock.track = event.track;
      globalThis.musiclock.duration = event.dur;
    }
    if (event.t === "musicstate") {
      globalThis.musiclock.state = event.state;
      globalThis.musiclock.position = event.position;
      globalThis.musiclock.shuffle = event.shuffle;
      globalThis.musiclock.repeat = event.repeat;
    }
  };

  // TO_DO Add typing for the GB event
  // @ts-ignore
  Bangle.on("GB", handleGadgetBridgeEvent);
})();
