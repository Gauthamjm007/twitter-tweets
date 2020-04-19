import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendQueryData, changeSort } from "../../actions/searchActions";
import { setText, clearText } from "../../actions/textActions";
import InputField from "../common/InputField";
import isEmpty from "../../utils/is-empty";

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      hashtags: "",
      errors: {},
    };
  }

  handleFocus = (e) => {
    this.props.clearText();
  };
  onSortChange = (e) => {
    this.props.changeSort(e.target.value.toLowerCase());
  };
  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const queryData = {
      hashtags: this.state.hashtags,
    };
    this.props.sendQueryData(queryData, this.props.search.sort);
    this.props.setText(this.state.hashtags);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (!isEmpty(this.props.search.query)) {
      this.setState({
        hashtags: this.props.search.query.hashtags,
      });
    }
  }

  render() {
    const { errors } = this.state;
    const sortOptions = ["Date", "Favorite", "Retweet"];
    let content;
    if (this.props.search.isSuccess) {
      content = (
        <h1>
          Search result for Hashtags:{" "}
          {this.props.search.query.hashtags
            .split(" ")
            .map((item) => `#${item} `)}
        </h1>
      );
    }

    return (
      <div className="search-form-group">
        <form onSubmit={this.onSubmit} className="search-form">
          <InputField
            divClass="search-input"
            name="hashtags"
            placeholder="Search"
            classname="search-hashtag"
            value={this.state.hashtags}
            onChange={this.onChange}
            error={errors.hashtags}
            onFocus={this.handleFocus}
          />

          <input type="submit" className="btn-search" value="Search" />
          <div className="search-sort-select">
            <label htmlFor="sort">Sort By: </label>
            <select name="sort" onChange={this.onSortChange}>
              {sortOptions.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="search-info">{content}</div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  sendQueryData: PropTypes.func.isRequired,
  changeSort: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  search: state.search,
  text: state.text,
});

export default connect(mapStateToProps, {
  sendQueryData,
  changeSort,
  setText,
  clearText,
})(SearchBar);
