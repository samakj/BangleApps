(function (back) {
  const storage = require("Storage");

  const remoteConsoleSettings: SettingsType = Object.assign(
    {
      active: false,
      host: "",
      logsPath: "/logs",
      linesPath: "/lines",
      requestIdPrefix: "rmcnsl",
    },
    storage.readJSON("remoteconsole.json", true) || {}
  );

  const writeSettings = () => {
    storage.writeJSON("remoteconsole.json", remoteConsoleSettings);
    // @ts-ignore
    globalThis.updateRemoteConsoleSettings();
  };

  E.showMenu({
    "": { title: "Remote Console" },
    "< Back": () => back(),
    Active: {
      value: !!remoteConsoleSettings.active,
      onchange: (value: any) => {
        remoteConsoleSettings.active = !!value;
        writeSettings();
      },
    },
    Host: {
      value: remoteConsoleSettings.host || "",
      onchange: (value: any) => {
        remoteConsoleSettings.host = value.toString();
        writeSettings();
      },
    },
    "Logs Path": {
      value: remoteConsoleSettings.logsPath || "",
      onchange: (value: any) => {
        let _value = value.toString();
        if (!_value.startsWith("/")) _value = `/${_value}`;
        remoteConsoleSettings.logsPath = _value;
        writeSettings();
      },
    },
    "Lines Path": {
      value: remoteConsoleSettings.linesPath || "",
      onchange: (value: any) => {
        let _value = value.toString();
        if (!_value.startsWith("/")) _value = `/${_value}`;
        remoteConsoleSettings.linesPath = _value;
        writeSettings();
      },
    },
    "Request ID Prefix": {
      value: remoteConsoleSettings.requestIdPrefix || "",
      onchange: (value: any) => {
        remoteConsoleSettings.requestIdPrefix = value.toString();
        writeSettings();
      },
    },
  });
})(load);
