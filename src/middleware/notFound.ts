import { type RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json({ message: "Page not found" });
};

export default notFound;
