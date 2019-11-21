import iConfig from "app/config/iconfig";
import { RequestHandler } from "express";

export default interface IAuthController {
  twitterLogin(): RequestHandler;
  getUserData(): RequestHandler;
}

export interface ITweetController {
  getAllTweets(): RequestHandler;
  getOneTweet(): RequestHandler;
  replyToTweet(): RequestHandler;
}
