const Twitter = require("twitter");
const twitterConfig = {
  consumer_key: process.env.consumer_key2,
  consumer_secret: process.env.consumer_secret2,
  access_token_key: process.env.access_token_key2,
  access_token_secret: process.env.access_token_secret2,
};
const twitterClient = Twitter(twitterConfig);

const validateSearchInput = require("../middleware/validation/search");

//   api/twitters/search
module.exports.search = (req, res) => {
  const { errors, isValid } = validateSearchInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const hashtagQuery = req.body.hashtags.split(" ");

  const query = hashtagQuery.map((item) => "#" + item).join(" OR ");
  //fetch 100 tweets of the given tweet
  twitterClient
    .get("/search/tweets.json", { q: query, count: 100 })
    .then((data) => {
      const resData = data.statuses.map((item) => {
        let favorite_count;
        let created_at;
        let retweet_count;
        if (item.hasOwnProperty("retweeted_status")) {
          favorite_count = item.retweeted_status.favorite_count;
          created_at = item.retweeted_status.created_at;
          retweet_count = item.retweeted_status.retweet_count;
        } else {
          favorite_count = item.favorite_count;
          created_at = item.created_at;
          retweet_count = item.retweet_count;
        }
        return {
          _id: item.id,
          id_str: item.id_str,
          retweet_count,
          favorite_count,
          created_at,
        };
      });
      res.json(resData);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
};
