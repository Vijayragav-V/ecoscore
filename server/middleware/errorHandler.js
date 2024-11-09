const { logger } = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error("An error occurred: ", err.message);
  return res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
