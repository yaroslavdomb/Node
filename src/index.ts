import validatedEnv from "./config/env.config";
import express from "express";
import path from "node:path";
import usersRouter from "./routers/users";
import cardsRouter from "./routers/cards";
import loggerChalk from "./middleware/logger-chalk";
import loggerPC from "./middleware/logger-pc";
import notFound from "./middleware/notFound";
import dbConnection from "./db/connection";

dbConnection();

const app = express();

console.log("Starting application ...");

//Initial configurations for server
app.use(express.json());
app.use(loggerPC);

//Paths for routers
app.use("/static", express.static(path.resolve("public")));
app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);

//Final onfiguration for server
app.use(notFound);

const { SERVER_PORT, SCHEMA, SERVER } = validatedEnv;
app.listen(SERVER_PORT, () => {
  console.warn(`Server started on ${SCHEMA}://${SERVER}:${SERVER_PORT}`);
});
