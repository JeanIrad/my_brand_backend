import { Request, Response } from "express";

export default class HandleInvalidUrl {
  static handleInvalidUrl(req: Request, res: Response) {
    res.status(404).json({
      status: "fail",
      message: "Page not found!",
    });
  }
}
