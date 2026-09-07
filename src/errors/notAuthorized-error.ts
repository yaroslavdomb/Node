import HttpError from "./http-error";

export default class NotAuthorizedError extends HttpError {
  constructor(message: string = "Not authorized") {
    super(message, 403);
    this.name = "Not authorized";
  }
}
