import { NextFunction, Request, Response } from "express";
import { APIError } from "@/generic/APIError";

const errorMiddleware = (
  error: APIError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const httpCode: number = error.httpCode || 500;
    const errorCode: string = error.errorCode || "None";
    const message: string = error.message || "Something went wrong";

    console.error(
      `🔴 [${req.method}] ${req.path} >> HttpCode: ${httpCode}, ErrorCode: ${errorCode}, Message: ${message}`,
    );
    res.status(httpCode).json({ httpCode, errorCode, message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
