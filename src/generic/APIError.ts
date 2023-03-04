export class APIError extends Error {
  public httpCode: number;
  public message: string;
  public errorCode?: string;

  constructor(httpCode: number, message: string, errorCode?: string) {
    super(message);
    this.httpCode = httpCode;
    this.message = message;
    this.errorCode = errorCode;
  }
}
