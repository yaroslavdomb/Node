import chalk from "chalk";
import { type Request, type Response, type NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(chalk.blue(req.method, req.url));
  next();
};

export default logger;
