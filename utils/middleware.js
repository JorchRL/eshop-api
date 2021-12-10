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
  // console.log(error);

  switch (error.name) {
    case "MongoServerError":
      return response.status(500).send(error.message);
    case "ValidationError":
      return response.status(500).send(error.message);
    default:
      return response.status(500).send({ unhandledError: true, error: error });
  }

  response.send({
    ErrorName: error.name,
    ErrorMessage: error.message,
    error: error,
  });
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
};
