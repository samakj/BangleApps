var replInterval;
var getSettings = function () {
    return Object.assign({
        active: false,
        host: "",
        logsPath: "/logs",
        linesPath: "/lines",
        requestIdPrefix: "rmcnsl",
    }, require("Storage").readJSON("remoteconsole.json", true) || {});
};
var remoteConsoleSettings = getSettings();
globalThis.updateRemoteConsoleSettings = function () {
    return (remoteConsoleSettings = getSettings());
};
var remoteConsoleConnectedMessageSent = false;
var LOGS_ENDPOINT = remoteConsoleSettings.host
    ? "".concat(remoteConsoleSettings.host).concat(!remoteConsoleSettings.logsPath.startsWith("/") ? "/" : "").concat(remoteConsoleSettings.logsPath)
    : undefined;
var LINES_ENDPOINT = remoteConsoleSettings.host
    ? "".concat(remoteConsoleSettings.host).concat(!remoteConsoleSettings.linesPath.startsWith("/") ? "/" : "").concat(remoteConsoleSettings.linesPath)
    : undefined;
var remoteConsoleRequestId = 0;
var sendLog = function (level, messages) {
    var _a, _b, _c;
    if (!NRF.getSecurityStatus().connected ||
        !remoteConsoleSettings.active ||
        !LOGS_ENDPOINT) {
        remoteConsoleConnectedMessageSent = false;
        return;
    }
    if (((_a = messages === null || messages === void 0 ? void 0 : messages[0]) === null || _a === void 0 ? void 0 : _a.t) === "http" &&
        ((_c = (_b = messages === null || messages === void 0 ? void 0 : messages[0]) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.startsWith(remoteConsoleSettings.requestIdPrefix)))
        return;
    remoteConsoleRequestId += 1;
    var payload;
    try {
        payload = JSON.stringify({
            timestamp: new Date().valueOf(),
            level: level,
            message: messages.map(function (message) {
                if (typeof message === "string" ||
                    typeof message === "number" ||
                    typeof message === "boolean") {
                    return message;
                }
                try {
                    JSON.stringify(message);
                    return message;
                }
                catch (error) {
                    return message.toString();
                }
            }),
        });
    }
    catch (error) {
        console.error("Failed to serialise payload: ", error);
    }
    Bangle.http(LOGS_ENDPOINT, {
        method: "POST",
        id: "".concat(remoteConsoleSettings.requestIdPrefix, "-").concat(remoteConsoleRequestId),
        timeout: 1000,
        body: payload,
    })
        .then(function () {
        if (!remoteConsoleConnectedMessageSent) {
            remoteConsoleConnectedMessageSent = true;
            console.debug("Connected to remote console.");
        }
    })
        .catch(function (error) {
        if (!(messages[0] === "Failed to post log:" &&
            messages[1] === error.toString()))
            console.error("Failed to post log:", error.toString());
    });
};
console.debug = (function (_debug) {
    return function () {
        var text = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            text[_i] = arguments[_i];
        }
        _debug.apply(void 0, text);
        sendLog("debug", text);
    };
})(console.debug);
console.log = (function (_log) {
    return function () {
        var text = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            text[_i] = arguments[_i];
        }
        _log.apply(void 0, text);
        sendLog("log", text);
    };
})(console.log);
console.info = (function (_info) {
    return function () {
        var text = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            text[_i] = arguments[_i];
        }
        _info.apply(void 0, text);
        sendLog("info", text);
    };
})(console.info);
console.warn = (function (_warn) {
    return function () {
        var text = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            text[_i] = arguments[_i];
        }
        _warn.apply(void 0, text);
        sendLog("warn", text);
    };
})(console.warn);
console.error = (function (_error) {
    return function () {
        var text = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            text[_i] = arguments[_i];
        }
        _error.apply(void 0, text);
        sendLog("error", text);
    };
})(console.error);
var waitingForResponse = false;
var getREPLInput = function () {
    if (!NRF.getSecurityStatus().connected ||
        !remoteConsoleSettings.active ||
        !LINES_ENDPOINT) {
        remoteConsoleConnectedMessageSent = false;
        return;
    }
    if (!waitingForResponse) {
        waitingForResponse = true;
        remoteConsoleRequestId += 1;
        Bangle.http(LINES_ENDPOINT, {
            method: "GET",
            id: "".concat(remoteConsoleSettings.requestIdPrefix, "-").concat(remoteConsoleRequestId),
            timeout: 5000,
        })
            .then(function (_a) {
            var resp = _a.resp;
            if (!remoteConsoleConnectedMessageSent) {
                remoteConsoleConnectedMessageSent = true;
                console.debug("Connected to remote console.");
            }
            waitingForResponse = false;
            var lines = JSON.parse(resp);
            if (Array.isArray(lines)) {
                lines.forEach(function (line) {
                    try {
                        var result = eval(line);
                        console.log(result === undefined
                            ? "undefined"
                            : result === undefined
                                ? "null"
                                : result);
                    }
                    catch (error) {
                        console.error(error);
                    }
                });
            }
        })
            .catch(function (error) {
            console.error("Failed to get lines:", error);
            waitingForResponse = false;
        });
    }
};
if (!replInterval)
    replInterval = setInterval(getREPLInput, 1000);
