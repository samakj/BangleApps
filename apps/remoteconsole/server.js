const http = require("http");
const os = require("os");
const repl = require("repl");

const MAX_LOG_COUNT = 1000;
const PORT = 8080;
const LOGS_PATH = "logs";
const LINES_PATH = "lines";
let IP;

const networkInterfaces = os.networkInterfaces();
Object.keys(os.networkInterfaces()).forEach((nic) => {
  const externalIPv4Interfaces = networkInterfaces[nic].filter(
    (interface) =>
      !interface.internal && interface.family.toLowerCase() === "ipv4"
  );

  if (!externalIPv4Interfaces?.length) return;

  if (externalIPv4Interfaces.length > 1) IP = 0;
  else if (IP != null) IP = 0;
  else IP = externalIPv4Interfaces[0].address;
});

if (IP) {
  console.log(`Host: http://${IP || ""}:${PORT}`);
} else {
  console.warn(
    `Failed to determine IP address, you will have to find this yourself`
  );
}

console.log(`Logs path: /${LOGS_PATH}`);
console.log(`Lines path: /${LINES_PATH}\n`);

const _repl = repl.start({
  prompt: "> ",
  eval: async (code, context, file, callback) => {
    const _code = code.replace("\n", "");
    if (_code) lines.push(_code);
    callback();
  },
});

_repl.on("exit", () => process.exit());

let logs = [];
let lines = [];

const getJsonData = (request) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => {
      chunks.push(chunk);
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      } catch (error) {
        reject(error);
      }
    });
  });

const send404 = (response) => {
  response.statusCode = 404;
  response.end('{"error":"Page not found"}');
};

const send405 = (response) => {
  response.statusCode = 404;
  response.end('{"error":"Method not allowed"}');
};

const send500 = (response, error) => {
  response.statusCode = 500;
  response.end(`{"error":"${error?.toString() || "Unknown server error"}"}`);
};

const handleLogsRequest = (request, response) => {
  switch (request.method) {
    case "GET":
      response.statusCode = 200;
      response.end(JSON.stringify(logs));
      break;
    case "POST":
      getJsonData(request)
        .then((data) => {
          const { level, timestamp, ...rest } = data || {
            level: "log",
            timestamp: +new Date(),
          };
          let color =
            level === "error"
              ? "\x1b[31m"
              : level === "warn"
              ? "\x1b[33m"
              : level === "debug"
              ? "\x1b[36m"
              : "\x1b[0m";

          let message = data?.message || rest;

          try {
            message = JSON.parse(data?.message);
          } catch {}

          console[level]?.(
            `\r${color}${new Date(timestamp).toLocaleTimeString()} `,
            `[${level.padEnd(5, " ")}] `,
            `\x1b[0m`,
            ...message.map((part) =>
              part === "undefined" ? undefined : part === "null" ? null : part
            )
          );

          _repl.displayPrompt(true);

          logs.push(data);
          if (logs.length > MAX_LOG_COUNT) {
            logs = logs.slice(logs.length - MAX_LOG_COUNT);
          }
          response.end("{}");
        })
        .catch((error) => send500(response, error));
      break;
    default:
      send405(response);
      break;
  }
};

const handleLinesRequest = (request, response) => {
  switch (request.method) {
    case "GET":
      response.statusCode = 200;
      response.end(JSON.stringify(lines));
      lines = [];
      break;
    default:
      send405(response);
      break;
  }
};

const handleRequest = (request, response) => {
  response.setHeader("Content-Type", "application/json");

  switch (request.url) {
    case `/${LOGS_PATH}`:
      handleLogsRequest(request, response);
      break;
    case `/${LINES_PATH}`:
      handleLinesRequest(request, response);
      break;
    default:
      send404(response);
  }
};

const server = http.createServer(handleRequest).listen(PORT, "0.0.0.0");
