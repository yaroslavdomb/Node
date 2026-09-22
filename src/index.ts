import envConfig from "./config/env.config";
import express from "express";
import path from "node:path";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./routers/users";
import cardsRouter from "./routers/cards";
import rateLimit from "express-rate-limit";
//import loggerChalk from "./middleware/logger-chalk";
import loggerPC from "./middleware/logger-pc";
import notFound from "./middleware/notFound";
import dbConnection from "./db/connection";
import errorHandler from "./middleware/error-handler";
import { logger } from "./logs/logger";
import pinoHttp from "pino-http";

dbConnection();

//Initial configurations for server
const app = express();

//Getting access to sender reall IP and not of IP of proxy server
if (envConfig.TRUST_PROXY) {
  app.set("trust proxy", 1);
}

//Loggers config
app.use(pinoHttp({ logger }));
app.use(morgan("dev"));
app.use(loggerPC);

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

logger.info("Starting application ...");

//Paths for routers
app.use("/static", express.static(path.resolve("public")));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);

//Error handling
app.use(notFound);
app.use(errorHandler);

//Start server listening
const { SERVER_PORT, SCHEMA, SERVER } = envConfig;
app.listen(SERVER_PORT, () => {
  console.warn(`Server started on ${SCHEMA}://${SERVER}:${SERVER_PORT}`);
});
