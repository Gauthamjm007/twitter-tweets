import React, { Component } from "react";
import PropTypes from "prop-types";
import TweetEmbed from "./TweetEmbed";

class TweetFeed extends Component {
  render() {
    const { tweets, numSlice } = this.props;
    return tweets
      .slice(0, numSlice)
      .map((tweet) => (
        <TweetEmbed
          key={tweet._id}
          id={tweet.id_str}
          options={{ theme: "light" }}
        />
      ));
  }
}

TweetFeed.propTypes = {
  tweets: PropTypes.array.isRequired,
};

export default TweetFeed;
