import validatedEnv from "./config/env.config.ts";
import express from "express";
import path from "node:path";
import usersRouter from "./routers/users.ts";
import cardsRouter from "./routers/cards.ts";
import loggerChalk from "./middleware/logger-chalk.ts";
import loggerPC from "./middleware/logger-pc.ts";
import notFound from "./middleware/notFound.ts";

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

const { PORT_NUM, SCHEMA, SERVER } = validatedEnv;
app.listen(PORT_NUM, () => {
  console.warn(`Server started on ${SCHEMA}://${SERVER}:${PORT_NUM}`);
});
