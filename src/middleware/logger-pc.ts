import pc from "picocolors";
import { type RequestHandler } from "express";

const logger: RequestHandler = (req, res, next) => {
  console.log(pc.blue(pc.bold(`${req.method} ${req.url}`)));
  next();
};

export default logger;
