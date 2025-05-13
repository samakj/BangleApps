{
  // Fonts ---------------------------------------------

  // @ts-ignore
  Graphics.prototype.setFontRobotoMonoBold48 = function () {
    // Actual height 44 (46 - 3)
    // 1 BPP
    return this.setFontCustom(
      // @ts-ignore
      E.toString(
        require("heatshrink").decompress(
          atob(
            "AH4AXg/AAwkf8AGF+AGEn4GG/AGMCgoiGAw0PG4sBO+ECAwseAwv+AokDAwsfAwv/AwkHAws/AwkB///RYcPAwK1Dv4TEgYTVTwYTCwAGE/iqE/6rEAwK4FCYi/Hh6GFhC/pS4JvES4J9EOwJ3DTwRxDPoQcDEIQABLwIGGRYSUDOwV+n4GCCAP8h4GBj/AgP4g4/BAwMD+EDAwngAwkHAwsPB4IGC8EfwAGCGAMfJII+Dn4RBAwRMFMJp2GQg0AAwagFdIYjCdIoAnn5CCAxN/AwwbFAwzxCAyEBNgYGJU4qZEAx61EAxDRGAwwAVg6SIgYiCSQUHAwJhBAwMPAwsfLQYGBn5TDAwJaEwAXBKYSLBC4IGCCAYGC8BkCAwMfAwMf/YGC4AvB+YGEv/jAwn/4YGDGwODEQYvBNAQwBh/+Awf4n/8AwaeB/AGF+AGCXgXgAwTRC4AGFTIn//ygF/AGENIQGDAAQGGACMEAQN4AwU+AQN+AwQ9BbYcBAwsDAwaWBg4GDJAIGGSAIGCbAj0DbAMHVIKnDAwi8BAwMDPIIGPDoIGFWoIGICQI8BG4bYB/APBaIf/n7REaYQGHaIP+bQQGDv4GCbAP4AwKSBPQU/dALYDQAYACgLXTgY9BAAZZCAAamCAAa0CF4f/AwhVBAwh4BAwkfAwt/+4GE//nAwYhBw4GDEIKmCEIX8Awl//AGEToIGDEIOAAwYhBWIIGEAATKFA1gACKYgGXZQoAVoAGFvjXEwF+SQYGBv+ALQfAAw/AAwpGBAxZ9EwEPAwXgj7EDAwM/NIP4AwkDAzOAAwwpF8A+En7KEIoIGIMIQZBMYQGCg4GITIIGBUIP+Vol/HoLYEDQIAeLQL7DGwP/GAZECHwZgCJgQaCXwRKCAwRGCAoQqCFAQGF56UBRYMD/8P4CgCg/8b4ixBXggGCZQnwaJ7YJj/An43DAwXwj4GEbAYGBbAh+EAwbfESYiECNQSSDPAX8WwovBACphBA0twAwkBIwIGDXgQGDRYQGDv4GENIIGEQoIGEUIIGETIYGBRYgGBDQKLCAwN/DQQGB8KmEh/n//+XQrkBYJAGCOwi6FKAYGEaoYGBFwYGCFwYGCFwYAggYsDj5+BHQarBj5ICVYP8UAI7BS4P+RgIGEU4cHAgKuEAwa8CAgP+b4f4n/4dogLBAwUf4EP+BNCAxEHbQINKAwjmCAwnwG4pFB/hFDKYphEAwxoBPoyLCAwcA/5pBcQc/U4q1GACkH/gGEFwjRCHgY+CLAQABJgJGBHYYGFNAX8RYbKCAwf8g4GE+EBAwcfQAP+aIgGHvwGNY4IiEAYQJC/iVBG4aoBDAKdBgf7OITDEP4IGEN4hiBPohwBRYiMETILlCAAJ+CUAYcBCYYA/ACqPBgL1DMAKrCSYLcCNQTuBAw8/AwwXBAxYiJGAY3CHwUHJAIAG"
          )
        )
      ),
      46,
      atob("GB0fGB8fIB8fHx8eFw=="),
      56 | 65536
    );
  };

  // Requires ---------------------------------------------

  const locale = require("locale");
  const clockInfo = require("clock_info");

  // Clear screen so its ready for clock to be drawn
  g.clear();

  // Types ------------------------------------------------

  interface MusicInfoEventType {
    t: "musicinfo";
    artist: string;
    album: string;
    track: string;
    dur: number;
  }

  interface MusicStateEventType {
    t: "musicstate";
    state: "play" | "pause";
    position: number;
    shuffle: number;
    repeat: number;
  }

  // Globals ----------------------------------------------

  const WIDTH = g.getWidth();
  const HEIGHT = g.getHeight();
  const CX = WIDTH / 2;

  const WIDGETS_SIZE = 24;
  const CLOCK_FONT_SIZE = 48;

  let mode: "clockinfo" | "music" = "clockinfo";

  // Handle clock -----------------------------------------

  // Draw the clock to the screen
  const drawClock = () => {
    const time = locale.time(new Date(), true);
    g.reset();
    g.setFontAlign(0, -1);
    // @ts-ignore
    g.setFontRobotoMonoBold48();
    g.clearRect(0, 8 + WIDGETS_SIZE, WIDTH, 8 + WIDGETS_SIZE + CLOCK_FONT_SIZE);
    g.drawString(time, CX, 8 + WIDGETS_SIZE);
  };

  // Draw the clock to the screen and then update it every 10s
  drawClock();
  const clockInterval = setInterval(drawClock, 10000);

  // Handle clock info widgets ----------------------------

  // Get the height/width for the clock infos assuming there are 3 od them
  const CLOCK_INFO_HEIGHT =
    (HEIGHT - (16 + WIDGETS_SIZE + CLOCK_FONT_SIZE)) / 3;
  const CLOCK_INFO_WIDTH = WIDTH - 16;

  // Use a common function for drawing the clock infos to save space
  const drawClockInfo = (
    _item: ClockInfo.MenuItem,
    info: ClockInfo.Item,
    options: ClockInfo.InteractiveOptions
  ) => {
    // Clear the background
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
  };

  // Load and initial the 3 clock infos
  const clockInfoItems = clockInfo.load();

  const clockInfo1 = clockInfo.addInteractive(clockInfoItems, {
    x: 8,
    y: 16 + WIDGETS_SIZE + CLOCK_FONT_SIZE,
    w: CLOCK_INFO_WIDTH,
    h: CLOCK_INFO_HEIGHT,
    draw: drawClockInfo,
  });
  const clockInfo2 = clockInfo.addInteractive(clockInfoItems, {
    x: 8,
    y: 16 + WIDGETS_SIZE + CLOCK_FONT_SIZE + CLOCK_INFO_HEIGHT,
    w: CLOCK_INFO_WIDTH,
    h: CLOCK_INFO_HEIGHT,
    draw: drawClockInfo,
  });

  const clockInfo3 = clockInfo.addInteractive(clockInfoItems, {
    x: 8,
    y: 16 + WIDGETS_SIZE + CLOCK_FONT_SIZE + 2 * CLOCK_INFO_HEIGHT,
    w: CLOCK_INFO_WIDTH,
    h: CLOCK_INFO_HEIGHT,
    draw: drawClockInfo,
  });

  // Force all clock infos to redraw
  const drawClockInfos = () => {
    clockInfo1.redraw();
    clockInfo2.redraw();
    clockInfo3.redraw();
  };

  // Clear clock infos from the screen
  const clearClockInfos = () => {
    clockInfo1.remove();
    clockInfo2.remove();
    clockInfo3.remove();

    g.clearRect(0, 16 + WIDGETS_SIZE + CLOCK_FONT_SIZE, WIDTH, HEIGHT);
  };

  // Handle music playing ---------------------------------

  const TRACK_FONT_SIZE = 16;
  const ARTIST_FONT_SIZE = 16;
  const CONTROL_SIZE = 16;

  // Store where the buttons are and add a onClick callback for use in touch handler
  let buttons: {
    [key: string]: {
      x: number;
      y: number;
      height: number;
      width: number;
      onClick?: () => void;
    };
  } = {};

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

  let track = "";
  let trackWidth = 0;
  let scrollTrackOffset = -20;
  let scrollTrackTimeout: TimeoutId | undefined;

  // Increment the track name scrolling across the screen
  const scrollTrack = () => {
    scrollTrackOffset++;
    // Reset the scroll if it has reached the end
    if (scrollTrackOffset === trackWidth + 32) scrollTrackOffset = 0;

    g.reset();
    g.setFontAlign(-1, -1);
    g.setFont("Vector", TRACK_FONT_SIZE);

    // Draw string twice to give the illusion of it wrapping round the screen
    g.drawString(
      track,
      -Math.max(scrollTrackOffset, 0),
      16 + WIDGETS_SIZE + CLOCK_FONT_SIZE,
      true
    );
    g.drawString(
      track,
      trackWidth - Math.max(scrollTrackOffset, 0) + 32,
      16 + WIDGETS_SIZE + CLOCK_FONT_SIZE,
      true
    );
    // If screen is locked then dont scroll the track name, otherwise set timeout to increment again
    if (!Bangle.isLocked()) scrollTrackTimeout = setTimeout(scrollTrack, 50);
  };

  let artist = "";
  let artistWidth = 0;
  let scrollArtistOffset = -20;
  let scrollArtistTimeout: TimeoutId | undefined;

  // Increment the track name scrolling across the screen
  const scrollArtist = () => {
    scrollArtistOffset++;
    // Reset the scroll if it has reached the end
    if (scrollArtistOffset === artistWidth + 32) scrollArtistOffset = 0;

    g.reset();
    g.setFontAlign(-1, -1);
    g.setFont("Vector", ARTIST_FONT_SIZE);

    // Draw string twice to give the illusion of it wrapping round the screen
    g.drawString(
      artist,
      -Math.max(scrollArtistOffset, 0),
      24 + WIDGETS_SIZE + CLOCK_FONT_SIZE + TRACK_FONT_SIZE,
      true
    );
    g.drawString(
      artist,
      artistWidth - Math.max(scrollArtistOffset, 0) + 32,
      24 + WIDGETS_SIZE + CLOCK_FONT_SIZE + TRACK_FONT_SIZE,
      true
    );

    // If screen is locked then dont scroll the artist name, otherwise set timeout to increment again
    if (!Bangle.isLocked()) scrollArtistTimeout = setTimeout(scrollArtist, 50);
  };

  // Draw the track and the artist to the screen
  const drawTrackAndArtist = (_track: string, _artist: string) => {
    // Set shared variables for the scroller functions
    track = _track;
    artist = _artist;

    g.reset();
    g.clearRect(
      0,
      16 + WIDGETS_SIZE + CLOCK_FONT_SIZE,
      WIDTH,
      24 + WIDGETS_SIZE + CLOCK_FONT_SIZE + TRACK_FONT_SIZE + ARTIST_FONT_SIZE
    );

    // Handle track name
    g.setFont("Vector", TRACK_FONT_SIZE);
    g.setFontAlign(0, -1);

    // Calculate the string width and scoll if necessary otherwise just draw to screen
    trackWidth = g.stringWidth(track);
    scrollTrackOffset = -20;
    if (scrollTrackTimeout) clearTimeout(scrollTrackTimeout);
    if (trackWidth < WIDTH)
      g.drawString(track, CX, 16 + WIDGETS_SIZE + CLOCK_FONT_SIZE, true);
    else scrollTrack();

    // Handle artist name
    g.setFont("Vector", ARTIST_FONT_SIZE);
    g.setFontAlign(0, -1);

    // Calculate the string width and scoll if necessary otherwise just draw to screen
    artistWidth = g.stringWidth(artist);
    scrollArtistOffset = -20;
    if (scrollArtistTimeout) clearTimeout(scrollArtistTimeout);
    if (artistWidth < WIDTH)
      g.drawString(
        artist,
        CX,
        24 + WIDGETS_SIZE + CLOCK_FONT_SIZE + TRACK_FONT_SIZE,
        true
      );
    else scrollArtist();
  };

  // Draw the play/pause/next/prev buttons to the screen
  const drawControls = (state: "play" | "pause") => {
    if (mode !== "music") clearClockInfos();
    mode = "music";

    // Clear the currently stored buttons
    delete buttons["play"];
    delete buttons["pause"];
    delete buttons["prev"];
    delete buttons["next"];

    g.reset();
    g.clearRect(
      0,
      40 + WIDGETS_SIZE + CLOCK_FONT_SIZE + TRACK_FONT_SIZE + ARTIST_FONT_SIZE,
      WIDTH,
      40 +
        WIDGETS_SIZE +
        CLOCK_FONT_SIZE +
        TRACK_FONT_SIZE +
        ARTIST_FONT_SIZE +
        CONTROL_SIZE
    );

    if (state === "play") {
      drawPause(
        CX - 8,
        40 +
          WIDGETS_SIZE +
          CLOCK_FONT_SIZE +
          TRACK_FONT_SIZE +
          ARTIST_FONT_SIZE,
        CONTROL_SIZE,
        CONTROL_SIZE
      );
      buttons["pause"] = {
        x: CX - 8,
        y:
          40 +
          WIDGETS_SIZE +
          CLOCK_FONT_SIZE +
          TRACK_FONT_SIZE +
          ARTIST_FONT_SIZE,
        height: CONTROL_SIZE,
        width: CONTROL_SIZE,
        // @ts-ignore
        onClick: () => Bangle.musicControl("pause"),
      };
    }
    if (state === "pause") {
      drawPlay(
        CX - 8,
        40 +
          WIDGETS_SIZE +
          CLOCK_FONT_SIZE +
          TRACK_FONT_SIZE +
          ARTIST_FONT_SIZE,
        CONTROL_SIZE,
        CONTROL_SIZE
      );
      buttons["play"] = {
        x: CX - 8,
        y:
          40 +
          WIDGETS_SIZE +
          CLOCK_FONT_SIZE +
          TRACK_FONT_SIZE +
          ARTIST_FONT_SIZE,
        height: CONTROL_SIZE,
        width: CONTROL_SIZE,
        // @ts-ignore
        onClick: () => Bangle.musicControl("play"),
      };
    }

    drawPrev(
      8,
      40 + WIDGETS_SIZE + CLOCK_FONT_SIZE + TRACK_FONT_SIZE + ARTIST_FONT_SIZE,
      CONTROL_SIZE,
      CONTROL_SIZE
    );
    buttons["prev"] = {
      x: 8,
      y:
        40 +
        WIDGETS_SIZE +
        CLOCK_FONT_SIZE +
        TRACK_FONT_SIZE +
        ARTIST_FONT_SIZE,
      height: CONTROL_SIZE,
      width: CONTROL_SIZE,
      // @ts-ignore
      onClick: () => Bangle.musicControl("previous"),
    };
    drawNext(
      WIDTH - 24,
      40 + WIDGETS_SIZE + CLOCK_FONT_SIZE + TRACK_FONT_SIZE + ARTIST_FONT_SIZE,
      CONTROL_SIZE,
      CONTROL_SIZE
    );
    buttons["next"] = {
      x: WIDTH - 24,
      y:
        40 +
        WIDGETS_SIZE +
        CLOCK_FONT_SIZE +
        TRACK_FONT_SIZE +
        ARTIST_FONT_SIZE,
      height: CONTROL_SIZE,
      width: CONTROL_SIZE,
      // @ts-ignore
      onClick: () => Bangle.musicControl("next"),
    };
  };

  // Remove the info about currently playing music from the screen
  const clearMusicInfo = () => {
    delete buttons["play"];
    delete buttons["pause"];
    delete buttons["prev"];
    delete buttons["next"];

    g.clearRect(0, 16 + WIDGETS_SIZE + CLOCK_FONT_SIZE, WIDTH, HEIGHT);

    if (scrollTrackTimeout) clearTimeout(scrollTrackTimeout);
    if (scrollArtistTimeout) clearTimeout(scrollArtistTimeout);
  };

  // Handle music intents from gadgetbridge ---------------

  let showClockInfoTimeout: TimeoutId | undefined;

  // Add handler to globalThis for the gadgetbridge function to call
  // @ts-ignore
  globalThis.handleMusicInfo = (
    event: Pick<MusicInfoEventType, "track" | "artist">
  ) => {
    drawTrackAndArtist(event.track, event.artist);
    // Assume if we got this message then the song is playing... (not perfect)
    drawControls("play");
  };

  // Add handler to globalThis for the gadgetbridge function to call
  // @ts-ignore
  globalThis.handleMusicState = (event: Pick<MusicStateEventType, "state">) => {
    drawControls(event.state);

    if (event.state === "pause" && !showClockInfoTimeout) {
      showClockInfoTimeout = setTimeout(() => {
        mode = "clockinfo";
        clearMusicInfo();
        drawClockInfos();
      }, 30000);
    } else if (event.state === "play" && showClockInfoTimeout) {
      clearTimeout(showClockInfoTimeout);
      showClockInfoTimeout = undefined;
    }
  };

  // Handle bangle events ---------------------------------

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
    if (mode !== "music") return;

    // Use left/right swipe for prev/next, up/down swipe for volume control
    if (lr && !ud) {
      // @ts-ignore
      if (lr === 1) Bangle.musicControl("previous");
      // @ts-ignore
      if (lr === -1) Bangle.musicControl("next");
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
    // Loop through buttons object to see if the touch event matches any buttons and call the
    // onClick callback if it does
    if (xy) {
      const x = xy.x;
      const y = xy.y;
      Object.values(buttons).forEach((button) => {
        if (
          x >= button.x &&
          x <= button.x + button.width &&
          y >= button.y &&
          y <= button.y + button.height
        ) {
          if (button.onClick) button.onClick();
        }
      });
    }
  };

  Bangle.on("lock", handleLockEvent);
  Bangle.on("swipe", handleSwipe);
  Bangle.on("touch", handleTouchEvent);

  Bangle.loadWidgets();
  Bangle.drawWidgets();

  Bangle.setUI({
    mode: "clock",
    remove: function () {
      if (clockInterval) clearInterval(clockInterval);

      clearClockInfos();
      clearMusicInfo();

      // @ts-ignore
      delete globalThis.handleMusicInfo;
      // @ts-ignore
      delete globalThis.handleMusicState;

      // @ts-ignore
      delete Graphics.prototype.setFontRobotoMonoBold48;

      Bangle.removeListener("lock", handleLockEvent);
      Bangle.removeListener("swipe", handleSwipe);
      Bangle.removeListener("touch", handleTouchEvent);
    },
  });
}
