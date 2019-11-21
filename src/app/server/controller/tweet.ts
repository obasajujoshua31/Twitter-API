import { RequestHandler, Request, Response } from "express";
import { ITweetController } from "./interface";
import iConfig from "app/config/iconfig";
import tweetService from "../services/tweets";
import BaseController from "./base";

export default class TweetController extends BaseController
  implements ITweetController {
  private appConfig: iConfig;
  constructor(config: iConfig) {
    super();
    this.appConfig = config;
  }

  public getAllTweets(): RequestHandler {
    return async (req: Request, res: Response) => {
      const access_token = req.headers["access_token"];
      const access_secret = req.headers["access_secret"];

      if (
        typeof access_secret === "undefined" ||
        typeof access_secret === "undefined"
      ) {
        return this.sendErrorResponse(res, 401, "Forbidden");
      }

      tweetService.getAllTweets(
        this.appConfig,
        access_token as string,
        access_secret as string,
        (err, resp) => {
          if (err) {
            return this.sendErrorResponse(res, 401, "Server could not respond");
          }
          return this.sendSuccessResponse(res, resp);
        }
      );
    };
  }

  public getOneTweet(): RequestHandler {
    return async (req: Request, res: Response) => {
      if (typeof req.params.id === "undefined") {
        return this.sendErrorResponse(res, 400, "Id is not specified");
      }
      const data = await tweetService.getOneTweet(
        req.params.id,
        this.appConfig
      );

      if (!data) {
        return this.sendErrorResponse(res, 401, "Server was unable to respond");
      }

      return this.sendSuccessResponse(res, data);
    };
  }

  public replyToTweet(): RequestHandler {
    return async (req: Request, res: Response) => {
      const access_token = req.headers["access_token"];
      const access_secret = req.headers["access_secret"];

      if (
        typeof access_secret === "undefined" ||
        typeof access_token === "undefined"
      ) {
        return this.sendErrorResponse(res, 401, "Forbidden");
      }

      const { reply, status_id, author_id } = req.body;

      tweetService.replyToTweets(
        this.appConfig,
        access_token as string,
        access_secret as string,
        reply,
        status_id,
        author_id,
        (err, data) => {
          if (!data) {
            return this.sendErrorResponse(
              res,
              401,
              "Server was unable to respond"
            );
          }

          return this.sendSuccessResponse(res, data);
        }
      );
    };
  }
}
