import validatedEnv from "./config/env.config";
import express from "express";
import path from "node:path";
import cors from "cors";
//import morgan from "morgan";
import usersRouter from "./routers/users";
import cardsRouter from "./routers/cards";
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
app.use(express.json());
app.use(pinoHttp({ logger }));
//app.use(morgan("dev"));
app.use(loggerPC);
app.use(
  cors({
    origin: ["http://localhost:5137"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true
  })
);

//console.log("Starting application ...");
logger.info("Starting application ...");

//Paths for routers
app.use("/static", express.static(path.resolve("public")));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);

//Error handling
app.use(notFound);
app.use(errorHandler);

const { SERVER_PORT, SCHEMA, SERVER } = validatedEnv;
app.listen(SERVER_PORT, () => {
  console.warn(`Server started on ${SCHEMA}://${SERVER}:${SERVER_PORT}`);
});
