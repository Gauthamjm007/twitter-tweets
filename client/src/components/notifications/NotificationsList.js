import React from "react";
import socketIOClient from "socket.io-client";
import PropTypes from "prop-types";
import TwitterCard from "./NotificationsCard";
import { connect } from "react-redux";
const socket = socketIOClient();

class TwitterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchText: "",
    };
  }

  componentDidMount() {
    socket.on("connect", () => {
      console.log(
        `Socket connected, incoming new tweets for: ${this.props.text}`
      );
      socket.on("tweets", (data) => {
        let list = [data].concat(this.state.results.slice(0, 9));
        this.setState({ results: list });
      });
    });
    socket.on("Socket disconnected", () => {
      socket.removeAllListeners("tweets");
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.text !== prevProps.text) {
      socket.emit("searchTerm", this.props.text);
    }
  }

  render() {
    const { results } = this.state;

    let loading = (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
    let counter = (
      <p className="badge badge-primary">
        <span className="blinking">{results.length}</span> live tweets
      </p>
    );
    return (
      <div>
        {counter}
        <br />
        {results.length > 0
          ? results.map((item, i) => <TwitterCard data={item} key={i} />)
          : loading}
      </div>
    );
  }
}

TwitterList.propTypes = {
  text: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    text: state.text,
  };
};
export default connect(mapStateToProps)(TwitterList);
