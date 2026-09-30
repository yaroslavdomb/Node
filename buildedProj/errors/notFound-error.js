import HttpError from "./http-error.js";
export default class NotFoundError extends HttpError {
    constructor(message = "Not found") {
        super(message, 404);
        this.name = "NotFound";
    }
}
