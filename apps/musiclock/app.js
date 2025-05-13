{
    Graphics.prototype.setFontRobotoMonoBold48 = function () {
        return this.setFontCustom(E.toString(require("heatshrink").decompress(atob("AH4AXg/AAwkf8AGF+AGEn4GG/AGMCgoiGAw0PG4sBO+ECAwseAwv+AokDAwsfAwv/AwkHAws/AwkB///RYcPAwK1Dv4TEgYTVTwYTCwAGE/iqE/6rEAwK4FCYi/Hh6GFhC/pS4JvES4J9EOwJ3DTwRxDPoQcDEIQABLwIGGRYSUDOwV+n4GCCAP8h4GBj/AgP4g4/BAwMD+EDAwngAwkHAwsPB4IGC8EfwAGCGAMfJII+Dn4RBAwRMFMJp2GQg0AAwagFdIYjCdIoAnn5CCAxN/AwwbFAwzxCAyEBNgYGJU4qZEAx61EAxDRGAwwAVg6SIgYiCSQUHAwJhBAwMPAwsfLQYGBn5TDAwJaEwAXBKYSLBC4IGCCAYGC8BkCAwMfAwMf/YGC4AvB+YGEv/jAwn/4YGDGwODEQYvBNAQwBh/+Awf4n/8AwaeB/AGF+AGCXgXgAwTRC4AGFTIn//ygF/AGENIQGDAAQGGACMEAQN4AwU+AQN+AwQ9BbYcBAwsDAwaWBg4GDJAIGGSAIGCbAj0DbAMHVIKnDAwi8BAwMDPIIGPDoIGFWoIGICQI8BG4bYB/APBaIf/n7REaYQGHaIP+bQQGDv4GCbAP4AwKSBPQU/dALYDQAYACgLXTgY9BAAZZCAAamCAAa0CF4f/AwhVBAwh4BAwkfAwt/+4GE//nAwYhBw4GDEIKmCEIX8Awl//AGEToIGDEIOAAwYhBWIIGEAATKFA1gACKYgGXZQoAVoAGFvjXEwF+SQYGBv+ALQfAAw/AAwpGBAxZ9EwEPAwXgj7EDAwM/NIP4AwkDAzOAAwwpF8A+En7KEIoIGIMIQZBMYQGCg4GITIIGBUIP+Vol/HoLYEDQIAeLQL7DGwP/GAZECHwZgCJgQaCXwRKCAwRGCAoQqCFAQGF56UBRYMD/8P4CgCg/8b4ixBXggGCZQnwaJ7YJj/An43DAwXwj4GEbAYGBbAh+EAwbfESYiECNQSSDPAX8WwovBACphBA0twAwkBIwIGDXgQGDRYQGDv4GENIIGEQoIGEUIIGETIYGBRYgGBDQKLCAwN/DQQGB8KmEh/n//+XQrkBYJAGCOwi6FKAYGEaoYGBFwYGCFwYGCFwYAggYsDj5+BHQarBj5ICVYP8UAI7BS4P+RgIGEU4cHAgKuEAwa8CAgP+b4f4n/4dogLBAwUf4EP+BNCAxEHbQINKAwjmCAwnwG4pFB/hFDKYphEAwxoBPoyLCAwcA/5pBcQc/U4q1GACkH/gGEFwjRCHgY+CLAQABJgJGBHYYGFNAX8RYbKCAwf8g4GE+EBAwcfQAP+aIgGHvwGNY4IiEAYQJC/iVBG4aoBDAKdBgf7OITDEP4IGEN4hiBPohwBRYiMETILlCAAJ+CUAYcBCYYA/ACqPBgL1DMAKrCSYLcCNQTuBAw8/AwwXBAxYiJGAY3CHwUHJAIAG"))), 46, atob("GB0fGB8fIB8fHx8eFw=="), 56 | 65536);
    };
    var locale_1 = require("locale");
    var clockInfo = require("clock_info");
    g.clear();
    var WIDTH_1 = g.getWidth();
    var HEIGHT_1 = g.getHeight();
    var CX_1 = WIDTH_1 / 2;
    var WIDGETS_SIZE_1 = 24;
    var CLOCK_FONT_SIZE_1 = 48;
    var mode_1 = "clockinfo";
    var drawClock = function () {
        var time = locale_1.time(new Date(), true);
        g.reset();
        g.setFontAlign(0, -1);
        g.setFontRobotoMonoBold48();
        g.clearRect(0, 8 + WIDGETS_SIZE_1, WIDTH_1, 8 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1);
        g.drawString(time, CX_1, 8 + WIDGETS_SIZE_1);
    };
    drawClock();
    var clockInterval_1 = setInterval(drawClock, 10000);
    var CLOCK_INFO_HEIGHT = (HEIGHT_1 - (16 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1)) / 3;
    var CLOCK_INFO_WIDTH = WIDTH_1 - 16;
    var drawClockInfo = function (_item, info, options) {
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
    };
    var clockInfoItems = clockInfo.load();
    var clockInfo1_1 = clockInfo.addInteractive(clockInfoItems, {
        x: 8,
        y: 16 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1,
        w: CLOCK_INFO_WIDTH,
        h: CLOCK_INFO_HEIGHT,
        draw: drawClockInfo,
    });
    var clockInfo2_1 = clockInfo.addInteractive(clockInfoItems, {
        x: 8,
        y: 16 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1 + CLOCK_INFO_HEIGHT,
        w: CLOCK_INFO_WIDTH,
        h: CLOCK_INFO_HEIGHT,
        draw: drawClockInfo,
    });
    var clockInfo3_1 = clockInfo.addInteractive(clockInfoItems, {
        x: 8,
        y: 16 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1 + 2 * CLOCK_INFO_HEIGHT,
        w: CLOCK_INFO_WIDTH,
        h: CLOCK_INFO_HEIGHT,
        draw: drawClockInfo,
    });
    var drawClockInfos_1 = function () {
        clockInfo1_1.redraw();
        clockInfo2_1.redraw();
        clockInfo3_1.redraw();
    };
    var clearClockInfos_1 = function () {
        clockInfo1_1.remove();
        clockInfo2_1.remove();
        clockInfo3_1.remove();
        g.clearRect(0, 16 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1, WIDTH_1, HEIGHT_1);
    };
    var TRACK_FONT_SIZE_1 = 16;
    var ARTIST_FONT_SIZE_1 = 16;
    var CONTROL_SIZE_1 = 16;
    var buttons_1 = {};
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
    var track_1 = "";
    var trackWidth_1 = 0;
    var scrollTrackOffset_1 = -20;
    var scrollTrackTimeout_1;
    var scrollTrack_1 = function () {
        scrollTrackOffset_1++;
        if (scrollTrackOffset_1 === trackWidth_1 + 32)
            scrollTrackOffset_1 = 0;
        g.reset();
        g.setFontAlign(-1, -1);
        g.setFont("Vector", TRACK_FONT_SIZE_1);
        g.drawString(track_1, -Math.max(scrollTrackOffset_1, 0), 16 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1, true);
        g.drawString(track_1, trackWidth_1 - Math.max(scrollTrackOffset_1, 0) + 32, 16 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1, true);
        if (!Bangle.isLocked())
            scrollTrackTimeout_1 = setTimeout(scrollTrack_1, 50);
    };
    var artist_1 = "";
    var artistWidth_1 = 0;
    var scrollArtistOffset_1 = -20;
    var scrollArtistTimeout_1;
    var scrollArtist_1 = function () {
        scrollArtistOffset_1++;
        if (scrollArtistOffset_1 === artistWidth_1 + 32)
            scrollArtistOffset_1 = 0;
        g.reset();
        g.setFontAlign(-1, -1);
        g.setFont("Vector", ARTIST_FONT_SIZE_1);
        g.drawString(artist_1, -Math.max(scrollArtistOffset_1, 0), 24 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1 + TRACK_FONT_SIZE_1, true);
        g.drawString(artist_1, artistWidth_1 - Math.max(scrollArtistOffset_1, 0) + 32, 24 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1 + TRACK_FONT_SIZE_1, true);
        if (!Bangle.isLocked())
            scrollArtistTimeout_1 = setTimeout(scrollArtist_1, 50);
    };
    var drawTrackAndArtist_1 = function (_track, _artist) {
        track_1 = _track;
        artist_1 = _artist;
        g.reset();
        g.clearRect(0, 16 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1, WIDTH_1, 24 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1 + TRACK_FONT_SIZE_1 + ARTIST_FONT_SIZE_1);
        g.setFont("Vector", TRACK_FONT_SIZE_1);
        g.setFontAlign(0, -1);
        trackWidth_1 = g.stringWidth(track_1);
        scrollTrackOffset_1 = -20;
        if (scrollTrackTimeout_1)
            clearTimeout(scrollTrackTimeout_1);
        if (trackWidth_1 < WIDTH_1)
            g.drawString(track_1, CX_1, 16 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1, true);
        else
            scrollTrack_1();
        g.setFont("Vector", ARTIST_FONT_SIZE_1);
        g.setFontAlign(0, -1);
        artistWidth_1 = g.stringWidth(artist_1);
        scrollArtistOffset_1 = -20;
        if (scrollArtistTimeout_1)
            clearTimeout(scrollArtistTimeout_1);
        if (artistWidth_1 < WIDTH_1)
            g.drawString(artist_1, CX_1, 24 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1 + TRACK_FONT_SIZE_1, true);
        else
            scrollArtist_1();
    };
    var drawControls_1 = function (state) {
        if (mode_1 !== "music")
            clearClockInfos_1();
        mode_1 = "music";
        delete buttons_1["play"];
        delete buttons_1["pause"];
        delete buttons_1["prev"];
        delete buttons_1["next"];
        g.reset();
        g.clearRect(0, 40 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1 + TRACK_FONT_SIZE_1 + ARTIST_FONT_SIZE_1, WIDTH_1, 40 +
            WIDGETS_SIZE_1 +
            CLOCK_FONT_SIZE_1 +
            TRACK_FONT_SIZE_1 +
            ARTIST_FONT_SIZE_1 +
            CONTROL_SIZE_1);
        if (state === "play") {
            drawPause_1(CX_1 - 8, 40 +
                WIDGETS_SIZE_1 +
                CLOCK_FONT_SIZE_1 +
                TRACK_FONT_SIZE_1 +
                ARTIST_FONT_SIZE_1, CONTROL_SIZE_1, CONTROL_SIZE_1);
            buttons_1["pause"] = {
                x: CX_1 - 8,
                y: 40 +
                    WIDGETS_SIZE_1 +
                    CLOCK_FONT_SIZE_1 +
                    TRACK_FONT_SIZE_1 +
                    ARTIST_FONT_SIZE_1,
                height: CONTROL_SIZE_1,
                width: CONTROL_SIZE_1,
                onClick: function () { return Bangle.musicControl("pause"); },
            };
        }
        if (state === "pause") {
            drawPlay_1(CX_1 - 8, 40 +
                WIDGETS_SIZE_1 +
                CLOCK_FONT_SIZE_1 +
                TRACK_FONT_SIZE_1 +
                ARTIST_FONT_SIZE_1, CONTROL_SIZE_1, CONTROL_SIZE_1);
            buttons_1["play"] = {
                x: CX_1 - 8,
                y: 40 +
                    WIDGETS_SIZE_1 +
                    CLOCK_FONT_SIZE_1 +
                    TRACK_FONT_SIZE_1 +
                    ARTIST_FONT_SIZE_1,
                height: CONTROL_SIZE_1,
                width: CONTROL_SIZE_1,
                onClick: function () { return Bangle.musicControl("play"); },
            };
        }
        drawPrev_1(8, 40 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1 + TRACK_FONT_SIZE_1 + ARTIST_FONT_SIZE_1, CONTROL_SIZE_1, CONTROL_SIZE_1);
        buttons_1["prev"] = {
            x: 8,
            y: 40 +
                WIDGETS_SIZE_1 +
                CLOCK_FONT_SIZE_1 +
                TRACK_FONT_SIZE_1 +
                ARTIST_FONT_SIZE_1,
            height: CONTROL_SIZE_1,
            width: CONTROL_SIZE_1,
            onClick: function () { return Bangle.musicControl("previous"); },
        };
        drawNext_1(WIDTH_1 - 24, 40 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1 + TRACK_FONT_SIZE_1 + ARTIST_FONT_SIZE_1, CONTROL_SIZE_1, CONTROL_SIZE_1);
        buttons_1["next"] = {
            x: WIDTH_1 - 24,
            y: 40 +
                WIDGETS_SIZE_1 +
                CLOCK_FONT_SIZE_1 +
                TRACK_FONT_SIZE_1 +
                ARTIST_FONT_SIZE_1,
            height: CONTROL_SIZE_1,
            width: CONTROL_SIZE_1,
            onClick: function () { return Bangle.musicControl("next"); },
        };
    };
    var clearMusicInfo_1 = function () {
        delete buttons_1["play"];
        delete buttons_1["pause"];
        delete buttons_1["prev"];
        delete buttons_1["next"];
        g.clearRect(0, 16 + WIDGETS_SIZE_1 + CLOCK_FONT_SIZE_1, WIDTH_1, HEIGHT_1);
        if (scrollTrackTimeout_1)
            clearTimeout(scrollTrackTimeout_1);
        if (scrollArtistTimeout_1)
            clearTimeout(scrollArtistTimeout_1);
    };
    var showClockInfoTimeout_1;
    globalThis.handleMusicInfo = function (event) {
        drawTrackAndArtist_1(event.track, event.artist);
        drawControls_1("play");
    };
    globalThis.handleMusicState = function (event) {
        drawControls_1(event.state);
        if (event.state === "pause" && !showClockInfoTimeout_1) {
            showClockInfoTimeout_1 = setTimeout(function () {
                mode_1 = "clockinfo";
                clearMusicInfo_1();
                drawClockInfos_1();
            }, 30000);
        }
        else if (event.state === "play" && showClockInfoTimeout_1) {
            clearTimeout(showClockInfoTimeout_1);
            showClockInfoTimeout_1 = undefined;
        }
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
        if (mode_1 !== "music")
            return;
        if (lr && !ud) {
            if (lr === 1)
                Bangle.musicControl("previous");
            if (lr === -1)
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
        if (xy) {
            var x_1 = xy.x;
            var y_1 = xy.y;
            Object.values(buttons_1).forEach(function (button) {
                if (x_1 >= button.x &&
                    x_1 <= button.x + button.width &&
                    y_1 >= button.y &&
                    y_1 <= button.y + button.height) {
                    if (button.onClick)
                        button.onClick();
                }
            });
        }
    };
    Bangle.on("lock", handleLockEvent_1);
    Bangle.on("swipe", handleSwipe_1);
    Bangle.on("touch", handleTouchEvent_1);
    Bangle.loadWidgets();
    Bangle.drawWidgets();
    Bangle.setUI({
        mode: "clock",
        remove: function () {
            if (clockInterval_1)
                clearInterval(clockInterval_1);
            clearClockInfos_1();
            clearMusicInfo_1();
            delete globalThis.handleMusicInfo;
            delete globalThis.handleMusicState;
            delete Graphics.prototype.setFontRobotoMonoBold48;
            Bangle.removeListener("lock", handleLockEvent_1);
            Bangle.removeListener("swipe", handleSwipe_1);
            Bangle.removeListener("touch", handleTouchEvent_1);
        },
    });
}
