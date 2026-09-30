import envConfig from "./config/env.config.js";

import express from "express";
import path from "node:path";
import cors from "cors";
import { pinoHttp } from "pino-http";
import rateLimit from "express-rate-limit";

import { logger } from "./logs/logger.js";
import dbConnection from "./db/connection.js";
import usersRouter from "./routers/users.js";
import cardsRouter from "./routers/cards.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/error-handler.js";

//Initial configurations for server
const app = express();

//Getting access to sender reall IP and not of IP of proxy server
if (envConfig.TRUST_PROXY) {
  app.set("trust proxy", 1);
}

// Config logger for APIs
app.use(pinoHttp({ logger }));

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5137"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true
  })
);

//Access sequrity configiration
app.use(express.json({ limit: envConfig.JSON_BODY_LIMIT }));
const freqAccessLimiter = rateLimit({
  windowMs: envConfig.RATE_LIMIT_WINDOW_MS,
  max: envConfig.RATE_LIMIT_MAX_REQUESTS
});
app.use("/api", freqAccessLimiter);

//Paths for routers
app.use("/static", express.static(path.resolve("public")));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);

//Error handling
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  logger.info("**********************************");
  logger.info("Starting application ...");

  await dbConnection();

  const { SERVER_PORT, SCHEMA, SERVER } = envConfig;

  //Printing time will help to easelly find the start in file log
  app.listen(SERVER_PORT, () => {
    logger.info(`Server time ___ ${new Date().toLocaleString("en-GB")} ___`);
    logger.info(`Server started on ${SCHEMA}://${SERVER}:${SERVER_PORT}`);
    logger.info("**********************************");
    logger.info("Ready for action!");
    logger.info("**********************************");
  });
};

startServer();
