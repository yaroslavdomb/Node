import pc from "picocolors";

const logger = (req, res, next) => {
  console.log(pc.blue(pc.bold(`${req.method} ${req.url}`)));
  next();
};

export default logger;
