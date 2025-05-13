globalThis.GB = (function (_GB) { return function (event) {
    if (event.t === "musicinfo" && globalThis.handleMusicInfo)
        globalThis.handleMusicInfo(event);
    if (event.t === "musicstate" && globalThis.handleMusicState)
        globalThis.handleMusicState(event);
    if (_GB)
        return _GB(event);
}; })(globalThis.GB);
