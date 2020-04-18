const Twitter = require("twitter");
const twitterConfig = {
  consumer_key: "KMCYVdToLMKSkTHcBrOGAm9RC",
  consumer_secret: "y1JuQTmelZAUHlv7C1xTfte20pi7lJYQ5BhKXVjuLaziv4fi0u",
  access_token_key: "875590021608230912-E33ZOxfjmiF8tN06SVt0GMGo41fYVPg",
  access_token_secret: "ljY0MYzu6PZ2iiSal6Mc0qp73h0WG5U5YsSnes0sGpLZo",
};
const twitterClient = Twitter(twitterConfig);

const validateSearchInput = require("../middleware/validation/search");

//  POST api/twitters/search
module.exports.search = (req, res) => {
  const { errors, isValid } = validateSearchInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const hashtagQuery = req.body.hashtags.split(" ");

  const query = hashtagQuery.map((item) => "#" + item).join(" OR ");
  const count = parseInt(req.body.count);
  twitterClient
    .get("/search/tweets.json", { q: query, count })
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
