// Hook into gadget bridge function and call global handlers on music events
// @ts-ignore
globalThis.GB = ((_GB) => (event: any) => {
  // @ts-ignore
  if (event.t === "musicinfo" && globalThis.handleMusicInfo)
    // @ts-ignore
    globalThis.handleMusicInfo(event);
  // @ts-ignore
  if (event.t === "musicstate" && globalThis.handleMusicState)
    // @ts-ignore
    globalThis.handleMusicState(event);

  if (_GB) return _GB(event);
  // @ts-ignore
})(globalThis.GB);
