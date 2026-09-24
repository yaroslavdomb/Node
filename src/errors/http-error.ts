export default class HttpError extends Error {
  constructor(message: string = "Internal Server Error", statusCode: number = 500, headers?: Record<string, string>) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.headers = headers;
  }

  statusCode: number;
  headers?: Record<string, string>;
}
