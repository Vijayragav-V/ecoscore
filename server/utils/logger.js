const fs = require("fs");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console({
      format: combine(logFormat),
    }),

    new transports.File({ filename: `${logDir}/error.log`, level: "error" }),
    new transports.File({ filename: `${logDir}/combined.log` }),
  ],
});

module.exports = logger;
