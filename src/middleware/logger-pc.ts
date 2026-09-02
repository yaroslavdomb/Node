import pc from "picocolors";
import { type Request, type Response, type NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(pc.blue(pc.bold(`${req.method} ${req.url}`)));
  next();
};

export default logger;
