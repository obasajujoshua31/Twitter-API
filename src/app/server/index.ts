import { ConnectionOptions } from "typeorm";
import * as express from "express";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import appMiddlewares from "../pkg/middlewares/application";

import loadAppConfig from "../config/config";
import connectToDatabase from "./services/postgres";
import iConfig from "app/config/iconfig";
import loadRoutes from "./routes";

class Application {
  private app: express.Application;
  private appConfig: iConfig;

  constructor() {
    this.app = express();
    this.appConfig = loadAppConfig();
    this.connectDatabase(this.appConfig).then(() => {
      this.initializeMiddlewares();
      this.initiatizeRoutes();
    });
  }

  private initializeMiddlewares() {
    appMiddlewares(this.app, this.appConfig);
  }

  private async connectDatabase(config: iConfig) {
    await connectToDatabase(config.dbConfig as ConnectionOptions);
  }

  private initiatizeRoutes() {
    this.app.use("/", loadRoutes(this.appConfig));
  }

  public start() {
    // const baseDir = path.join(__dirname, "/../../../");
    // const key = fs.readFileSync(`${baseDir}./key.pem`);
    // const cert = fs.readFileSync(`${baseDir}./cert.pem`);
    // const server = https.createServer({ key, cert }, this.app);
    this.app.listen(this.appConfig.PORT, () => {
      console.log("Server started at port", this.appConfig.PORT);
    });
  }
}

export default Application;
