import { Request, Response, NextFunction } from "express";
import { Error } from "../utils/errors/Error";

export function ErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errorMessage = {
    error: {
      type: "Internal Server Error",
      message: err.message,
      code: 500,
    },
  };

  if (err instanceof Error) {
    errorMessage.error.type = err.type;
    errorMessage.error.code = err.code;
    errorMessage.error.message = err.message;

    res.status(err.code).json(errorMessage);

    return;
  }

  res.status(500).json(errorMessage);
}
