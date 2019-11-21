export default interface iConfig {
  consumerSecret: string;
  consumerKey: string;
  accessTokenKey: string;
  accessTokenSecret: string;
  jwtKey: string;
  twitterCallbackURL: string;
  PORT: number;
  sessionSecret: string;
  dbConfig: iDbconfig;
  env: string;
  frontendURL: string;
  redisURL: string;
  sessionName: string;
  twitter_api: string;
  bearer_token: string;
  twitter_request_uri: string;
  twitter_access_uri: string;
  mongo_db_uri: string;
}

export interface iDbconfig {
  name: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: any;
  synchronize: boolean;
}
