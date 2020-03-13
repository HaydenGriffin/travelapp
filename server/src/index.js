const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const middleware = require("./middleware");
const logs = require("./api/logs.js");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);
app.use(express.json());

app.use("/api/logs", logs);

app.use(middleware.notFound);

app.get(middleware.errorHandler);

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 0 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "prod" ? "NAH" : error.stack
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});