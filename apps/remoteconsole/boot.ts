type SettingsType = {
  active: boolean;
  host: string;
  logsPath: string;
  linesPath: string;
  requestIdPrefix: string;
};

let replInterval: IntervalId | undefined;

const getSettings = (): SettingsType =>
  Object.assign(
    {
      active: false,
      host: "",
      logsPath: "/logs",
      linesPath: "/lines",
      requestIdPrefix: "rmcnsl",
    },
    require("Storage").readJSON("remoteconsole.json", true) || {}
  );

let remoteConsoleSettings = getSettings();

// @ts-ignore
globalThis.updateRemoteConsoleSettings = () =>
  (remoteConsoleSettings = getSettings());

let remoteConsoleConnectedMessageSent = false;

const LOGS_ENDPOINT = remoteConsoleSettings.host
  ? `${remoteConsoleSettings.host}${
      !remoteConsoleSettings.logsPath.startsWith("/") ? "/" : ""
    }${remoteConsoleSettings.logsPath}`
  : undefined;
const LINES_ENDPOINT = remoteConsoleSettings.host
  ? `${remoteConsoleSettings.host}${
      !remoteConsoleSettings.linesPath.startsWith("/") ? "/" : ""
    }${remoteConsoleSettings.linesPath}`
  : undefined;
let remoteConsoleRequestId = 0;

const sendLog = (
  level: "debug" | "log" | "info" | "warn" | "error",
  messages: any[]
) => {
  if (
    !NRF.getSecurityStatus().connected ||
    !remoteConsoleSettings.active ||
    !LOGS_ENDPOINT
  ) {
    remoteConsoleConnectedMessageSent = false;
    return;
  }

  // Dont log http responses
  if (
    messages?.[0]?.t === "http" &&
    messages?.[0]?.id?.startsWith(remoteConsoleSettings.requestIdPrefix)
  )
    return;

  remoteConsoleRequestId += 1;

  let payload: string | undefined;

  try {
    payload = JSON.stringify({
      timestamp: new Date().valueOf(),
      level,
      message: messages.map((message) => {
        if (
          typeof message === "string" ||
          typeof message === "number" ||
          typeof message === "boolean"
        ) {
          return message;
        }
        try {
          JSON.stringify(message);
          return message;
        } catch (error) {
          return message.toString();
        }
      }),
    });
  } catch (error) {
    console.error("Failed to serialise payload: ", error);
  }

  // @ts-ignore
  Bangle.http(LOGS_ENDPOINT, {
    method: "POST",
    id: `${remoteConsoleSettings.requestIdPrefix}-${remoteConsoleRequestId}`,
    timeout: 1000,
    body: payload,
  })
    .then(() => {
      if (!remoteConsoleConnectedMessageSent) {
        remoteConsoleConnectedMessageSent = true;
        console.debug("Connected to remote console.");
      }
    })
    .catch((error: any) => {
      // Make sure we arent in a loop of failed to post errors
      if (
        !(
          messages[0] === "Failed to post log:" &&
          messages[1] === error.toString()
        )
      )
        console.error("Failed to post log:", error.toString());
    });
};

console.debug = (
  (_debug) =>
  (...text: any[]) => {
    _debug(...text);
    sendLog("debug", text);
  }
)(console.debug);

console.log = (
  (_log) =>
  (...text: any[]) => {
    _log(...text);
    sendLog("log", text);
  }
)(console.log);

console.info = (
  (_info) =>
  (...text: any[]) => {
    _info(...text);
    sendLog("info", text);
  }
)(console.info);

console.warn = (
  (_warn) =>
  (...text: any[]) => {
    _warn(...text);
    sendLog("warn", text);
  }
)(console.warn);

console.error = (
  (_error) =>
  (...text: any[]) => {
    _error(...text);
    sendLog("error", text);
  }
)(console.error);

let waitingForResponse = false;

const getREPLInput = () => {
  if (
    !NRF.getSecurityStatus().connected ||
    !remoteConsoleSettings.active ||
    !LINES_ENDPOINT
  ) {
    remoteConsoleConnectedMessageSent = false;
    return;
  }
  if (!waitingForResponse) {
    waitingForResponse = true;
    remoteConsoleRequestId += 1;

    // @ts-ignore
    Bangle.http(LINES_ENDPOINT, {
      method: "GET",
      id: `${remoteConsoleSettings.requestIdPrefix}-${remoteConsoleRequestId}`,
      timeout: 5000,
    })
      .then(({ resp }: any) => {
        if (!remoteConsoleConnectedMessageSent) {
          remoteConsoleConnectedMessageSent = true;
          console.debug("Connected to remote console.");
        }

        waitingForResponse = false;

        const lines = JSON.parse(resp);
        if (Array.isArray(lines)) {
          lines.forEach((line) => {
            try {
              const result = eval(line);
              console.log(
                result === undefined
                  ? "undefined"
                  : result === undefined
                  ? "null"
                  : result
              );
            } catch (error) {
              console.error(error);
            }
          });
        }
      })
      .catch((error: any) => {
        console.error(`Failed to get lines:`, error);
        waitingForResponse = false;
      });
  }
};

if (!replInterval) replInterval = setInterval(getREPLInput, 1000);
