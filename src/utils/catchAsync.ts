import { Request, Response } from "express";

export default function catchAsync(fn: Function) {
  return (req: Request, res: Response, next: Function) => {
    fn(req, res, next).catch(next);
  };
}
