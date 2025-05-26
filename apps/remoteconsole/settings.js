(function (back) {
    var storage = require("Storage");
    var remoteConsoleSettings = Object.assign({
        active: false,
        host: "",
        logsPath: "/logs",
        linesPath: "/lines",
        requestIdPrefix: "rmcnsl",
    }, storage.readJSON("remoteconsole.json", true) || {});
    var writeSettings = function () {
        storage.writeJSON("remoteconsole.json", remoteConsoleSettings);
        globalThis.updateRemoteConsoleSettings();
    };
    E.showMenu({
        "": { title: "Remote Console" },
        "< Back": function () { return back(); },
        Active: {
            value: !!remoteConsoleSettings.active,
            onchange: function (value) {
                remoteConsoleSettings.active = !!value;
                writeSettings();
            },
        },
        Host: {
            value: remoteConsoleSettings.host || "",
            onchange: function (value) {
                remoteConsoleSettings.host = value.toString();
                writeSettings();
            },
        },
        "Logs Path": {
            value: remoteConsoleSettings.logsPath || "",
            onchange: function (value) {
                var _value = value.toString();
                if (!_value.startsWith("/"))
                    _value = "/".concat(_value);
                remoteConsoleSettings.logsPath = _value;
                writeSettings();
            },
        },
        "Lines Path": {
            value: remoteConsoleSettings.linesPath || "",
            onchange: function (value) {
                var _value = value.toString();
                if (!_value.startsWith("/"))
                    _value = "/".concat(_value);
                remoteConsoleSettings.linesPath = _value;
                writeSettings();
            },
        },
        "Request ID Prefix": {
            value: remoteConsoleSettings.requestIdPrefix || "",
            onchange: function (value) {
                remoteConsoleSettings.requestIdPrefix = value.toString();
                writeSettings();
            },
        },
    });
})(load);
