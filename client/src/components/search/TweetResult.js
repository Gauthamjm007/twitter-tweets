import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import TweetFeed from "./TweetFeed";
import TwitterList from "../notifications/NotificationsList";
import TwitterHeader from "../notifications/NotificationHeader";
class TweetResult extends Component {
  constructor() {
    super();
    this.state = { numSlice: 10 };
  }

  handleClick = (e) => {
    this.setState({ numSlice: this.state.numSlice + 10 });
  };

  render() {
    const { tweets, loading, isSuccess } = this.props.search;
    let content;
    if (loading) {
      content = (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Please wait its Loading...</span>
        </div>
      );
    } else if (tweets.length === 0 && isSuccess) {
      content = <div className="no-content">no feed found for that word</div>;
    } else if (tweets.length !== 0) {
      content = (
        <div>
          <TweetFeed tweets={tweets} numSlice={this.state.numSlice} />
          <button className="load-more" onClick={this.handleClick}>
            Load More
          </button>
        </div>
      );
    } else {
      content = <div className="reminder">Search tweets</div>;
    }
    return (
      <div>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-8">
              <SearchBar />
              <br />
              {content}
            </div>

            <div className="col-4">
              <TwitterHeader />
              <TwitterList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TweetResult.propTypes = {
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps)(TweetResult);
