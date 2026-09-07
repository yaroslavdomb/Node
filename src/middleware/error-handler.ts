import { ErrorRequestHandler } from "express";
import { MongoNetworkError, MongoServerError, MongoServerSelectionError } from "mongodb";
import { ZodError } from "zod";
import env from "../config/env.config";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({
      type: "Syntax error",
      issue: err.message
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      type: "Validation error",
      issue: err.issues
    });
  }

  if (err instanceof MongoNetworkError || err instanceof MongoServerSelectionError) {
    return res.status(503).json({
      type: "Network/timeout error",
      stack: env.LOG_LEVEL === "debug" ? err.stack : undefined
    });
  }

  if (err instanceof MongoServerError) {
    const isClientError = err.code === 11000 || err.code === 121;
    const status = isClientError ? (err.code === 11000 ? 409 : 400) : 500;
    return res.status(status).json({
      type: "Mongo Server error",
      msg: err.errmsg,
      code: err.code,
      cause: err.cause,
      name: err.name,
      stack: env.LOG_LEVEL === "debug" ? err.stack : undefined
    });
  }

  let status = err.statusCode || err.status;
  if (!status || status < 400) {
    status = 500;
  }

  return res.status(status).json({
    message: err.message || "Internal Server Error",
    stack: env.LOG_LEVEL === "debug" ? err.stack : undefined
  });
};

export default errorHandler;
