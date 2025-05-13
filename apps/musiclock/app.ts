{
  // Requires ---------------------------------------------

  const locale = require("locale");
  const clockInfo = require("clock_info");

  // Clear screen so its ready for clock to be drawn
  g.clear();

  // Types ------------------------------------------------

  // Globals consts ---------------------------------------

  const WIDTH = g.getWidth();
  const HEIGHT = g.getHeight();
  const CX = WIDTH / 2;

  const WIDGETS_SIZE = 24;

  const SECOND_IN_MS = 1000;
  const MINUTE_IN_MS = 60 * SECOND_IN_MS;

  // Store where the buttons are and add a onClick callback for use in touch handler
  let buttons: {
    [key: string]: {
      x: number;
      y: number;
      height: number;
      width: number;
      padding?: number;
      onClick?: () => void;
    };
  } = {};

  // Component Specific consts ----------------------------

  // Clock ------------------------------------------------

  const CLOCK_FONT_SIZE = 48;
  const CLOCK_LEFT = 0;
  const CLOCK_RIGHT = WIDTH;
  const CLOCK_TOP = 8 + WIDGETS_SIZE;
  const CLOCK_BOTTOM = CLOCK_TOP + CLOCK_FONT_SIZE;

  // Clock Info -------------------------------------------
  // Assumes 3 clock infos

  const CLOCK_INFO_WIDTH = WIDTH - 8;

  const CLOCK_INFO_LEFT = 8;
  const CLOCK_INFO_RIGHT = CLOCK_INFO_LEFT + CLOCK_INFO_WIDTH;
  const CLOCK_INFO_TOP = 8 + CLOCK_BOTTOM;
  const CLOCK_INFO_BOTTOM = HEIGHT;

  const CLOCK_INFO_HEIGHT = (HEIGHT - CLOCK_INFO_TOP) / 3;

  // Music Track ------------------------------------------------

  const TRACK_FONT_SIZE = 16;
  const TRACK_TOP = 8 + CLOCK_BOTTOM;
  const TRACK_BOTTOM = TRACK_TOP + TRACK_FONT_SIZE;
  const TRACK_LEFT = 0;
  const TRACK_RIGHT = WIDTH;

  const ARTIST_FONT_SIZE = 16;
  const ARTIST_TOP = 8 + TRACK_BOTTOM;
  const ARTIST_BOTTOM = ARTIST_TOP + ARTIST_FONT_SIZE;
  const ARTIST_LEFT = 0;
  const ARTIST_RIGHT = WIDTH;

  const CONTROL_BUTTON_PADDING = 8;
  const CONTROL_BUTTON_SIZE = 16;
  const CONTROL_BUTTON_BOTTOM = HEIGHT - 8;
  const CONTROL_BUTTON_TOP = CONTROL_BUTTON_BOTTOM - CONTROL_BUTTON_SIZE;

  const PLAY_PAUSE_BUTTON_LEFT = CX - CONTROL_BUTTON_SIZE / 2;
  const PLAY_PAUSE_BUTTON_RIGHT = CX + CONTROL_BUTTON_SIZE / 2;

  const PREV_BUTTON_LEFT = 8;
  const PREV_BUTTON_RIGHT = PREV_BUTTON_LEFT + CONTROL_BUTTON_SIZE;

  const NEXT_BUTTON_RIGHT = WIDTH - 8;
  const NEXT_BUTTON_LEFT = NEXT_BUTTON_RIGHT - CONTROL_BUTTON_SIZE;

  // Fonts -----------------------------------------

  const RobotoMonoBold48 = E.toString(
    require("heatshrink").decompress(
      atob(
        "AH4AXg/AAwkf8AGF+AGEn4GG/AGMCgoiGAw0PG4sBO+ECAwseAwv+AokDAwsfAwv/AwkHAws/AwkB///RYcPAwK1Dv4TEgYTVTwYTCwAGE/iqE/6rEAwK4FCYi/Hh6GFhC/pS4JvES4J9EOwJ3DTwRxDPoQcDEIQABLwIGGRYSUDOwV+n4GCCAP8h4GBj/AgP4g4/BAwMD+EDAwngAwkHAwsPB4IGC8EfwAGCGAMfJII+Dn4RBAwRMFMJp2GQg0AAwagFdIYjCdIoAnn5CCAxN/AwwbFAwzxCAyEBNgYGJU4qZEAx61EAxDRGAwwAVg6SIgYiCSQUHAwJhBAwMPAwsfLQYGBn5TDAwJaEwAXBKYSLBC4IGCCAYGC8BkCAwMfAwMf/YGC4AvB+YGEv/jAwn/4YGDGwODEQYvBNAQwBh/+Awf4n/8AwaeB/AGF+AGCXgXgAwTRC4AGFTIn//ygF/AGENIQGDAAQGGACMEAQN4AwU+AQN+AwQ9BbYcBAwsDAwaWBg4GDJAIGGSAIGCbAj0DbAMHVIKnDAwi8BAwMDPIIGPDoIGFWoIGICQI8BG4bYB/APBaIf/n7REaYQGHaIP+bQQGDv4GCbAP4AwKSBPQU/dALYDQAYACgLXTgY9BAAZZCAAamCAAa0CF4f/AwhVBAwh4BAwkfAwt/+4GE//nAwYhBw4GDEIKmCEIX8Awl//AGEToIGDEIOAAwYhBWIIGEAATKFA1gACKYgGXZQoAVoAGFvjXEwF+SQYGBv+ALQfAAw/AAwpGBAxZ9EwEPAwXgj7EDAwM/NIP4AwkDAzOAAwwpF8A+En7KEIoIGIMIQZBMYQGCg4GITIIGBUIP+Vol/HoLYEDQIAeLQL7DGwP/GAZECHwZgCJgQaCXwRKCAwRGCAoQqCFAQGF56UBRYMD/8P4CgCg/8b4ixBXggGCZQnwaJ7YJj/An43DAwXwj4GEbAYGBbAh+EAwbfESYiECNQSSDPAX8WwovBACphBA0twAwkBIwIGDXgQGDRYQGDv4GENIIGEQoIGEUIIGETIYGBRYgGBDQKLCAwN/DQQGB8KmEh/n//+XQrkBYJAGCOwi6FKAYGEaoYGBFwYGCFwYGCFwYAggYsDj5+BHQarBj5ICVYP8UAI7BS4P+RgIGEU4cHAgKuEAwa8CAgP+b4f4n/4dogLBAwUf4EP+BNCAxEHbQINKAwjmCAwnwG4pFB/hFDKYphEAwxoBPoyLCAwcA/5pBcQc/U4q1GACkH/gGEFwjRCHgY+CLAQABJgJGBHYYGFNAX8RYbKCAwf8g4GE+EBAwcfQAP+aIgGHvwGNY4IiEAYQJC/iVBG4aoBDAKdBgf7OITDEP4IGEN4hiBPohwBRYiMETILlCAAJ+CUAYcBCYYA/ACqPBgL1DMAKrCSYLcCNQTuBAw8/AwwXBAxYiJGAY3CHwUHJAIAG"
      )
    )
  );

  const setFontRobotoMonoBold48 = () => {
    // Actual height 44 (46 - 3)
    // 1 BPP
    return g.setFontCustom(
      // @ts-ignore
      RobotoMonoBold48,
      46,
      atob("GB0fGB8fIB8fHx8eFw=="),
      56 | 65536
    );
  };

  // Handle clock -----------------------------------------

  // Draw the clock to the screen

  let clockTimeout: TimeoutId | undefined;

  const clearClock = () => {
    g.clearRect(CLOCK_LEFT, CLOCK_TOP, CLOCK_RIGHT, CLOCK_BOTTOM);
    if (clockTimeout) {
      clearTimeout(clockTimeout);
      clockTimeout = undefined;
    }
  };

  const drawClock = () => {
    g.reset();

    clearClock();

    const time = locale.time(new Date(), true);
    g.setFontAlign(0, -1);
    setFontRobotoMonoBold48();
    g.drawString(time, CX, CLOCK_TOP);

    g.reset();

    // Trigger re-draw just as next minute occurs
    clockTimeout = setTimeout(
      drawClock,
      MINUTE_IN_MS - (new Date().valueOf() % MINUTE_IN_MS)
    );
  };

  // Draw the clock to the screen and then update it every 10s
  drawClock();

  // Handle clock info widgets ----------------------------

  // Use a common function for drawing the clock infos to save space
  const drawClockInfo = (
    _item: ClockInfo.MenuItem,
    info: ClockInfo.Item,
    options: ClockInfo.InteractiveOptions
  ) => {
    g.reset();

    g.clearRect(0, options.y, WIDTH, options.y + options.h);
    // indicate focus - we're using a border, but you could change color?
    if (options.focus)
      g.drawRect(
        options.x,
        options.y,
        options.x + options.w - 2,
        options.y + options.h - 1
      ); // show if focused
    // we're drawing center-aligned here
    var cy = options.y + options.h / 2;
    if (info.img) g.drawImage(info.img, options.x + 8, cy - 12); // draw the image
    g.setFont("6x8:2")
      .setFontAlign(-1, 0)
      .drawString(info.text, options.x + 40, cy); // draw the text

    g.reset();
  };

  const removeClockInfos = () => {
    globalThis.musiclock.clockInfoOptions = undefined;

    while (globalThis.musiclock.clockInfos?.length) {
      globalThis.musiclock.clockInfos.pop()?.remove();
    }
  };

  // Clear clock infos from the screen
  const clearClockInfos = () => {
    g.clearRect(
      CLOCK_INFO_LEFT,
      CLOCK_INFO_TOP,
      CLOCK_INFO_RIGHT,
      CLOCK_INFO_BOTTOM
    );
  };

  // Force all clock infos to redraw
  const drawClockInfos = () => {
    globalThis.musiclock.mode = "clockinfo";
    clearClockInfos();

    // Ensure clock info options are loaded
    if (!globalThis.musiclock.clockInfoOptions) {
      globalThis.musiclock.clockInfoOptions = clockInfo.load();
    }
    // Ensure clock info list is initialised are loaded
    if (!globalThis.musiclock.clockInfos) {
      globalThis.musiclock.clockInfos = [];
    }

    // Create 3 clock infos if they dont exist already
    for (let i = 0; i < 3; i++) {
      if (!globalThis.musiclock.clockInfos[i]) {
        globalThis.musiclock.clockInfos.push(
          clockInfo.addInteractive(globalThis.musiclock.clockInfoOptions, {
            x: CLOCK_INFO_LEFT,
            y: CLOCK_INFO_TOP + i * CLOCK_INFO_HEIGHT,
            w: CLOCK_INFO_WIDTH,
            h: CLOCK_INFO_HEIGHT,
            draw: drawClockInfo,
            app: "musiclock",
          })
        );
      }
    }

    // Re-draw all clock infos
    globalThis.musiclock.clockInfos.forEach((clockInfo) => clockInfo.redraw());
  };

  // Handle music playing ---------------------------------

  let trackWidth = 0;
  let scrollTrackOffset = -20;
  let scrollTrackTimeout: TimeoutId | undefined;

  // Clear track name from the screen
  const clearTrack = () => {
    g.clearRect(TRACK_LEFT, TRACK_TOP, TRACK_RIGHT, TRACK_BOTTOM);
  };

  // Increment the track name scrolling across the screen
  const scrollTrack = () => {
    scrollTrackOffset++;
    // Reset the scroll if it has reached the end
    if (scrollTrackOffset === trackWidth + 32) scrollTrackOffset = 0;
    if (!globalThis.musiclock?.track) return;

    g.reset();

    clearTrack();

    g.setFontAlign(-1, -1);
    g.setFont("Vector", TRACK_FONT_SIZE);

    // Draw string twice to give the illusion of it wrapping round the screen
    g.drawString(
      globalThis.musiclock.track,
      -Math.max(scrollTrackOffset, 0),
      TRACK_TOP
    );
    g.drawString(
      globalThis.musiclock.track,
      trackWidth - Math.max(scrollTrackOffset, 0) + 32,
      TRACK_TOP
    );
    // If screen is locked then dont scroll the track name, otherwise set timeout to increment again
    if (!Bangle.isLocked()) scrollTrackTimeout = setTimeout(scrollTrack, 50);

    g.reset();
  };

  // Draw the track to the screen
  const drawTrack = () => {
    globalThis.musiclock.mode = "music";
    g.reset();

    clearTrack();

    if (globalThis.musiclock?.track) {
      // Handle track name
      g.setFont("Vector", TRACK_FONT_SIZE);
      g.setFontAlign(0, -1);

      // Calculate the string width and scoll if necessary otherwise just draw to screen
      trackWidth = g.stringWidth(globalThis.musiclock.track);

      // Start width negative scroll so that it is stationary for the first second
      scrollTrackOffset = -20;

      if (scrollTrackTimeout) clearTimeout(scrollTrackTimeout);
      if (trackWidth < WIDTH)
        g.drawString(globalThis.musiclock.track, CX, TRACK_TOP);
      else scrollTrack();
    }

    g.reset();
  };

  let artistWidth = 0;
  let scrollArtistOffset = -20;
  let scrollArtistTimeout: TimeoutId | undefined;

  // Clears the artist name from the screen
  const clearArtist = () => {
    g.clearRect(ARTIST_LEFT, ARTIST_TOP, ARTIST_RIGHT, ARTIST_BOTTOM);
  };

  // Increment the track name scrolling across the screen
  const scrollArtist = () => {
    scrollArtistOffset++;
    // Reset the scroll if it has reached the end
    if (scrollArtistOffset === artistWidth + 32) scrollArtistOffset = 0;
    if (!globalThis.musiclock?.artist) return;

    g.reset();

    clearArtist();

    g.setFontAlign(-1, -1);
    g.setFont("Vector", ARTIST_FONT_SIZE);

    // Draw string twice to give the illusion of it wrapping round the screen
    g.drawString(
      globalThis.musiclock.artist,
      -Math.max(scrollArtistOffset, 0),
      ARTIST_TOP
    );
    g.drawString(
      globalThis.musiclock.artist,
      artistWidth - Math.max(scrollArtistOffset, 0) + 32,
      ARTIST_TOP
    );

    // If screen is locked then dont scroll the artist name, otherwise set timeout to increment again
    if (!Bangle.isLocked()) scrollArtistTimeout = setTimeout(scrollArtist, 50);

    g.reset();
  };

  const drawArtist = () => {
    globalThis.musiclock.mode = "music";

    g.reset();

    clearArtist();

    if (globalThis.musiclock?.artist) {
      // Handle artist name
      g.setFont("Vector", ARTIST_FONT_SIZE);
      g.setFontAlign(0, -1);

      // Calculate the string width and scoll if necessary otherwise just draw to screen
      artistWidth = g.stringWidth(globalThis.musiclock.artist);

      // Start width negative scroll so that it is stationary for the first second
      scrollArtistOffset = -20;

      if (scrollArtistTimeout) clearTimeout(scrollArtistTimeout);
      if (artistWidth < WIDTH)
        g.drawString(globalThis.musiclock.artist, CX, ARTIST_TOP);
      else scrollArtist();
    }

    g.reset();
  };

  // Draws a polygon that is the shape of the commonly used pause symbol
  const drawPause = (x: number, y: number, height: number, width: number) => {
    g.fillPolyAA([
      x,
      y,
      x + (2 * width) / 5,
      y,
      x + (2 * width) / 5,
      y + height,
      x,
      y + height,
    ]);
    g.fillPolyAA([
      x + (3 * width) / 5,
      y,
      x + width,
      y,
      x + width,
      y + height,
      x + (3 * width) / 5,
      y + height,
    ]);
  };

  // Draws a polygon that is the shape of the commonly used play symbol
  const drawPlay = (x: number, y: number, height: number, width: number) => {
    g.fillPolyAA([x, y, x + width, y + height / 2, x, y + height]);
  };

  // Draws a polygon that is the shape of the commonly used next symbol
  const drawNext = (x: number, y: number, height: number, width: number) => {
    g.fillPolyAA([
      x,
      y,
      x + (4 * width) / 5,
      y + (2 * height) / 5,
      x + (4 * width) / 5,
      y,
      x + width,
      y,
      x + width,
      y + height,
      x + (4 * width) / 5,
      y + height,
      x + (4 * width) / 5,
      y + (3 * height) / 5,
      x,
      y + height,
    ]);
  };

  // Draws a polygon that is the shape of the commonly used previous symbol
  const drawPrev = (x: number, y: number, height: number, width: number) => {
    g.fillPolyAA([
      x + width,
      y,
      x + width / 5,
      y + (2 * height) / 5,
      x + width / 5,
      y,
      x,
      y,
      x,
      y + height,
      x + width / 5,
      y + height,
      x + width / 5,
      y + (3 * height) / 5,
      x + width,
      y + height,
    ]);
  };

  // Clears the area which displays the buttons for music control
  const clearControls = () => {
    // Clear the currently stored buttons
    delete buttons["play"];
    delete buttons["pause"];
    delete buttons["prev"];
    delete buttons["next"];

    g.clearRect(
      PREV_BUTTON_LEFT,
      CONTROL_BUTTON_TOP,
      PREV_BUTTON_RIGHT,
      CONTROL_BUTTON_BOTTOM
    );
    g.clearRect(
      PLAY_PAUSE_BUTTON_LEFT,
      CONTROL_BUTTON_TOP,
      PLAY_PAUSE_BUTTON_RIGHT,
      CONTROL_BUTTON_BOTTOM
    );
    g.clearRect(
      NEXT_BUTTON_LEFT,
      CONTROL_BUTTON_TOP,
      NEXT_BUTTON_RIGHT,
      CONTROL_BUTTON_BOTTOM
    );
  };

  // Draw the play/pause/next/prev buttons to the screen
  const drawControls = () => {
    globalThis.musiclock.mode = "music";

    g.reset();

    clearControls();

    if (globalThis.musiclock?.state === "play") {
      drawPause(
        PLAY_PAUSE_BUTTON_LEFT,
        CONTROL_BUTTON_TOP,
        CONTROL_BUTTON_SIZE,
        CONTROL_BUTTON_SIZE
      );
      buttons["pause"] = {
        x: PLAY_PAUSE_BUTTON_LEFT,
        y: CONTROL_BUTTON_TOP,
        height: CONTROL_BUTTON_SIZE,
        width: CONTROL_BUTTON_SIZE,
        padding: CONTROL_BUTTON_PADDING,
        // @ts-ignore
        onClick: () => Bangle.musicControl("pause"),
      };
    } else {
      drawPlay(
        PLAY_PAUSE_BUTTON_LEFT,
        CONTROL_BUTTON_TOP,
        CONTROL_BUTTON_SIZE,
        CONTROL_BUTTON_SIZE
      );
      buttons["play"] = {
        x: PLAY_PAUSE_BUTTON_LEFT,
        y: CONTROL_BUTTON_TOP,
        height: CONTROL_BUTTON_SIZE,
        width: CONTROL_BUTTON_SIZE,
        padding: CONTROL_BUTTON_PADDING,
        // @ts-ignore
        onClick: () => Bangle.musicControl("play"),
      };
    }

    drawPrev(
      PREV_BUTTON_LEFT,
      CONTROL_BUTTON_TOP,
      CONTROL_BUTTON_SIZE,
      CONTROL_BUTTON_SIZE
    );
    buttons["prev"] = {
      x: PREV_BUTTON_LEFT,
      y: CONTROL_BUTTON_TOP,
      height: CONTROL_BUTTON_SIZE,
      width: CONTROL_BUTTON_SIZE,
      padding: CONTROL_BUTTON_PADDING,
      // @ts-ignore
      onClick: () => Bangle.musicControl("previous"),
    };
    drawNext(
      NEXT_BUTTON_LEFT,
      CONTROL_BUTTON_TOP,
      CONTROL_BUTTON_SIZE,
      CONTROL_BUTTON_SIZE
    );
    buttons["next"] = {
      x: NEXT_BUTTON_LEFT,
      y: CONTROL_BUTTON_TOP,
      height: CONTROL_BUTTON_SIZE,
      width: CONTROL_BUTTON_SIZE,
      padding: CONTROL_BUTTON_PADDING,
      // @ts-ignore
      onClick: () => Bangle.musicControl("next"),
    };

    g.reset();
  };

  // Remove the info about currently playing music from the screen
  const clearMusicInfo = () => {
    if (scrollArtistTimeout) clearTimeout(scrollArtistTimeout);
    if (scrollTrackTimeout) clearTimeout(scrollTrackTimeout);
    clearTrack();
    clearArtist();
    clearControls();
  };

  // Draw all parts of the music info
  const drawMusicInfo = () => {
    globalThis.musiclock.mode = "music";
    drawTrack();
    drawArtist();
    drawControls();
  };

  // Handle music intents from gadgetbridge ---------------

  let showClockInfoTimeout: TimeoutId | undefined;

  // Handle music info event from gadgetbridge
  const handleMusicInfo = (_event: MusicInfoEventType) => {
    if (globalThis.musiclock.mode === "clockinfo") {
      removeClockInfos();
      clearClockInfos();
    }

    drawMusicInfo();
  };

  // Handle music state event from gadgetbridge
  const handleMusicState = (event: MusicStateEventType) => {
    if (globalThis.musiclock.mode === "clockinfo") {
      removeClockInfos();
      clearClockInfos();
    }

    drawControls();

    if (event.state === "pause" && !showClockInfoTimeout) {
      showClockInfoTimeout = setTimeout(() => {
        globalThis.musiclock.mode = "clockinfo";
        clearMusicInfo();
        drawClockInfos();
      }, 30000);
    } else if (event.state === "play" && showClockInfoTimeout) {
      clearTimeout(showClockInfoTimeout);
      showClockInfoTimeout = undefined;
    }
  };

  // Handle gadgetbridge event from bangle
  const handleGadgetBridgeEvent = (
    event: MusicInfoEventType | MusicStateEventType
  ) => {
    if (event.t === "musicinfo") handleMusicInfo(event);
    if (event.t === "musicstate") handleMusicState(event);
  };

  // Handle lock event from bangle
  const handleLockEvent = (locked: ShortBoolean) => {
    // If locked then stop scrolling the track/artist names and if unlocked then restart
    if (locked) {
      if (scrollArtistTimeout) clearTimeout(scrollArtistTimeout);
      if (scrollTrackTimeout) clearTimeout(scrollTrackTimeout);
    }
    if (!locked) {
      if (artistWidth > WIDTH) scrollArtist();
      if (trackWidth > WIDTH) scrollTrack();
    }
  };

  // Handle wipe event from bangle
  const handleSwipe = (lr: -1 | 0 | 1, ud?: -1 | 0 | 1) => {
    // If not in music mode then do nothing
    if (globalThis.musiclock.mode !== "music") return;

    // Use left/right swipe for prev/next, up/down swipe for volume control
    if (lr && !ud) {
      // @ts-ignore
      if (lr === -1) Bangle.musicControl("previous");
      // @ts-ignore
      if (lr === 1) Bangle.musicControl("next");
    }
    if (!lr && ud) {
      // @ts-ignore
      if (ud === 1) Bangle.musicControl("volumedown");
      // @ts-ignore
      if (ud === -1) Bangle.musicControl("volumeup");
    }
  };

  // Handle touch event from bangle
  const handleTouchEvent = (_button?: number, xy?: TouchCallbackXY) => {
    if (Bangle.isLocked()) return;

    // Loop through buttons object to see if the touch event matches any buttons and call the
    // onClick callback if it does
    if (xy) {
      const x = xy.x;
      const y = xy.y;
      Object.values(buttons).forEach((button) => {
        const padding = button.padding || 0;
        if (
          x >= button.x - padding &&
          x <= button.x + button.width + padding &&
          y >= button.y - padding &&
          y <= button.y + button.height + padding
        ) {
          if (button.onClick) button.onClick();
        }
      });
    }

    // Handle double touch to switch between modes
    const now = new Date().valueOf();
    if (now - globalThis.musiclock.lastTouchEvent < 300) {
      if (globalThis.musiclock.mode === "clockinfo") {
        removeClockInfos();
        clearClockInfos();
        drawMusicInfo();
        if (showClockInfoTimeout) clearTimeout(showClockInfoTimeout);
      } else if (globalThis.musiclock.mode === "music") {
        clearMusicInfo();
        drawClockInfos();
      }
    }
    globalThis.musiclock.lastTouchEvent = now;
  };

  // Handle midnight event from bangle
  const handleMidnightEvent = () => {
    if (globalThis.musiclock.mode === "clockinfo") {
      drawClockInfos();
    }
  };

  // @ts-ignore
  Bangle.on("GB", handleGadgetBridgeEvent);
  Bangle.on("lock", handleLockEvent);
  Bangle.on("swipe", handleSwipe);
  Bangle.on("touch", handleTouchEvent);
  Bangle.on("midnight", handleMidnightEvent);

  // On startup show music if already playing otherwise show clock infos
  if (globalThis.musiclock?.state === "play") {
    drawMusicInfo();
  } else {
    drawClockInfos();
  }

  Bangle.loadWidgets();
  Bangle.drawWidgets();

  Bangle.setUI({
    mode: "clock",
    remove: function () {
      clearClock();
      removeClockInfos();
      clearClockInfos();
      clearMusicInfo();

      // @ts-ignore
      Bangle.removeListener("GB", handleGadgetBridgeEvent);
      Bangle.removeListener("lock", handleLockEvent);
      Bangle.removeListener("swipe", handleSwipe);
      Bangle.removeListener("touch", handleTouchEvent);
      Bangle.removeListener("midnight", handleMidnightEvent);
    },
  });
}
