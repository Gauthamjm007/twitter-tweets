import React from "react";
import PropTypes from "prop-types";
class TwitterCard extends React.Component {
  render() {
    let data = this.props.data;
    return (
      <div className="card">
        <div className="card-header">{data.user.name}</div>
        <div className="card-body">
          <h6 className="card-title"> {data.user.screen_name} tweeted</h6>
          <p className="card-text">{data.text}</p>
          <br />
        </div>
        <div className="card-footer text-muted">
          {new Date(data.created_at).toLocaleTimeString()}
        </div>
      </div>
    );
  }
}

TwitterCard.propTypes = {
  data: PropTypes.object,
};

export default TwitterCard;
