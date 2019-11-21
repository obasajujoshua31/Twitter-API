import iConfig from "../../config/iconfig";
import * as express from "express";
import * as logger from "morgan";
import * as cors from "cors";
import * as passport from "passport";
import * as helmet from "helmet";
import * as mongonse from "mongoose";
import * as session from "express-session";
import * as connectMongo from "connect-mongo";
import passportInit from "../../providers/passport";

const applicationMiddlewares = (app: express.Application, config: iConfig) => {
  const isProduction = config.env === "production";

  isProduction && app.set("trust proxy", 1);
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(logger("dev"));
  app.use(cors());
  app.use(helmet());

  mongonse.connect(config.mongo_db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  (<any>mongonse).Promise = global.Promise;
  const db = mongonse.connection;

  const mongoStore = connectMongo(session);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    session({
      name: config.sessionName,
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: isProduction,
        maxAge: 60000,
      },
      store: new mongoStore({
        mongooseConnection: db,
      }),
    })
  );

  new passportInit().providePassportSupport(passport, config);
};

export default applicationMiddlewares;
