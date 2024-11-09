require("dotenv").config();
require("./config/db")();
const logger = require("./utils/logger");
const express = require("express");
const cors = require("cors");
const requestLogger = require("./middleware/requestLogger");
const notFound = require("./middleware/notFound");
const methodNotAllowed = require("./middleware/methodNotAllowed");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));  // Fix CORS configuration
app.use(requestLogger);

app.use("/api", router);

app.use(methodNotAllowed);
app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
  logger.info(`Server is running on port ${process.env.PORT || 3001}`);
});
