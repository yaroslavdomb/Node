export default class HttpError extends Error {
    constructor(message = "Internal Server Error", statusCode = 500, headers) {
        super(message);
        this.name = "HttpError";
        this.statusCode = statusCode;
        this.headers = headers;
    }
    statusCode;
    headers;
}
