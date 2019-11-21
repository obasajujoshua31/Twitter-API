import iConfig from "app/config/iconfig";
import { Router, Request, Response } from "express";
import AuthController from "../controller/auth";
import PassportProvider from "../../providers/passport";
import TweetsController from "../controller/tweet";
import authenticateUser from "../../pkg/middlewares/auth";

const loadRoutes = (config: iConfig) => {
  const router = Router();

  const twitterController = new TweetsController(config);
  const authController = new AuthController(config);
  router.get("/auth/twitter", PassportProvider.authenticateUser());

  router.get(
    "/auth/twitter/redirect",
    PassportProvider.redirectUser(),
    authController.twitterLogin()
  );

  router.get(
    "/auth/user",
    authenticateUser(config),
    authController.getUserData()
  );
  router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
      message: "Welcome to Twitter API",
    });
  });

  router.get(
    "/tweet/:id",
    authenticateUser(config),
    twitterController.getOneTweet()
  );

  router.get(
    "/tweets",
    authenticateUser(config),
    twitterController.getAllTweets()
  );
  router.post(
    "/tweets",
    authenticateUser(config),
    twitterController.replyToTweet()
  );
  return router;
};

export default loadRoutes;
