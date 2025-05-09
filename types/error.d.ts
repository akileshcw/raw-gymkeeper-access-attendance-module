import e from "express";

export interface ErrorHandler extends Error {
  status?: number;
}

export interface ErrorRequestHandler {
  (
    err: ErrorHandler,
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
  ): void;
}
