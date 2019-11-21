import { User } from "../server/entity/user.entity";
import iConfig from "../config/iconfig";
import * as passport from "passport";
import UserService from "../server/services/users";
import { Strategy as TwitterStrategy } from "passport-twitter";

export default class PassportProvider {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  providePassportSupport = (
    passport: passport.PassportStatic,
    config: iConfig
  ) => {
    passport.serializeUser((user: any, done) => {
      done(null, user.user.user_id);
    });

    passport.deserializeUser(async (id: string, done) => {
      const user = await this.userService.findByUserId(id);
      if (!user) done(new Error("no user"), null);
      done(null, user);
    });

    return passport.use(
      new TwitterStrategy(
        {
          consumerSecret: config.consumerSecret,
          consumerKey: config.consumerKey,
          callbackURL: config.twitterCallbackURL,
          includeEmail: true,
        },
        this.getProfileFromTwitterApi
      )
    );
  };

  getProfileFromTwitterApi = async (
    token: string,
    tokenSecret: string,
    { id, username, photos, displayName }: passport.Profile,
    cb: Function
  ) => {
    const foundUser = await this.userService.findByUserId(id);

    let user: User;
    if (!foundUser) {
      user = await this.userService.createUser({
        username: username,
        id: id,
        imageURL: photos[0].value,
        name: displayName,
      });
    } else {
      user = foundUser;
    }

    cb(null, {
      access_token: token,
      access_token_secret: tokenSecret,
      user,
    });
  };
  public static authenticateUser() {
    return passport.authenticate("twitter");
  }

  public static redirectUser() {
    return passport.authenticate("twitter");
  }
}
