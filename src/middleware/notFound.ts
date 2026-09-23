import { type RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json({
    message: `Requested resource ${req.method} ${req.url} not found, please use "/api/v1/" as prefix for your requests`
  });
};

export default notFound;
