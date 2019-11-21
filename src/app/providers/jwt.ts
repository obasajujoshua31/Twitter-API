import iConfig from "app/config/iconfig";
import * as jwt from "jsonwebtoken";

export default class Jwt {
  private appConfig: iConfig;
  constructor(config: iConfig) {
    this.appConfig = config;
  }

  public generateToken(id: string) {
    return jwt.sign(id, this.appConfig.jwtKey);
  }

  public decodeToken(token: string) {
    try {
      return jwt.verify(token, this.appConfig.jwtKey);
    } catch (error) {
      return null;
    }
  }
}
