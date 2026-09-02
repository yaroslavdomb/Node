import express from "express";
import path from "node:path";
import usersRouter from "./routers/users.ts";
import loggerChalk from "./middleware/logger-chalk.ts";
import loggerPC from "./middleware/logger-pc.ts";
import notFound from "./middleware/notFound.ts";

const app = express();

console.log("Start application on 8050");

//Initial configurations for server
app.use(express.json());
app.use(loggerPC);

//Paths for routers
app.use("/static", express.static(path.resolve("public")));
app.use("/api/users", usersRouter);

//Final onfiguration for server
app.use(notFound);

app.listen(8050);
