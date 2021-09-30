const express = require("express");
const helmet = require("helmet");
const { logger } = require("./middleware/middleware");

const server = express();
const usersRouter = require("./users/users-router");

server.use(express.json());

server.use(helmet());
server.use(logger);

server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("*", (req, res, next) => {
  next({ status: 404, message: `${req.method} ${req.originalUrl} not found!` });
});

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  });
}

server.use(errorHandling);

module.exports = server;
