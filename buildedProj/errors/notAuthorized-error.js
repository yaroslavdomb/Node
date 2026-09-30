import HttpError from "./http-error.js";
export default class NotAuthorizedError extends HttpError {
    constructor(message = "Not authorized") {
        super(message, 403);
        this.name = "Not authorized";
    }
}
