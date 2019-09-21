import * as express from "express";

/**
 * GET /
 * Home page.
 */

export class HomeController {
  constructor() {}

  public getHomePage(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      res.status(200).send({
        message: "GET request successfulll!!!!"
      });
    } catch (error) {
      next(error);
    }
  }
}
