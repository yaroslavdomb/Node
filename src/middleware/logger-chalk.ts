import chalk from "chalk";
import { type RequestHandler } from "express";

const logger: RequestHandler = (req, res, next) => {
  console.log(chalk.blue(req.method, req.url));
  next();
};

export default logger;
