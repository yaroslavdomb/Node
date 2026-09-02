const express = require("express");
const path = require("path");
const usersRouter = require("./routers/users.js");
const logger = require("./middleware/logger.js");
const notFound = require("./middleware/notFound.js");

const app = express();

console.log("Start application on 8050");

//Initial configurations for server
app.use(express.json());
app.use(logger);

//Paths for routers
app.use("/static", express.static(path.resolve("public")));
app.use("/api/users", usersRouter);

//Final onfiguration for server
app.use(notFound);

app.listen(8050);
