import iConfig from "app/config/iconfig";
import { Request, Response, NextFunction } from "express";
import JwtProvider from "../../providers/jwt";

const authenticateUser = (config: iConfig) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];

    const jwtProvider = new JwtProvider(config);
    if (typeof token === "undefined") {
      return res.status(401).json({
        success: false,
        message: "Forbidden",
      });
    }

    const decoded: any = jwtProvider.decodeToken(token as string);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Forbidden",
      });
    }

    req.user = decoded;
    return next();
  };
};

export default authenticateUser;
