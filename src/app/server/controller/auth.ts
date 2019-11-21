import iConfig from "app/config/iconfig";
import { Request, Response, RequestHandler } from "express";
import IAuthController from "./interface";
import JwtProvider from "../../providers/jwt";
import UserReposity from "../services/users";
import BaseController from "./base";

class AuthController extends BaseController implements IAuthController {
  private jwtProvider: JwtProvider;
  private userService: UserReposity;
  private appConfig: iConfig;

  constructor(config: iConfig) {
    super();
    this.jwtProvider = new JwtProvider(config);
    this.appConfig = config;
    this.userService = new UserReposity();
  }

  public twitterLogin(): RequestHandler {
    return (req: any, res: Response) => {
      const token = this.jwtProvider.generateToken(req.user.user.user_id);
      return res.redirect(
        301,
        `${this.appConfig.frontendURL}?bt=${token}&at=${req.user.access_token}&ats=${req.user.access_token_secret}`
      );
    };
  }

  public getUserData(): RequestHandler {
    return async (req: Request, res: Response) => {
      const decoded = req.user;
      const user = await this.userService.findByUserId(decoded as string);

      if (!user) {
        return this.sendErrorResponse(res, 401, "Forbidden");
      }

      return this.sendSuccessResponse(res, user);
    };
  }
}

export default AuthController;
