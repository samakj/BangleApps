(function () {
    globalThis.musiclock = globalThis.musiclock || {};
    globalThis.musiclock.lastTouchEvent = 0;
    globalThis.musiclock.mode = "clockinfo";
    var handleGadgetBridgeEvent = function (event) {
        if (event.t === "musicinfo" ||
            (event.t === "modify" &&
                event.artist &&
                event.album &&
                event.track &&
                event.dur)) {
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
    Bangle.on("GB", handleGadgetBridgeEvent);
})();
