export default class HttpError extends Error {
  constructor(message: string = "Internal Server Error", statusCode: number = 500) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }

  statusCode: number;
}
