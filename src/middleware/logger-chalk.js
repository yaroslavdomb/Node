import chalk from "chalk";

const logger = (req, res, next) => {
  console.log(chalk.blue(req.method, req.url));
  next();
};

export default logger;
