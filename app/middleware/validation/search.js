const Validator = require("validator");
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

module.exports = function validateSearchInput(data) {
  let errors = {};

  if (isEmpty(data.hashtags)) {
    errors.hashtags = "You need to submit a minimum of one word to get feed";
  }

  if (!Validator.isInt(data.count)) {
    errors.count = "Please give a valid number";
  }

  if (isEmpty(data.count)) {
    errors.count = "Please indicate the number of tweets to be fetched";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
