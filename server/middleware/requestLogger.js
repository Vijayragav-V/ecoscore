const logger = require("../utils/logger");

const requestLogger = (req, res, next) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const method = req.method;
    const userAgent = req.headers["user-agent"] || "Unknown";

    req.ip = ip;

    logger.info(
      `Request: Method=${method}, IP=${ip}, Endpoint=${req.url}, User-Agent=${userAgent}`
    );

    next();
  } catch (error) {
    logger.error("Error in IP logger middleware:", error);
    next(error);
  }
};

module.exports = requestLogger;
