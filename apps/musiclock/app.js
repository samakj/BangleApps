var _a;
{
    var locale_1 = require("locale");
    var clockInfo_1 = require("clock_info");
    g.clear();
    var WIDTH_1 = g.getWidth();
    var HEIGHT = g.getHeight();
    var CX_1 = WIDTH_1 / 2;
    var WIDGETS_SIZE = 24;
    var SECOND_IN_MS = 1000;
    var MINUTE_IN_MS_1 = 60 * SECOND_IN_MS;
    var buttons_1 = {};
    var CLOCK_FONT_SIZE = 48;
    var CLOCK_LEFT_1 = 0;
    var CLOCK_RIGHT_1 = WIDTH_1;
    var CLOCK_TOP_1 = 8 + WIDGETS_SIZE;
    var CLOCK_BOTTOM_1 = CLOCK_TOP_1 + CLOCK_FONT_SIZE;
    var CLOCK_INFO_WIDTH_1 = WIDTH_1 - 8;
    var CLOCK_INFO_LEFT_1 = 8;
    var CLOCK_INFO_RIGHT_1 = CLOCK_INFO_LEFT_1 + CLOCK_INFO_WIDTH_1;
    var CLOCK_INFO_TOP_1 = 8 + CLOCK_BOTTOM_1;
    var CLOCK_INFO_BOTTOM_1 = HEIGHT;
    var CLOCK_INFO_HEIGHT_1 = (HEIGHT - CLOCK_INFO_TOP_1) / 3;
    var TRACK_FONT_SIZE_1 = 16;
    var TRACK_TOP_1 = 8 + CLOCK_BOTTOM_1;
    var TRACK_BOTTOM_1 = TRACK_TOP_1 + TRACK_FONT_SIZE_1;
    var TRACK_LEFT_1 = 0;
    var TRACK_RIGHT_1 = WIDTH_1;
    var ARTIST_FONT_SIZE_1 = 16;
    var ARTIST_TOP_1 = 8 + TRACK_BOTTOM_1;
    var ARTIST_BOTTOM_1 = ARTIST_TOP_1 + ARTIST_FONT_SIZE_1;
    var ARTIST_LEFT_1 = 0;
    var ARTIST_RIGHT_1 = WIDTH_1;
    var CONTROL_BUTTON_PADDING_1 = 8;
    var CONTROL_BUTTON_SIZE_1 = 16;
    var CONTROL_BUTTON_BOTTOM_1 = HEIGHT - 8;
    var CONTROL_BUTTON_TOP_1 = CONTROL_BUTTON_BOTTOM_1 - CONTROL_BUTTON_SIZE_1;
    var PLAY_PAUSE_BUTTON_LEFT_1 = CX_1 - CONTROL_BUTTON_SIZE_1 / 2;
    var PLAY_PAUSE_BUTTON_RIGHT_1 = CX_1 + CONTROL_BUTTON_SIZE_1 / 2;
    var PREV_BUTTON_LEFT_1 = 8;
    var PREV_BUTTON_RIGHT_1 = PREV_BUTTON_LEFT_1 + CONTROL_BUTTON_SIZE_1;
    var NEXT_BUTTON_RIGHT_1 = WIDTH_1 - 8;
    var NEXT_BUTTON_LEFT_1 = NEXT_BUTTON_RIGHT_1 - CONTROL_BUTTON_SIZE_1;
    var RobotoMonoBold48_1 = E.toString(require("heatshrink").decompress(atob("AH4AXg/AAwkf8AGF+AGEn4GG/AGMCgoiGAw0PG4sBO+ECAwseAwv+AokDAwsfAwv/AwkHAws/AwkB///RYcPAwK1Dv4TEgYTVTwYTCwAGE/iqE/6rEAwK4FCYi/Hh6GFhC/pS4JvES4J9EOwJ3DTwRxDPoQcDEIQABLwIGGRYSUDOwV+n4GCCAP8h4GBj/AgP4g4/BAwMD+EDAwngAwkHAwsPB4IGC8EfwAGCGAMfJII+Dn4RBAwRMFMJp2GQg0AAwagFdIYjCdIoAnn5CCAxN/AwwbFAwzxCAyEBNgYGJU4qZEAx61EAxDRGAwwAVg6SIgYiCSQUHAwJhBAwMPAwsfLQYGBn5TDAwJaEwAXBKYSLBC4IGCCAYGC8BkCAwMfAwMf/YGC4AvB+YGEv/jAwn/4YGDGwODEQYvBNAQwBh/+Awf4n/8AwaeB/AGF+AGCXgXgAwTRC4AGFTIn//ygF/AGENIQGDAAQGGACMEAQN4AwU+AQN+AwQ9BbYcBAwsDAwaWBg4GDJAIGGSAIGCbAj0DbAMHVIKnDAwi8BAwMDPIIGPDoIGFWoIGICQI8BG4bYB/APBaIf/n7REaYQGHaIP+bQQGDv4GCbAP4AwKSBPQU/dALYDQAYACgLXTgY9BAAZZCAAamCAAa0CF4f/AwhVBAwh4BAwkfAwt/+4GE//nAwYhBw4GDEIKmCEIX8Awl//AGEToIGDEIOAAwYhBWIIGEAATKFA1gACKYgGXZQoAVoAGFvjXEwF+SQYGBv+ALQfAAw/AAwpGBAxZ9EwEPAwXgj7EDAwM/NIP4AwkDAzOAAwwpF8A+En7KEIoIGIMIQZBMYQGCg4GITIIGBUIP+Vol/HoLYEDQIAeLQL7DGwP/GAZECHwZgCJgQaCXwRKCAwRGCAoQqCFAQGF56UBRYMD/8P4CgCg/8b4ixBXggGCZQnwaJ7YJj/An43DAwXwj4GEbAYGBbAh+EAwbfESYiECNQSSDPAX8WwovBACphBA0twAwkBIwIGDXgQGDRYQGDv4GENIIGEQoIGEUIIGETIYGBRYgGBDQKLCAwN/DQQGB8KmEh/n//+XQrkBYJAGCOwi6FKAYGEaoYGBFwYGCFwYGCFwYAggYsDj5+BHQarBj5ICVYP8UAI7BS4P+RgIGEU4cHAgKuEAwa8CAgP+b4f4n/4dogLBAwUf4EP+BNCAxEHbQINKAwjmCAwnwG4pFB/hFDKYphEAwxoBPoyLCAwcA/5pBcQc/U4q1GACkH/gGEFwjRCHgY+CLAQABJgJGBHYYGFNAX8RYbKCAwf8g4GE+EBAwcfQAP+aIgGHvwGNY4IiEAYQJC/iVBG4aoBDAKdBgf7OITDEP4IGEN4hiBPohwBRYiMETILlCAAJ+CUAYcBCYYA/ACqPBgL1DMAKrCSYLcCNQTuBAw8/AwwXBAxYiJGAY3CHwUHJAIAG")));
    var setFontRobotoMonoBold48_1 = function () {
        return g.setFontCustom(RobotoMonoBold48_1, 46, atob("GB0fGB8fIB8fHx8eFw=="), 56 | 65536);
    };
    var clockTimeout_1;
    var clearClock_1 = function () {
        g.clearRect(CLOCK_LEFT_1, CLOCK_TOP_1, CLOCK_RIGHT_1, CLOCK_BOTTOM_1);
        if (clockTimeout_1) {
            clearTimeout(clockTimeout_1);
            clockTimeout_1 = undefined;
        }
    };
    var drawClock_1 = function () {
        g.reset();
        clearClock_1();
        var time = locale_1.time(new Date(), true);
        g.setFontAlign(0, -1);
        setFontRobotoMonoBold48_1();
        g.drawString(time, CX_1, CLOCK_TOP_1);
        g.reset();
        clockTimeout_1 = setTimeout(drawClock_1, MINUTE_IN_MS_1 - (new Date().valueOf() % MINUTE_IN_MS_1));
    };
    drawClock_1();
    var drawClockInfo_1 = function (_item, info, options) {
        g.reset();
        g.clearRect(0, options.y, WIDTH_1, options.y + options.h);
        if (options.focus)
            g.drawRect(options.x, options.y, options.x + options.w - 2, options.y + options.h - 1);
        var cy = options.y + options.h / 2;
        if (info.img)
            g.drawImage(info.img, options.x + 8, cy - 12);
        g.setFont("6x8:2")
            .setFontAlign(-1, 0)
            .drawString(info.text, options.x + 40, cy);
        g.reset();
    };
    var removeClockInfos_1 = function () {
        var _a, _b;
        globalThis.musiclock.clockInfoOptions = undefined;
        while ((_a = globalThis.musiclock.clockInfos) === null || _a === void 0 ? void 0 : _a.length) {
            (_b = globalThis.musiclock.clockInfos.pop()) === null || _b === void 0 ? void 0 : _b.remove();
        }
    };
    var clearClockInfos_1 = function () {
        g.clearRect(CLOCK_INFO_LEFT_1, CLOCK_INFO_TOP_1, CLOCK_INFO_RIGHT_1, CLOCK_INFO_BOTTOM_1);
    };
    var drawClockInfos_1 = function () {
        globalThis.musiclock.mode = "clockinfo";
        clearClockInfos_1();
        if (!globalThis.musiclock.clockInfoOptions) {
            globalThis.musiclock.clockInfoOptions = clockInfo_1.load();
        }
        if (!globalThis.musiclock.clockInfos) {
            globalThis.musiclock.clockInfos = [];
        }
        for (var i = 0; i < 3; i++) {
            if (!globalThis.musiclock.clockInfos[i]) {
                globalThis.musiclock.clockInfos.push(clockInfo_1.addInteractive(globalThis.musiclock.clockInfoOptions, {
                    x: CLOCK_INFO_LEFT_1,
                    y: CLOCK_INFO_TOP_1 + i * CLOCK_INFO_HEIGHT_1,
                    w: CLOCK_INFO_WIDTH_1,
                    h: CLOCK_INFO_HEIGHT_1,
                    draw: drawClockInfo_1,
                    app: "musiclock",
                }));
            }
        }
        globalThis.musiclock.clockInfos.forEach(function (clockInfo) { return clockInfo.redraw(); });
    };
    var trackWidth_1 = 0;
    var scrollTrackOffset_1 = -20;
    var scrollTrackTimeout_1;
    var clearTrack_1 = function () {
        g.clearRect(TRACK_LEFT_1, TRACK_TOP_1, TRACK_RIGHT_1, TRACK_BOTTOM_1);
    };
    var scrollTrack_1 = function () {
        var _a;
        scrollTrackOffset_1++;
        if (scrollTrackOffset_1 === trackWidth_1 + 32)
            scrollTrackOffset_1 = 0;
        if (!((_a = globalThis.musiclock) === null || _a === void 0 ? void 0 : _a.track))
            return;
        g.reset();
        clearTrack_1();
        g.setFontAlign(-1, -1);
        g.setFont("Vector", TRACK_FONT_SIZE_1);
        g.drawString(globalThis.musiclock.track, -Math.max(scrollTrackOffset_1, 0), TRACK_TOP_1);
        g.drawString(globalThis.musiclock.track, trackWidth_1 - Math.max(scrollTrackOffset_1, 0) + 32, TRACK_TOP_1);
        if (!Bangle.isLocked())
            scrollTrackTimeout_1 = setTimeout(scrollTrack_1, 50);
        g.reset();
    };
    var drawTrack_1 = function () {
        var _a;
        globalThis.musiclock.mode = "music";
        g.reset();
        clearTrack_1();
        if ((_a = globalThis.musiclock) === null || _a === void 0 ? void 0 : _a.track) {
            g.setFont("Vector", TRACK_FONT_SIZE_1);
            g.setFontAlign(0, -1);
            trackWidth_1 = g.stringWidth(globalThis.musiclock.track);
            scrollTrackOffset_1 = -20;
            if (scrollTrackTimeout_1)
                clearTimeout(scrollTrackTimeout_1);
            if (trackWidth_1 < WIDTH_1)
                g.drawString(globalThis.musiclock.track, CX_1, TRACK_TOP_1);
            else
                scrollTrack_1();
        }
        g.reset();
    };
    var artistWidth_1 = 0;
    var scrollArtistOffset_1 = -20;
    var scrollArtistTimeout_1;
    var clearArtist_1 = function () {
        g.clearRect(ARTIST_LEFT_1, ARTIST_TOP_1, ARTIST_RIGHT_1, ARTIST_BOTTOM_1);
    };
    var scrollArtist_1 = function () {
        var _a;
        scrollArtistOffset_1++;
        if (scrollArtistOffset_1 === artistWidth_1 + 32)
            scrollArtistOffset_1 = 0;
        if (!((_a = globalThis.musiclock) === null || _a === void 0 ? void 0 : _a.artist))
            return;
        g.reset();
        clearArtist_1();
        g.setFontAlign(-1, -1);
        g.setFont("Vector", ARTIST_FONT_SIZE_1);
        g.drawString(globalThis.musiclock.artist, -Math.max(scrollArtistOffset_1, 0), ARTIST_TOP_1);
        g.drawString(globalThis.musiclock.artist, artistWidth_1 - Math.max(scrollArtistOffset_1, 0) + 32, ARTIST_TOP_1);
        if (!Bangle.isLocked())
            scrollArtistTimeout_1 = setTimeout(scrollArtist_1, 50);
        g.reset();
    };
    var drawArtist_1 = function () {
        var _a;
        globalThis.musiclock.mode = "music";
        g.reset();
        clearArtist_1();
        if ((_a = globalThis.musiclock) === null || _a === void 0 ? void 0 : _a.artist) {
            g.setFont("Vector", ARTIST_FONT_SIZE_1);
            g.setFontAlign(0, -1);
            artistWidth_1 = g.stringWidth(globalThis.musiclock.artist);
            scrollArtistOffset_1 = -20;
            if (scrollArtistTimeout_1)
                clearTimeout(scrollArtistTimeout_1);
            if (artistWidth_1 < WIDTH_1)
                g.drawString(globalThis.musiclock.artist, CX_1, ARTIST_TOP_1);
            else
                scrollArtist_1();
        }
        g.reset();
    };
    var drawPause_1 = function (x, y, height, width) {
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
    var drawPlay_1 = function (x, y, height, width) {
        g.fillPolyAA([x, y, x + width, y + height / 2, x, y + height]);
    };
    var drawNext_1 = function (x, y, height, width) {
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
    var drawPrev_1 = function (x, y, height, width) {
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
    var clearControls_1 = function () {
        delete buttons_1["play"];
        delete buttons_1["pause"];
        delete buttons_1["prev"];
        delete buttons_1["next"];
        g.clearRect(PREV_BUTTON_LEFT_1, CONTROL_BUTTON_TOP_1, PREV_BUTTON_RIGHT_1, CONTROL_BUTTON_BOTTOM_1);
        g.clearRect(PLAY_PAUSE_BUTTON_LEFT_1, CONTROL_BUTTON_TOP_1, PLAY_PAUSE_BUTTON_RIGHT_1, CONTROL_BUTTON_BOTTOM_1);
        g.clearRect(NEXT_BUTTON_LEFT_1, CONTROL_BUTTON_TOP_1, NEXT_BUTTON_RIGHT_1, CONTROL_BUTTON_BOTTOM_1);
    };
    var drawControls_1 = function () {
        var _a;
        globalThis.musiclock.mode = "music";
        g.reset();
        clearControls_1();
        if (((_a = globalThis.musiclock) === null || _a === void 0 ? void 0 : _a.state) === "play") {
            drawPause_1(PLAY_PAUSE_BUTTON_LEFT_1, CONTROL_BUTTON_TOP_1, CONTROL_BUTTON_SIZE_1, CONTROL_BUTTON_SIZE_1);
            buttons_1["pause"] = {
                x: PLAY_PAUSE_BUTTON_LEFT_1,
                y: CONTROL_BUTTON_TOP_1,
                height: CONTROL_BUTTON_SIZE_1,
                width: CONTROL_BUTTON_SIZE_1,
                padding: CONTROL_BUTTON_PADDING_1,
                onClick: function () { return Bangle.musicControl("pause"); },
            };
        }
        else {
            drawPlay_1(PLAY_PAUSE_BUTTON_LEFT_1, CONTROL_BUTTON_TOP_1, CONTROL_BUTTON_SIZE_1, CONTROL_BUTTON_SIZE_1);
            buttons_1["play"] = {
                x: PLAY_PAUSE_BUTTON_LEFT_1,
                y: CONTROL_BUTTON_TOP_1,
                height: CONTROL_BUTTON_SIZE_1,
                width: CONTROL_BUTTON_SIZE_1,
                padding: CONTROL_BUTTON_PADDING_1,
                onClick: function () { return Bangle.musicControl("play"); },
            };
        }
        drawPrev_1(PREV_BUTTON_LEFT_1, CONTROL_BUTTON_TOP_1, CONTROL_BUTTON_SIZE_1, CONTROL_BUTTON_SIZE_1);
        buttons_1["prev"] = {
            x: PREV_BUTTON_LEFT_1,
            y: CONTROL_BUTTON_TOP_1,
            height: CONTROL_BUTTON_SIZE_1,
            width: CONTROL_BUTTON_SIZE_1,
            padding: CONTROL_BUTTON_PADDING_1,
            onClick: function () { return Bangle.musicControl("previous"); },
        };
        drawNext_1(NEXT_BUTTON_LEFT_1, CONTROL_BUTTON_TOP_1, CONTROL_BUTTON_SIZE_1, CONTROL_BUTTON_SIZE_1);
        buttons_1["next"] = {
            x: NEXT_BUTTON_LEFT_1,
            y: CONTROL_BUTTON_TOP_1,
            height: CONTROL_BUTTON_SIZE_1,
            width: CONTROL_BUTTON_SIZE_1,
            padding: CONTROL_BUTTON_PADDING_1,
            onClick: function () { return Bangle.musicControl("next"); },
        };
        g.reset();
    };
    var clearMusicInfo_1 = function () {
        if (scrollArtistTimeout_1)
            clearTimeout(scrollArtistTimeout_1);
        if (scrollTrackTimeout_1)
            clearTimeout(scrollTrackTimeout_1);
        clearTrack_1();
        clearArtist_1();
        clearControls_1();
    };
    var drawMusicInfo_1 = function () {
        globalThis.musiclock.mode = "music";
        drawTrack_1();
        drawArtist_1();
        drawControls_1();
    };
    var showClockInfoTimeout_1;
    var handleMusicInfo_1 = function (_event) {
        if (globalThis.musiclock.mode === "clockinfo") {
            removeClockInfos_1();
            clearClockInfos_1();
        }
        drawMusicInfo_1();
    };
    var handleMusicState_1 = function (event) {
        if (globalThis.musiclock.mode === "clockinfo") {
            removeClockInfos_1();
            clearClockInfos_1();
        }
        drawControls_1();
        if (event.state === "pause" && !showClockInfoTimeout_1) {
            showClockInfoTimeout_1 = setTimeout(function () {
                globalThis.musiclock.mode = "clockinfo";
                clearMusicInfo_1();
                drawClockInfos_1();
            }, 30000);
        }
        else if (event.state === "play" && showClockInfoTimeout_1) {
            clearTimeout(showClockInfoTimeout_1);
            showClockInfoTimeout_1 = undefined;
        }
    };
    var handleGadgetBridgeEvent_1 = function (event) {
        if (event.t === "musicinfo")
            handleMusicInfo_1(event);
        if (event.t === "musicstate")
            handleMusicState_1(event);
    };
    var handleLockEvent_1 = function (locked) {
        if (locked) {
            if (scrollArtistTimeout_1)
                clearTimeout(scrollArtistTimeout_1);
            if (scrollTrackTimeout_1)
                clearTimeout(scrollTrackTimeout_1);
        }
        if (!locked) {
            if (artistWidth_1 > WIDTH_1)
                scrollArtist_1();
            if (trackWidth_1 > WIDTH_1)
                scrollTrack_1();
        }
    };
    var handleSwipe_1 = function (lr, ud) {
        if (globalThis.musiclock.mode !== "music")
            return;
        if (lr && !ud) {
            if (lr === -1)
                Bangle.musicControl("previous");
            if (lr === 1)
                Bangle.musicControl("next");
        }
        if (!lr && ud) {
            if (ud === 1)
                Bangle.musicControl("volumedown");
            if (ud === -1)
                Bangle.musicControl("volumeup");
        }
    };
    var handleTouchEvent_1 = function (_button, xy) {
        if (Bangle.isLocked())
            return;
        if (xy) {
            var x_1 = xy.x;
            var y_1 = xy.y;
            Object.values(buttons_1).forEach(function (button) {
                var padding = button.padding || 0;
                if (x_1 >= button.x - padding &&
                    x_1 <= button.x + button.width + padding &&
                    y_1 >= button.y - padding &&
                    y_1 <= button.y + button.height + padding) {
                    if (button.onClick)
                        button.onClick();
                }
            });
        }
        var now = new Date().valueOf();
        if (now - globalThis.musiclock.lastTouchEvent < 300) {
            if (globalThis.musiclock.mode === "clockinfo") {
                removeClockInfos_1();
                clearClockInfos_1();
                drawMusicInfo_1();
                if (showClockInfoTimeout_1)
                    clearTimeout(showClockInfoTimeout_1);
            }
            else if (globalThis.musiclock.mode === "music") {
                clearMusicInfo_1();
                drawClockInfos_1();
            }
        }
        globalThis.musiclock.lastTouchEvent = now;
    };
    var handleMidnightEvent_1 = function () {
        if (globalThis.musiclock.mode === "clockinfo") {
            drawClockInfos_1();
        }
    };
    Bangle.on("GB", handleGadgetBridgeEvent_1);
    Bangle.on("lock", handleLockEvent_1);
    Bangle.on("swipe", handleSwipe_1);
    Bangle.on("touch", handleTouchEvent_1);
    Bangle.on("midnight", handleMidnightEvent_1);
    if (((_a = globalThis.musiclock) === null || _a === void 0 ? void 0 : _a.state) === "play") {
        drawMusicInfo_1();
    }
    else {
        drawClockInfos_1();
    }
    Bangle.loadWidgets();
    Bangle.drawWidgets();
    Bangle.setUI({
        mode: "clock",
        remove: function () {
            clearClock_1();
            removeClockInfos_1();
            clearClockInfos_1();
            clearMusicInfo_1();
            Bangle.removeListener("GB", handleGadgetBridgeEvent_1);
            Bangle.removeListener("lock", handleLockEvent_1);
            Bangle.removeListener("swipe", handleSwipe_1);
            Bangle.removeListener("touch", handleTouchEvent_1);
            Bangle.removeListener("midnight", handleMidnightEvent_1);
        },
    });
}
