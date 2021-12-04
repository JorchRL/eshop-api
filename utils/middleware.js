const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method: ", request.method);
  logger.info("Path: ", request.path);
  logger.info("Body: ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknow endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.log(error.name);

  return response.status(500).send({ error: "unhandled Error!" });
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
};
