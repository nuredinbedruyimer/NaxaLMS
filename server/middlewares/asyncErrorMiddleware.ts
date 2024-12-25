import { Request, Response, NextFunction } from "express";

/**
 * Utility to handle errors in async route handlers
 * @param fn - The async route handler or middleware
 */
const asyncErrorCatcher = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncErrorCatcher;
