import iConfig from "app/config/iconfig";
import Axios from "axios";
import * as Oauth from "oauth";

const initOauth = (config: iConfig) => {
  return new Oauth.OAuth(
    config.twitter_request_uri,
    config.twitter_access_uri,
    config.consumerKey,
    config.consumerSecret,
    "1.0A",
    null,
    "HMAC-SHA1"
  );
};

export default {
  getAllTweets(
    config: iConfig,
    access_token: string,
    access_secret: string,
    cb: any
  ) {
    let resp;
    const request = initOauth(config);

    request.get(
      `${config.twitter_api}/home_timeline.json?count=10`,
      access_token,
      access_secret,
      (err, result, response) => {
        if (err) {
          console.log("Error occured", err);
          return cb(err, null);
        }
        return cb(null, JSON.parse(result as string));
      }
    );
  },
  async getOneTweet(id: string, config: iConfig) {
    try {
      const response = await Axios.get(
        `${config.twitter_api}/show.json?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${config.bearer_token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("Data", error);
      return null;
    }
  },

  replyToTweets(
    config: iConfig,
    access_token: string,
    access_secret: string,
    text: string,
    id: string,
    username: string,
    cb: any
  ) {
    const request = initOauth(config);
    request.post(
      `${config.twitter_api}/update.json?status=${text}&in_reply_to_status_id=${id}&auto_populate_reply_metadata=true&username=${username}`,
      access_token,
      access_secret,
      null,
      "application/json",
      (err, result, resp) => {
        if (err) {
          console.log("Error occured", err);
          return cb(err, null);
        }
        return cb(null, JSON.parse(result as string));
      }
    );
  },
};
