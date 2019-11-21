import { User } from "./../server/entity/user.entity";
import * as dotenv from "dotenv";
import iConfig from "./iconfig";
import { join } from "path";

const parentDir = join(__dirname, "..");
const driverName = "postgres";
dotenv.config();

const {
  access_token_key,
  access_token_secret,
  consumer_secret,
  consumer_key,
  jwt_key,
  twitter_redirect,
  PORT,
  SECRET,
  db_host,
  db_port,
  db_username,
  db_password,
  database,
  NODE_ENV,
  frontendURL,
  REDIS_URL,
  session_name,
  twitter_api,
  bearer_token,
  twitter_access_uri,
  twitter_request_uri,
  MONGO_DATABASE,
} = process.env;

const loadAppConfig = (): iConfig => {
  return {
    accessTokenKey: access_token_key,
    accessTokenSecret: access_token_secret,
    consumerKey: consumer_key,
    consumerSecret: consumer_secret,
    jwtKey: jwt_key,
    twitterCallbackURL: twitter_redirect,
    PORT: Number(PORT),
    sessionSecret: SECRET,
    env: NODE_ENV,
    frontendURL,
    redisURL: REDIS_URL,
    sessionName: session_name,
    twitter_api,
    bearer_token,
    twitter_access_uri,
    twitter_request_uri,
    mongo_db_uri: MONGO_DATABASE,
    dbConfig: {
      name: "default",
      type: driverName,
      host: db_host,
      port: Number(db_port),
      username: db_username,
      password: db_password,
      database: database,
      entities: [User],
      synchronize: true,
    },
  };
};

export default loadAppConfig;
