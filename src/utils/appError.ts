export default class AppError extends Error {
  status: string;
  isOperational: boolean;
  errors: object;
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "Error";
    this.isOperational = true;
    this.errors = {};
    Error.captureStackTrace(this, this.constructor);
  }
}
