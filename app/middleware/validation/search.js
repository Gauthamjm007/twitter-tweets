//check if the user has given an input
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

//search validation

module.exports = function validateSearchInput(data) {
  let errors = {};
  if (isEmpty(data.hashtags)) {
    errors.hashtags = "You need to submit a minimum of one word to get feed";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
